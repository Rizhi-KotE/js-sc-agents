import sctpClient from "../adapters/SctpClientOnPromises";

import {sc_type_arc_pos_const_perm} from "utils";
import * as R from "ramda";


/**
 * On agents finish remove question from initiated and append to finished set
 * @returns {Promise.<void>}
 */
export const FinalizeDecorator = R.curryN(2, async function (executor, request) {
    if (!request.question) throw new Error(`Request for agent ${request.agentDefinition.agentSysIdtf} should contain question addr`);
    const [question_finished_successfully, question_finished_with_error] = scKeynodes.resolveArrayOfKeynodes(['question_finished_successfully', 'question_finished_with_error']);
    try {
        const result = executor(request);
        await appendToSet(question_finished_successfully, request.question);
        return result;
    } catch (e) {
        console.error(e);
        await appendToSet(question_finished_with_error, request.question);
    }
});

async function appendToSet(setAddr, elementAddr) {
    sctpClient.create_arc(sc_type_arc_pos_const_perm, setAddr, elementAddr);
}

