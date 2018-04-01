import ScAgentRegistry from "./ScAgentRegistry";

describe("ScAgentRegistry", function () {
    let registry, loadAgentsMock, subscribeToEvent;
    beforeEach(function () {
        registry = new ScAgentRegistry();
        registry.scAgentRepository.loadAgentsDefinition = jest.fn();
        loadAgentsMock = registry.scAgentRepository.loadAgentsDefinition;
        registry._subscribeToEvent = jest.fn();
        subscribeToEvent = registry._subscribeToEvent;
    });

    it("Should define agent and don't activate it", async function () {
        loadAgentsMock
            .mockReturnValue(Promise.resolve([{agentSysIdtf: "agent"}]));

        await registry.init();

        expect(registry.definedAgents).toEqual({agent: {agentSysIdtf: "agent"}});
        expect(subscribeToEvent).not.toBeCalled();
    });

    it("Should register agent and don't activate it", async function () {
        registry.register("agent", jest.fn());

        expect(registry.registeredAgents.agent).toBeDefined();
        expect(subscribeToEvent).not.toBeCalled();
    });

    it("Should define agent, then register and activate it", async function () {
        loadAgentsMock
            .mockReturnValue(Promise.resolve([{agentSysIdtf: "agent"}]));

        await registry.init();
        await registry.register("agent", jest.fn());

        expect(subscribeToEvent).toBeCalledWith("agent")
    });

    it("Should register agent, then define and activate it", async function () {
        loadAgentsMock
            .mockReturnValue(Promise.resolve([{agentSysIdtf: "agent"}]));

        await registry.register("agent", jest.fn());
        await registry.init();

        expect(subscribeToEvent).toBeCalledWith("agent")
    });
});