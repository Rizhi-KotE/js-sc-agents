import {ScKeynodes, SctpClient} from "@ostis/sc-network";
import {expect} from "chai";
import "../node_modules/mocha/mocha.js";
import {agentsKeynodes, ScAgentCommand} from "../src/ScAgent";

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

describe("sctpCleint functionality", function () {
    it("sctpClient should connect to SC", function (done) {
        let sctpClient = new SctpClient("ws://localhost:8081/sctp", 500, createNode, fail(done), fail(done));

        function createNode() {
            sctpClient.CreateNode(0x20 | 0x80)
                .done(success(done), fail(done));
        }
    });
});

describe("ScAgent functionality", function () {
    let sctpClient, keynodes;
    before(async function () {
        await new Promise(function (success, fail) {
            sctpClient = new SctpClient("ws://localhost:8081/sctp", 500, success, fail);
        });
        keynodes = new ScKeynodes(sctpClient);
        return keynodes.ResolveKeynodes(agentsKeynodes);
    });

    it("ScAgent should resolve promise after registration", async function () {
        const agent = new ScAgentCommand(sctpClient, keynodes, "test_command_class");
        return agent.register();
    });

    it("ScAgent should react on command", function (end) {
        expect(true).to.be.false();
        end()
    });

    it("ScAgent should save answer", function (end) {
        expect(true).to.be.false();
        end()
    });

    it("ScAgent should save failed answer", function (end) {
        expect(true).to.be.false();
        end()
    });
});