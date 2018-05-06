import {createSctpClientAdapter} from "./SctpClientPromisesAdapter";
import {sc_type_node_class} from "./ScTypes";

describe("sctpClient", function () {
    it("check connection", async function () {
        const sctpClientOnPromises = createSctpClientAdapter("ws://localhost:8000/sctp");
        let node = await sctpClientOnPromises.create_node(sc_type_node_class);
        expect(node).toBeDefined();
    })
});