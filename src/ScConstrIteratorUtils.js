import _ from "underscore";

export default class ScIteratorUtils {
    constructor(sctpClient) {
        this.sctpClient = sctpClient;
        this._iterate_constr = (query) => sctpClient.iterate_constr.apply(sctpClient, query);
    }

    async doStructsRequest(mapper, query) {
        const constructs = await this._iterate_constr(query);
        return mapper(constructs);
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

