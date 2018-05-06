import * as R from "ramda";
import {scKeynodes} from "../service/scKeynodes";
import {sctpClient} from "../service/sctpClient";
import {sc_type_arc_common, sc_type_arc_pos_const_perm, sc_type_const, sc_type_node} from "../sctp/ScTypes";

export const AddNrelAnswerDecorator = R.curryN(2, async function (executor, request): Promise<any> {
    const nrel_answer = await scKeynodes.resolveKeynode('nrel_answer');
    const result = await executor(request);
    const answerArc = await   sctpClient.create_arc(sc_type_arc_common | sc_type_const, request.question, result);
    await sctpClient.create_arc(sc_type_arc_pos_const_perm, nrel_answer, answerArc);
    return Promise.resolve(result)

});