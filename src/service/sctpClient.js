import { createSctpClientAdapter } from "../sctp/SctpClientPromisesAdapter";
export var sctpClient = createSctpClientAdapter("ws://localhost:8080/sctp");
