import ConstrUtils from "./ScConstrIteratorUtils";
import {scKeynodes} from "./service/scKeynodes";
import {sctpClient} from "./service/sctpClient";
import {utils} from "SCWeb";
import {map, prop} from "ramda";
const {SctpConstrIter,
    SctpIteratorType,
    sc_agent_implemented_in_js,
    sc_type_arc_pos_const_perm,
    sc_type_node} = utils;


/**
 * Load definition of ScAgents witch implemented in js
 */
export class ScAgentsRepository {
    constructor() {
        this.constrUtils = new ConstrUtils(sctpClient);
        this.getSysIdtfs = this.constrUtils.getSysIdtfs(sctpClient, scKeynodes);
        this._getArc = sctpClient.get_arc.bind(sctpClient);
    }

    /**
     * Find all js-agents in KB
     * and fetch its definition
     * @returns {Promise.<{agentAddr, eventTargetAddr, eventTypeAddr, agentSysIdtf: string}>}
     */
    async loadAgentsDefinition() {
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
        const agentsInsts = map(prop('agent_inst'), agentDefinitions);
        const initiationConditionArcs = map(prop('initiation_condition_arc'), agentDefinitions);
        const srcAndTargetArcArray = await Promise.all(map(this._getArc, initiationConditionArcs));
        const agentsSysItdfs = await this.getSysIdtfs(agentsInsts);
        const agentsDefinitions = [];
        for (const idx in agentsInsts) {

            const createAgentDefinition = this._createAgentDefinition(agentsSysItdfs[idx], agentsInsts[idx], srcAndTargetArcArray[idx]);
            agentDefinitions.push(agentDefinitions);
        }
        return agentDefinitions;
    }

    _createAgentDefinition(sysIdtf, agentAddr, srcAndTargetScAddr) {
        const [eventTypeAddr, eventTargetAddr] = srcAndTargetScAddr;
        validate(arguments, ['string', 'natural']);
        validate(srcAndTargetScAddr, ['natural', 'natural']);
        if (this.eventTypeUtils.isEventType(eventTypeAddr))
            return {agentAddr, eventTargetAddr, eventTypeAddr, agentSysIdtf: sysIdtf};
        else throw new Error(`Not an eventTypeAddr. Sys-idtf ${sysIdtf}`);
    }

}