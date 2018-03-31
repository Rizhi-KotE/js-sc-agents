import {utils} from "SCWeb";

const sctpClientPromise = new Promise((success, fail) => {
    utils.SctpClientCreate().done(success).fail(fail)
});
export const sctpClient = new SctpClientOnPromises(sctpClientPromise);
