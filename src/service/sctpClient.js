import * as utils from "utils";
import SctpClientOnPromises from "../adapters/SctpClientOnPromises";

const sctpClientPromise = new Promise((success, fail) => {
    utils.SctpClientCreate().done(success).fail(fail)
});
export const sctpClient = new SctpClientOnPromises(sctpClientPromise);
