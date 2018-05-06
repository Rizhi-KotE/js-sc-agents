import {createSctpClientAdapter} from "../sctp/SctpClientPromisesAdapter";

export const sctpClient = createSctpClientAdapter("ws://localhost:8080/sctp");
