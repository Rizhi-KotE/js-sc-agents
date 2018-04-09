import Registry from "../src/ScAgentRegistry";
import doCommand from "./Utils";
import * as utils from "utils";
import SctpClientOnPromises from "../src/adapters/SctpClientOnPromises";
import ScKeynodesAdapter from "../src/adapters/ScKeynodesAdapter";
import {
    SctpConstrIter,
    SctpIteratorType,
    sc_agent_implemented_in_js,
    sc_type_arc_pos_const_perm,
    sc_type_node,
    SctpClientCreate
} from "utils";

import {assert} from "chai";

async function initClient() {
    const sctpClientPromise = new Promise((success, fail) => {
        SctpClientCreate()
            .done((sctpClient) => {
                delete sctpClient.onClose;
                return sctpClient;
            }).done(success).fail(fail)
    });
    const sctpClient = new SctpClientOnPromises(sctpClientPromise);
    const scKeynodes = new ScKeynodesAdapter(sctpClientPromise);
    return [sctpClient, scKeynodes];
}

function NOOP() {
}

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

describe("sctpClient.js functionality", function () {
    let sctpClient;

    it("sctpClient.js should connect to SC", async function () {
        [sctpClient] = await initClient();
        return sctpClient.create_node(0x20 | 0x80);
    });

    afterEach(async function () {
        return sctpClient.close();
    })
});

describe("ScAgent registry", function () {
    let sctpClient, keynodes;
    beforeEach(async function () {
        [sctpClient, keynodes] = await initClient();
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
            registrationPromise = registry.register('sc_agent_of_finding_area', success));
        await registrationPromise;
        // await sctpClient.create_arc(sc_type_arc_pos_const_perm, sc_agent_of_finding_area, cmd_of_find_area);
        doCommand(cmd_of_find_area);
        return lastPromise;
    });

    it("Registering agent should react on creating command", async function () {
        const {sc_agent_of_finding_area, cmd_of_find_area} =
            await keynodes.resolveArrayOfKeynodes(['sc_agent_of_finding_area', 'cmd_of_find_area']);
        const registry = new Registry(sctpClient, keynodes);
        await registry.init();
        const agentDefinition = registry.definedAgents['sc_agent_of_finding_area'];
        let registrationPromise;
        let lastPromise = new Promise((success, fail) =>
            registrationPromise = registry.register('sc_agent_of_finding_area', success));
        await registrationPromise;
        // await sctpClient.create_arc(sc_type_arc_pos_const_perm, sc_agent_of_finding_area, cmd_of_find_area);
        doCommand(cmd_of_find_area);
        return lastPromise;
    });
});

