import {
    sc_type_arc_pos_const_perm, sc_type_const, sc_type_var, SctpConstrIter, SctpContrIterationResult, SctpIteratorType,
    ScTriple
} from "./ScTypes";
import * as R from "ramda";
import {getElementTypeInit, loadContourTriples, ScElementTypeResolver} from "./contours";
import {SctpClient} from "./SctpClientPromisesAdapter";

function isConstant(getElementType, addr): boolean {
    return sc_type_const === (getElementType(addr) & sc_type_const)
}

/**
 * Check is triple has element, wich already was fixed
 * @WARN Don't check edge, because it hasn't corresponding iterator
 * @param isFixed
 * @param triple
 */
function isTripleHasFixedElement(isFixed, triple: ScTriple): boolean {
    return isFixed(triple[0]) || isFixed(triple[2]);
}

export function getConstants(getElementType: (addr: number) => number, triples: ScTriple[]): Set<number> {
    const scElements = R.flatten<number>(triples);
    const constants = R.filter<number>((addr) => isConstant(getElementType, addr), scElements);
    return new Set(constants);
}

const SctpIteratorTypeMap = {
    0b100: SctpIteratorType.SCTP_ITERATOR_3F_A_A,
    0b001: SctpIteratorType.SCTP_ITERATOR_3A_A_F,
    0b101: SctpIteratorType.SCTP_ITERATOR_3F_A_F
};

/**
 * Map iterator type on triple
 * @WARN Don't check edge, because it hasn't corresponding iterator
 * @param isScElementFixed
 * @param triple
 * @returns {any}
 */
function getIteratorType(isScElementFixed: (addr: number) => boolean, triple: ScTriple) {
    let mask = 0;
    mask |= isScElementFixed(triple[2]) && 1;
    // mask |= isScElementFixed(triple[1]) && 2;
    mask |= isScElementFixed(triple[0]) && 4;

    //SCTP_ITERATOR_3F_A_A = 0
    if (SctpIteratorTypeMap[mask] !== 0 && !SctpIteratorTypeMap[mask]) throw new Error(`Incorrect iterator. [mask=${mask}]`);
    return SctpIteratorTypeMap[mask];
}

function makeIteratorArgument(isConstant, isFixed, getMapping, getType, addr: number) {
    if (isConstant(addr)) {
        return addr;
    } else {
        if (isFixed(addr)) {
            return getMapping(addr);
        } else {
            return getType(addr);
        }
    }
}

function makeIteratorArgs(isConstant, isFixed, getMapping, getType, triple: ScTriple): (string | number)[] {
    const makeIteratorArgumnetCurried: (addr: number) =>
        string
        | number = makeIteratorArgument.bind(null, isConstant, isFixed, getMapping, getType);
    return [makeIteratorArgumnetCurried(triple[0]), makeIteratorArgumnetCurried(triple[1]), makeIteratorArgumnetCurried(triple[2])]
}

function makeIteratorMapping(isFixed, getMapping, triple: ScTriple): Object {
    let mapping = {};
    if (!isFixed(triple[0])) mapping[getMapping(triple[0])] = 0;
    if (!isFixed(triple[1])) mapping[getMapping(triple[1])] = 1;
    if (!isFixed(triple[2])) mapping[getMapping(triple[2])] = 2;
    return mapping;
}

function makeIterator(isConstant, isFixed, getMapping, getElementType: ScElementTypeResolver, triple: ScTriple): SctpConstrIter {
    return SctpConstrIter(getIteratorType(isFixed, triple),
        makeIteratorArgs(isConstant, isFixed, getMapping, getElementType, triple),
        makeIteratorMapping(isFixed, getMapping, triple))
}

function concatSet(left: Set<number>, right): Set<number> {
    const newSet = new Set(left);
    right.forEach((elem) => newSet.add(elem));
    return newSet;
}

function isIteratorCorrect(iter: SctpConstrIter): boolean {
    return iter.iterator_type !== null || iter.iterator_type !== undefined;
}

function assertCorrectQuery(isFixed, triples: ScTriple[]): void {
    if (!R.all(isFixed, R.flatten<number>(triples))) throw new Error("Query don't fix all elements");
}


/**
 * Make array of SctpContrIterators from array of triples
 * Should use to find by pattern
 * @param getElementType
 * @param triples
 * @returns {Array}
 */
export function makeSctpQuery(getElementType: ScElementTypeResolver, triples: ScTriple[]): SctpConstrIter[] {
    let fixed = getConstants(getElementType, triples);
    const getMapping = R.toString;
    const isFixed = (addr: number) => fixed.has(addr);
    const isTripleFixed = isTripleHasFixedElement.bind(null, isFixed);
    const isNotFixed = R.complement(isFixed);
    const isConstantCurried = isConstant.bind(null, getElementType);
    const makeIteratorCurried = makeIterator.bind(null, isConstantCurried, isFixed, getMapping, getElementType);
    if (fixed.size === 0) throw new Error(`there're no any constant in sc-contour.`);
    let tripleWithoutFixedElement = triples, tripleWithFixedElement, query = [];
    while (true) {
        [tripleWithFixedElement, tripleWithoutFixedElement] = R.partition<ScTriple>(isTripleFixed, tripleWithoutFixedElement);
        if (tripleWithFixedElement.length === 0) throw new Error('No triple with fixed');
        for (const triple of tripleWithFixedElement) {
            const iterator = makeIteratorCurried(triple);
            if (isIteratorCorrect(iterator)) {
                let newFixed = R.filter(isNotFixed, triple);
                fixed = concatSet(fixed, newFixed);
                query.push(iterator);
            }

        }
        if (tripleWithoutFixedElement.length === 0) break;
    }
    assertCorrectQuery(isFixed, triples);
    return query;
}

/**
 * Load contour by sc-addr. And create array of iterators to use sctpClient.iterate_constr
 * @param scAddr - sc-addr of contour
 * @param sctpClient
 * @returns {Promise<SctpConstrIter[]>}
 */
export async function compileSctpQuery(sctpClient: SctpClient, scAddr: number) {
    const loadContourTriplesCurried = loadContourTriples.bind(null, sctpClient);
    const triples: ScTriple[] = await loadContourTriplesCurried(scAddr);
    const getElementType = await getElementTypeInit(sctpClient, R.flatten<number>(triples));
    return makeSctpQuery(getElementType, triples);
}

export async function doSctpQuery(sctpClient: SctpClient, query: SctpConstrIter[]): Promise<SctpContrIterationResult> {
    return sctpClient.iterate_constr.apply(sctpClient, query);
}

/**
 * Append restrictions. Find construct only in contour
 * @param contextAddr - contour sc-addr
 * @param query - query without context
 */
export function createQueryWithContext(contextAddr: number, query: SctpConstrIter[]): SctpConstrIter[] {
    const fixedMappings = query.map((iterator) => iterator.mappings);
    const bindings = R.keys(R.mergeAll(fixedMappings));
    const makeContextIterator = (binding) => SctpConstrIter(SctpIteratorType.SCTP_ITERATOR_3F_A_F, [
        contextAddr, sc_type_arc_pos_const_perm, binding
    ], {});
    return R.concat(query, R.map(makeContextIterator, bindings));
}

export function createQueryToNotVariables(query: SctpConstrIter[]): SctpConstrIter[] {
    const newQuery = [];
    for (const iter of query) {
        const args = R.map((arg) => R.type(arg) === 'Number' ? (arg as number) & (0xffffff ^ sc_type_var) : arg, iter.args);
        newQuery.push(SctpConstrIter(iter.iterator_type, args, iter.mappings));
    }
    return newQuery;
}
