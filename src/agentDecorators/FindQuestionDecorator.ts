import {sctpClient} from "../service/sctpClient";
import * as R from "ramda";
import {sc_type_arc_pos_const_perm, SctpConstrIter, SctpIteratorType, ScTriple} from "../sctp/ScTypes";
import {scKeynodes} from "../service/scKeynodes";
import {compileSctpQuery, createQueryToNotVariables, doSctpQuery, makeSctpQuery} from "../sctp/makeSctpQuery";
import {getElementTypeInit, loadContourTriples} from "../sctp/contours";
import {selectColumns} from "../sctp/sctpUtils";

/**
 * Find element in sc-structure like initCondition and is element of question_initiated
 * @param initCondAddr
 * @returns {Promise.<void>}
 */
async function findQuestion(request) {
    const {targetAddr, argAddr} = request;
    const arc = await sctpClient.get_arc(argAddr);
    return arc[1];
}

export const FindQuestionDecorator = R.curryN(2, async function (executor, request){
    request.question = await findQuestion(request);
    return executor(request);
});