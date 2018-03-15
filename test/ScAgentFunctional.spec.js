import {assert} from "chai";
import "../node_modules/mocha/mocha.js";
import {agentsKeynodes, ScAgentCommand} from "../src/ScAgent";
import SctpClient from "../src/SctpClientOnPromises";
import Registry from "../src/ScAgentRegistry";
import doCommand from "./Utils";

function NOOP() {
}

console.log(mocha);
mocha.setup('bdd');

function success(done) {
    return function (msg) {
        done();
    }
}
function fail(done) {
    return function (msg) {
        done(new Error(msg || "FAIL"))
    };
}

describe("sctpClient functionality", function () {
    let sctpClient;
    it("sctpClient should connect to SC", async function () {
        await new Promise((success, fail) => {
            sctpClient = new SctpClient({onError: fail, onClose: fail});
            sctpClient.connect("ws://localhost:8081/sctp", success);
        });
        return sctpClient.create_node(0x20 | 0x80);
    });

    after(async function () {
        return sctpClient.close();
    })
});

describe("ScAgent registry", function () {
    let sctpClient, keynodes;
    before(async function () {
        await new Promise(function (success, fail) {
            sctpClient = new SctpClient({eventFrequency: 50, onError: fail, onClose: fail});
            sctpClient.connect("ws://localhost:8081/sctp", success);
        });
        keynodes = new ScKeynodes(sctpClient, []);
    });

    it("Registry should find all js-agents", async function () {
        const scAgentOfFindingArea = await keynodes.resolveKeynode('sc_agent_of_finding_area');
        const registry = new Registry(sctpClient, keynodes);
        await registry.init();
        const agentDefinition = registry.definedAgents['sc_agent_of_finding_area'];
        assert.equal(scAgentOfFindingArea, agentDefinition.agentAddr);
    });

    it("Registrating agent should react on creating command", async function () {
        const {sc_agent_of_finding_area, cmd_of_find_area} =
            await keynodes.resolveArrayOfKeynodes(['sc_agent_of_finding_area', 'cmd_of_find_area']);
        const registry = new Registry(sctpClient, keynodes);
        await registry.init();
        const agentDefinition = registry.definedAgents['sc_agent_of_finding_area'];
        let registrationPromise;
        let lastPromise = new Promise((success, fail) =>
            registrationPromise = registry.registrate('sc_agent_of_finding_area', success));
        await registrationPromise;
        // await sctpClient.create_arc(sc_type_arc_pos_const_perm, sc_agent_of_finding_area, cmd_of_find_area);
        doCommand(cmd_of_find_area);
        return lastPromise;
    });
});

