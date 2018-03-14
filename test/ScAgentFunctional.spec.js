import {expect} from "chai";
import "../node_modules/mocha/mocha.js";
import {agentsKeynodes, ScAgentCommand} from "../src/ScAgent";
import SctpClient from "../src/SctpClientOnPromises";

function NOOP() {
}

function logEvents(sctpClient) {
    const origin = sctpClient.__proto__.event_emit;
    sctpClient.__proto__.event_emit = function () {
        return origin.apply(this)
            .done((e) => console.log(`event came: ${e}`))
    }
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
        return new Promise((success, fail) => {
            sctpClient = new SctpClient({onError: fail, onClose: fail});
            sctpClient.connect("ws://localhost:8081/sctp", createNode);

            function createNode() {
                sctpClient.create_node(0x20 | 0x80)
                    .done(success, fail);
            }
        })
    });

    after(async function () {
        return sctpClient.close();
    })
});

describe("ScAgent functionality", function () {
    let sctpClient, keynodes, scAgent;
    before(async function () {
        await new Promise(function (success, fail) {
            sctpClient = new SctpClient({onError: fail, onClose: fail});
            sctpClient.connect("ws://localhost:8081/sctp", success);
        });
        keynodes = new ScKeynodes(sctpClient, []);
        return keynodes.resolveArrayOfKeynodes(agentsKeynodes);
    });

    it("ScAgent should resolve promise after registration", async function () {
        scAgent = new ScAgentCommand(sctpClient, keynodes, "test_command_class", NOOP);
        return scAgent.register();
    });

    it("ScAgent should react on command", async function () {
        sctpClient.eventFrequency = 10;
        logEvents(sctpClient);
        const {test_command_class, command_initiated} = await keynodes.resolveArrayOfKeynodes(['test_command_class']);

        let lastPromise = new Promise((success, fail) => scAgent = new ScAgentCommand(sctpClient, keynodes, "test_command_class", success))
            .then(console.log.bind(undefined, "promise"), console.error);
        await scAgent.register();
        await sctpClient.create_arc(sc_type_arc_pos_const_perm, command_initiated, test_command_class);
        return lastPromise
    });

    after(async function () {
        scAgent && scAgent.unregister();
        return sctpClient.close();
    })
    // it("ScAgent should react on command", async function (end) {
    //     const {test_command_class} = keynodes;
    //     new ScAgentCommand(sctpClient, keynodes, "test_command_class", end).register().catch(end);
    //     await doCommand(test_command_class);
    // });
    //
    // it("ScAgent should save answer", function (end) {
    //     expect(true).to.be.false();
    //     end()
    // });
    //
    // it("ScAgent should save failed answer", function (end) {
    //     expect(true).to.be.false();
    //     end()
    // });
});