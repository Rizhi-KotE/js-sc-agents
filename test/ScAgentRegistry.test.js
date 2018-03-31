jest.mock("../src/ScAgentsRepository");

import ScAgentRegistry from "../src/ScAgentRegistry";

describe("ScAgentRegistry", function () {

    it("Should define agent and don't activate it", async function () {
        const registry = new ScAgentRegistry();
        await registry.init();
    })
});