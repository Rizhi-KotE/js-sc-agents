import _ from "underscore";
import validate from "./ValidationUtils";

export default class ScIteratorUtils {
    constructor(sctpClient) {
        this.sctpClient = sctpClient;
        this._iterate_constr = (query) => sctpClient.iterate_constr.apply(sctpClient, query);
    }

    async doStructsRequest(mapper, query) {
        const constructs = await this._iterate_constr(query);
        return mapper(constructs);
    }

// (scAddr|[...scAddr]) => Promise<{scAddr: linkContent}>
    async readLinks(addrs) {
        validate(arguments, ['array']);
        const linksPromises = addrs.map(this.sctpClient.bind(this.sctpClient));
        return Promise.all(linksPromises).then((content) => _.object(addrs, content));
    }

// (scAddr|[...scAddr]) => Promise<{scAddr: linkContent}>
    async readArcs(addrs) {
        validate(arguments, ['array']);
        const argsPromises = addrs.map(this.sctpClient.get_arc(this.sctpClient));
        return Promise.all(argsPromises);
    }

// (scAddr|[...scAddr]) => Promise<{scAddr: linkContent}>
    async getSysIdtf(addrs) {
        validate(arguments, ['array']);
        const argsPromises = addrs.map(this.sctpClient.get_(this.sctpClient));
        return Promise.all(argsPromises);
    }

// (ScConstrResults, [...string]) => [{...}]
    mapConstructs(requiredFields) {
        return (constructs) => {
            //[[...scAddress]]
            const values = constructs.results.map((el, idx) => requiredFields.map((field) => constructs.get(idx, field)));
            return values.map((scAddrs) => _.object(requiredFields, scAddrs))
        }
    }
}

