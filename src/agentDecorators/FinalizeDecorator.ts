
import * as R from "ramda";
import {sctpClient} from "../service/sctpClient";
import {scKeynodes} from "../service/scKeynodes";
import {sc_type_arc_pos_const_perm} from "../sctp/ScTypes";


/**
 * On agents finish remove question from initiated and append to finished set
 * @returns {Promise.<void>}
 */
export const FinalizeDecorator = R.curryN(2, async function (executor, request) {
    if (!request.question) throw new Error(`Request for agent ${request.agentDefinition.agentSysIdtf} should contain question addr`);
    const question_finished_successfully = await scKeynodes.resolveKeynode('question_finished_successfully');
    const question_finished = await scKeynodes.resolveKeynode('question_finished');
    const question_finished_with_error = await scKeynodes.resolveKeynode('question_finished_with_error');
    try {
        const result = await executor(request);
        await appendToSet(question_finished_successfully, request.question);
        return result;
    } catch (e) {
        console.error(e);
        await appendToSet(question_finished_with_error, request.question);
    } finally {
        await appendToSet(question_finished, request.question);
    }
});

async function appendToSet(setAddr, elementAddr) {
    sctpClient.create_arc(sc_type_arc_pos_const_perm, setAddr, elementAddr);
}

