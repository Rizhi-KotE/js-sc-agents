import ScAgentRegistry from "./src/ScAgentRegistry"
import TypicalAgentDecorator from "./src/agentDecorators/TypicalAgentDecorator";
import {sctpClient} from "./src/service/sctpClient";
import {sc_type_arc_pos_const_perm, sc_type_const, sc_type_node, sc_type_node_class} from "./src/sctp/ScTypes";

export const scAgentRegistry = new ScAgentRegistry();
scAgentRegistry.init();

async function agent(request): Promise<number> {
    console.log(request);
    const node1 = await sctpClient.create_node(sc_type_node | sc_type_const);
    const node2 = await sctpClient.create_node(sc_type_node | sc_type_const);
    const result = await sctpClient.create_node(sc_type_node_class | sc_type_const);
    await  sctpClient.create_arc(sc_type_arc_pos_const_perm, result, node1);
    await  sctpClient.create_arc(sc_type_arc_pos_const_perm, result, node2);
    const arc = await  sctpClient.create_arc(sc_type_arc_pos_const_perm, node1, node2);
    await  sctpClient.create_arc(sc_type_arc_pos_const_perm, result, arc);
    return Promise.resolve(result);
}

scAgentRegistry.register("dummy_sc_agent", TypicalAgentDecorator(agent));
