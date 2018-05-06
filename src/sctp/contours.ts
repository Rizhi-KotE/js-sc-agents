import {SctpClient} from "./SctpClientPromisesAdapter";
import {sc_type_arc_pos_const_perm, SctpConstrIter, SctpContrIterationResult, SctpIteratorType} from "./ScTypes";
import * as R from "ramda";

function length(result: SctpContrIterationResult) {
    return result.results.length;
}

function triplesInContourQuery(contourAddr) {
    return [
        SctpConstrIter(SctpIteratorType.SCTP_ITERATOR_3F_A_A,
            [contourAddr, sc_type_arc_pos_const_perm, 0],
            {"source": 2}),
        SctpConstrIter(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F,
            ["source", 0, 0, sc_type_arc_pos_const_perm, contourAddr],
            {
                "edge": 1,
                "target": 2
            },
        )
    ]
}

/**
 * Load contour in structure of triples
 * @param sctpClient
 * @param contourAddr - sc-addr of contour
 */
export async function loadContourTriples(sctpClient: SctpClient, contourAddr: number): Promise<[number, number, number][]> {
    const contructs = await sctpClient.iterate_constr.apply(
        sctpClient, triplesInContourQuery(contourAddr)
    );
    const result: [number, number, number][] = [];
    for (let i = 0; i < length(contructs); i++) {
        result.push([contructs.get(i, "source"), contructs.get(i, "edge"), contructs.get(i, "target")])
    }
    return result;
}

export type ScElementTypeResolver = (addr: number) => number;

/**
 * Create synchronous function of getting type
 * @param sctpClient
 * @param addreses - array of sc-addres to wich function should get type
 * @returns {Promise<(addr:number)=>number>}
 */
export async function getElementTypeInit(sctpClient: SctpClient, addreses: number[]): Promise<ScElementTypeResolver> {
    const get_element_type: (number) => Promise<number> = sctpClient.get_element_type.bind(sctpClient);
    const types: number[] = await Promise.all(R.map(get_element_type, addreses));
    const addrToType: Map<number, number> = new Map();
    for (let i = 0; i < addreses.length; i++) {
        addrToType[addreses[i]] = types[i];
    }
    return (addr: number) => {
        if (addrToType[addr]) {
            return addrToType[addr];
        }
        throw new Error(`Element was not resolved [addr=${addr}]`);
    }
}

