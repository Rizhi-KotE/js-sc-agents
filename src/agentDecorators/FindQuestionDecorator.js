import {core} from "SCWeb";
import sctpClient from "../adapters/SctpClientOnPromises";
import {
    sc_agent_implemented_in_js,
    sc_type_arc_pos_const_perm,
    sc_type_node,
    SctpConstrIter,
    SctpIteratorType
} from "utils";
import * as R from "ramda";
const Server = core.Server;

/**
 * Find element in sc-structure like initCondition and is element of question_initiated
 * @param initCondAddr
 * @returns {Promise.<void>}
 */
async function findQuestion(initCondAddr) {
    const commandAddr = await scKeynodes.resolveKeynode('ui_menu_na_view_kb_pattern');
    const nrel_answer = await scKeynodes.resolveKeynode('nrel_answer');
    const question_initiated = await scKeynodes.resolveKeynode('question_initiated');
    const questionAddr = await new Promise((resolve, reject) => Server.doCommand(commandAddr, [initCondAddr], resolve));
    const resultTuple = await sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [questionAddr, 0, 0, 0, nrel_answer]);
    if (resultTuple.length !== 1) throw Error(`Question has ${resultTuple.length} answers`);
    const answer = resultTuple[0][2];
    const initiatedQuestions = await this.constrUtils.doStructsRequest(
        this.constrUtils.mapConstructs(['question_inst']), [
            SctpConstrIter(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
                answer,
                sc_type_arc_pos_const_perm,
                0
            ], {
                "question_inst": 2
            }),
            SctpConstrIter(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
                question_initiated,
                sc_type_arc_pos_const_perm,
                "question_inst"
            ])]);
    const questionInstances = R.map(R.prop('question_inst'), initiatedQuestions);
    if (questionInstances.length !== 1) throw Error(`Answer has ${resultTuple.length} initiated questions`);
    return questionInstances[0]
}

export const FindQuestionDecorator = R.curryN(2, async function (executor, request) {
    const initCondAddr = request.agentDefinition.initCondAddr;
    request.question = await findQuestion(initCondAddr);
    return executor(request);
})