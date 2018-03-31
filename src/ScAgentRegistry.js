import * as R from "ramda";
import validate from "./ValidationUtils";
import ConstrUtils from "./ScConstrIteratorUtils";
import getSysIdtfs from "./GetSysItdf";
import EventTypeUtils from "./ScEventValidation";
import {sctpClient, scKeynodes} from "./service/Singletons";

export default class ScAgentRegistry {

    constructor() {
        console.log(`Create ScAgentRegistry`);
        this.definedAgents = {};
        this.activeAgents = {};
        this.constrUtils = new ConstrUtils(sctpClient);
        this.getSysIdtfs = getSysIdtfs(sctpClient, scKeynodes);
        this._getArc = sctpClient.get_arc.bind(sctpClient);
        this.eventTypeUtils = new EventTypeUtils(scKeynodes);
    }

    /**
     * Find all js-agents in KB
     * and fetch its definition
     * @returns {Promise.<void>}
     * @private
     */
    async _fetchAgentsDefinition() {
        const {sc_agent_implemented_in_js, nrel_primary_initiation_condition} =
            await scKeynodes.resolveArrayOfKeynodes(['sc_agent_implemented_in_js', 'nrel_primary_initiation_condition']);
        const agentDefinitions = await this.constrUtils.doStructsRequest(
            this.constrUtils.mapConstructs(['agent_inst', 'initiation_condition_arc']), [
                SctpConstrIter(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
                    sc_agent_implemented_in_js,
                    sc_type_arc_pos_const_perm,
                    sc_type_node
                ], {
                    "agent_inst": 2
                }),
                SctpConstrIter(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
                    "agent_inst",
                    0,
                    0,
                    // sc_type_edge_common,
                    // sc_type_edge_common,
                    sc_type_arc_pos_const_perm,
                    nrel_primary_initiation_condition
                ], {
                    'initiation_condition_arc': 2
                })]);
        const agentsInsts = R.map(R.prop('agent_inst'), agentDefinitions);
        const initiationConditionArcs = R.map(R.prop('initiation_condition_arc'), agentDefinitions);
        const srcAndTargetArcArray = await Promise.all(R.map(this._getArc, initiationConditionArcs));
        const agentsSysItdfs = await this.getSysIdtfs(agentsInsts);
        for (const idx in agentsInsts) {

            const createAgentDefinition = this._createAgentDefinition(agentsSysItdfs[idx], agentsInsts[idx], srcAndTargetArcArray[idx]);
            this.definedAgents[agentsSysItdfs[idx]] = createAgentDefinition;
            console.log(`Registrate sc-agent with sys-id ${agentsSysItdfs[idx]}`);
        }
    }

    _createAgentDefinition(sysIdtf, agentAddr, srcAndTargetScAddr) {
        const [eventTypeAddr, eventTargetAddr] = srcAndTargetScAddr;
        validate(arguments, ['string', 'natural']);
        validate(srcAndTargetScAddr, ['natural', 'natural']);
        if (this.eventTypeUtils.isEventType(eventTypeAddr))
            return {agentAddr, eventTargetAddr, eventTypeAddr};
        else throw new Error(`Not an eventTypeAddr. Sys-idtf ${sysIdtf}`);
    }

    async init() {
        await this._fetchAgentsDefinition();
    }

    async subscribeToEvent(agentDefinition, executor){
        const scEventType = await this.eventTypeUtils.getSctpEventType(agentDefinition.eventTypeAddr);
        console.log(`Subscribing for event type ${scEventType} and target ${agentDefinition.eventTargetAddr}`);
        await sctpClient.event_create(scEventType, agentDefinition.eventTargetAddr, executor);
    }

    async registrate(sysIdtf, agentFunction){
        if(this.activeAgents[sysIdtf]) throw new Error(`Allready has active agent with sysAddr ${sysIdtf}`);
        this.activeAgents[sysIdtf] = agentFunction;
        await this.subscribeToEvent(this.definedAgents[sysIdtf], agentFunction);
    }
}

