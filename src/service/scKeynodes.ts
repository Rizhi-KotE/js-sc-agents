import {ScKeynodes, ScKeynodesAdapter} from "../adapters/ScKeynodesAdapter";

const sctpClientPromise = new Promise((success, fail) => {
    (window as any).SctpClientCreate().done(success).fail(fail)
});
export const scKeynodes: ScKeynodes = new ScKeynodesAdapter(sctpClientPromise);
