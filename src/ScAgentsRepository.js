import {scKeynodes} from "./service/scKeynodes";
import {sctpClient} from "./service/sctpClient";
import {
    sc_agent_implemented_in_js,
    sc_type_arc_pos_const_perm,
    sc_type_node,
    SctpConstrIter,
    SctpIteratorType
} from "utils";
import {map, prop} from "ramda";
import ScIteratorUtils from "./ScIteratorUtils";
import getSysIdtf from "./GetSysIdtf";
import validate from "./ValidationUtils";
import ScEventUtils from "./ScEventUtils";

export class ScAgentReadError extends Error {
}

/**
 * Load definition of ScAgents witch implemented in js
 */
export class ScAgentsRepository {
    constructor() {
        this.constrUtils = new ScIteratorUtils(sctpClient);
        this._getArc = sctpClient.get_arc.bind(sctpClient);
        this.getSysIdtfs = getSysIdtf;
        this.eventTypeUtils = new ScEventUtils();
    }

    /**
     * Read sc-addrs of init condition and result contour
     * @param agentInst - addr of agents sc-node
     */
    async _readInitiationAndResult(agentInst) {
        try {
            validate(arguments, ['natural']);
            const {nrel_initiation_condition_and_result} = await scKeynodes.resolveArrayOfKeynodes(['nrel_initiation_condition_and_result']);
            const initResultArc = await
                sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [agentInst, 0, 0, 0, nrel_initiation_condition_and_result]);
            if (initResultArc.length !== 1)
                console.warn(`Unexpected init and results for agent ${agentInst}. Found ${initResultArc.length} tuples.`);
            return sctpClient.get_arc(initResultArc[0][2]);
        } catch (e) {
            throw new ScAgentReadError(`Can't find agent's initAndResultCondition. Agent addr is ${agentInst}`, e);
        }
    }

    /**
     * Find all js-agents in KB
     * and fetch its definition
     * @returns {Promise.<{agentAddr, eventTargetAddr, eventTypeAddr, agentSysIdtf: string}>}
     */
    async loadAgentsDefinition() {
        const {sc_agent_implemented_in_js, nrel_primary_initiation_condition, nrel_initiation_condition_and_result} =
            await scKeynodes.resolveArrayOfKeynodes(['sc_agent_implemented_in_js', 'nrel_primary_initiation_condition',
                'nrel_initiation_condition_and_result']);
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
                    sc_type_arc_pos_const_perm,
                    nrel_primary_initiation_condition
                ], {
                    'initiation_condition_arc': 2
                })]);
        const agentsInsts = map(prop('agent_inst'), agentDefinitions);
        const initiationConditionArcs = map(prop('initiation_condition_arc'), agentDefinitions);
        const srcAndTargetArcArray = await Promise.all(map(this._getArc, initiationConditionArcs));
        const agentsSysItdfs = await this.getSysIdtfs(agentsInsts);
        const definitions = [];
        const initAndResult = await Promise.all(map(this._readInitiationAndResult, agentsInsts));
        for (const idx in agentsInsts) {

            const agentDefinition = await this._createAgentDefinition(agentsSysItdfs[idx], agentsInsts[idx], srcAndTargetArcArray[idx], initAndResult[idx]);
            definitions.push(agentDefinition);
        }
        return definitions;
    }

    async _createAgentDefinition(sysIdtf, agentAddr, srcAndTargetScAddr, initAndResult) {
        const [eventTypeAddr, eventTargetAddr] = srcAndTargetScAddr;
        const [initCondAddr, finalCondAddr] = initAndResult;
        validate(arguments, ['string', 'natural', {0: 'natural', 1: 'natural'}, {0: 'natural', 1: 'natural'}]);
        validate(srcAndTargetScAddr, ['natural', 'natural']);
        const scEventType = await this.eventTypeUtils.getSctpEventType(eventTypeAddr);
        if (this.eventTypeUtils.isEventType(eventTypeAddr))
            return {
                agentAddr,
                eventTargetAddr,
                eventTypeAddr,
                agentSysIdtf: sysIdtf,
                scEventType,
                initCondAddr,
                finalCondAddr
            };
        else throw new Error(`Not an eventTypeAddr. Sys-idtf ${sysIdtf}`);
    }

}