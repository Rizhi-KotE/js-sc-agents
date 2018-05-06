import * as utils from "utils";

export default class ScKeynodesAdapter {
    constructor(sctpClientPromise) {
        this.scKeynodesPromise  = sctpClientPromise
            .then(sctpClient => new ScKeynodes(sctpClient));
    }

    async resolveArrayOfKeynodes(sysIdtfs) {
        const scKeynodes = await this.scKeynodesPromise;
        return scKeynodes.resolveArrayOfKeynodes.apply(scKeynodes, arguments);
    }

    async resolveKeynode(sysIdtf, property) {
        const scKeynodes = await this.scKeynodesPromise;
        return scKeynodes.resolveKeynode.apply(scKeynodes, arguments);
    }

    async getSysIdtfByAddress(scAddr) {
        const scKeynodes = await this.scKeynodesPromise;
        return scKeynodes.getSysIdtfByAddress.apply(scKeynodes, arguments);
    }
}