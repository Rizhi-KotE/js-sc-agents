import * as utils from "utils";
import ScKeynodesAdapter from "../adapters/ScKeynodesAdapter";

const sctpClientPromise = new Promise((success, fail) => {
    utils.SctpClientCreate().done(success).fail(fail)
});
export const scKeynodes = new ScKeynodesAdapter(sctpClientPromise);
