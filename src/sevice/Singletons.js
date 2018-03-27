import {utils} from "SCWeb";
import SctpClientOnPromises from "../adapters/SctpClientOnPromises";
import ScKeynodesAdapter from "../adapters/ScKeynodesAdapter";


const sctpClientPromise = new Promise((success, fail) => utils.SctpClientCreate().done(success).fail(fail));
export const sctpClient = new SctpClientOnPromises(sctpClientPromise);
export const scKeynodes = new ScKeynodesAdapter(sctpClientPromise);
