import {assert} from "chai";
import "../node_modules/mocha/mocha.js";
import getSysIdtf from "../src/GetSysItdf";
import SctpClient from "../src/SctpClientOnPromises";

function NOOP() {
}

describe("GetSysIdtf", function () {
    let sctpClient, keynodes;

    before(async function () {
        await new Promise(function (success, fail) {
            sctpClient = new SctpClient({onError: fail, onClose: fail});
            sctpClient.connect("ws://localhost:8081/sctp", success);
        });
        keynodes = new ScKeynodes(sctpClient, []);
    });

    it("Successful finding", async function () {
        const scAddr = await keynodes.resolveKeynode("test_command_class");
        const sysIdtf = await getSysIdtf(sctpClient, keynodes, [scAddr]);
        assert.equal(sysIdtf, "test_command_class");
    });

    after(async function () {
        return sctpClient.close();
    })
})
