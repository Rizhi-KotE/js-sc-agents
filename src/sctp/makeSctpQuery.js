var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { sc_type_arc_pos_const_perm, sc_type_const, SctpConstrIter, SctpIteratorType } from "./ScTypes";
import * as R from "ramda";
import { getElementTypeInit, loadContourTriples } from "./contours";
function isConstant(getElementType, addr) {
    return sc_type_const === (getElementType(addr) & sc_type_const);
}
/**
 * Check is triple has element, wich already was fixed
 * @WARN Don't check edge, because it hasn't corresponding iterator
 * @param isFixed
 * @param triple
 */
function isTripleHasFixedElement(isFixed, triple) {
    return isFixed(triple[0]) || isFixed(triple[2]);
}
export function getConstants(getElementType, triples) {
    var scElements = R.flatten(triples);
    var constants = R.filter(function (addr) { return isConstant(getElementType, addr); }, scElements);
    return new Set(constants);
}
var SctpIteratorTypeMap = {
    4: SctpIteratorType.SCTP_ITERATOR_3F_A_A,
    1: SctpIteratorType.SCTP_ITERATOR_3A_A_F,
    5: SctpIteratorType.SCTP_ITERATOR_3F_A_F
};
/**
 * Map iterator type on triple
 * @WARN Don't check edge, because it hasn't corresponding iterator
 * @param isScElementFixed
 * @param triple
 * @returns {any}
 */
function getIteratorType(isScElementFixed, triple) {
    var mask = 0;
    mask |= isScElementFixed(triple[2]) && 1;
    // mask |= isScElementFixed(triple[1]) && 2;
    mask |= isScElementFixed(triple[0]) && 4;
    //SCTP_ITERATOR_3F_A_A = 0
    if (SctpIteratorTypeMap[mask] !== 0 && !SctpIteratorTypeMap[mask])
        throw new Error("Incorrect iterator. [mask=" + mask + "]");
    return SctpIteratorTypeMap[mask];
}
function makeIteratorArgument(isConstant, isFixed, getMapping, getType, addr) {
    if (isConstant(addr)) {
        return addr;
    }
    else {
        if (isFixed(addr)) {
            return getMapping(addr);
        }
        else {
            return getType(addr);
        }
    }
}
function makeIteratorArgs(isConstant, isFixed, getMapping, getType, triple) {
    var makeIteratorArgumnetCurried = makeIteratorArgument.bind(null, isConstant, isFixed, getMapping, getType);
    return [makeIteratorArgumnetCurried(triple[0]), makeIteratorArgumnetCurried(triple[1]), makeIteratorArgumnetCurried(triple[2])];
}
function makeIteratorMapping(isFixed, getMapping, triple) {
    var mapping = {};
    if (!isFixed(triple[0]))
        mapping[getMapping(triple[0])] = 0;
    if (!isFixed(triple[1]))
        mapping[getMapping(triple[1])] = 1;
    if (!isFixed(triple[2]))
        mapping[getMapping(triple[2])] = 2;
    return mapping;
}
function getMappingInit() {
    var counter = 0;
    return R.memoize(function (addr) {
        counter++;
        return counter.toString();
    });
}
function makeIterator(isConstant, isFixed, getMapping, getElementType, triple) {
    return SctpConstrIter(getIteratorType(isFixed, triple), makeIteratorArgs(isConstant, isFixed, getMapping, getElementType, triple), makeIteratorMapping(isFixed, getMapping, triple));
}
function concatSet(left, right) {
    var newSet = new Set(left);
    right.forEach(function (elem) { return newSet.add(elem); });
    return newSet;
}
function isIteratorCorrect(iter) {
    return iter.iterator_type !== null || iter.iterator_type !== undefined;
}
function assertCorrectQuery(isFixed, triples) {
    if (!R.all(isFixed, R.flatten(triples)))
        throw new Error("Query don't fix all elements");
}
/**
 * Make array of SctpContrIterators from array of triples
 * Should use to find by pattern
 * @param getElementType
 * @param triples
 * @returns {Array}
 */
export function makeSctpQuery(getElementType, triples) {
    var fixed = getConstants(getElementType, triples);
    var getMapping = getMappingInit();
    var isFixed = function (addr) { return fixed.has(addr); };
    var isTripleFixed = isTripleHasFixedElement.bind(null, isFixed);
    var isNotFixed = R.complement(isFixed);
    var isConstantCurried = isConstant.bind(null, getElementType);
    var makeIteratorCurried = makeIterator.bind(null, isConstantCurried, isFixed, getMapping, getElementType);
    if (fixed.size === 0)
        throw new Error("there're no any constant in sc-contour.");
    var tripleWithoutFixedElement = triples, tripleWithFixedElement, query = [];
    while (true) {
        _a = R.partition(isTripleFixed, tripleWithoutFixedElement), tripleWithFixedElement = _a[0], tripleWithoutFixedElement = _a[1];
        if (tripleWithFixedElement.length === 0)
            throw new Error('No triple with fixed');
        var iterators = R.map(makeIteratorCurried, tripleWithFixedElement);
        iterators = R.filter(isIteratorCorrect, iterators);
        var newFixed = R.filter(isNotFixed, R.flatten(tripleWithFixedElement));
        fixed = concatSet(fixed, newFixed);
        query = R.concat(query, iterators);
        if (tripleWithoutFixedElement.length === 0)
            break;
    }
    assertCorrectQuery(isFixed, triples);
    return query;
    var _a;
}
/**
 * Load contour by sc-addr. And create array of iterators to use sctpClient.iterate_constr
 * @param scAddr - sc-addr of contour
 * @param sctpClient
 * @returns {Promise<SctpConstrIter[]>}
 */
export function compileSctpQuery(sctpClient, scAddr) {
    return __awaiter(this, void 0, void 0, function () {
        var loadContourTriplesCurried, triples, getElementType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loadContourTriplesCurried = loadContourTriples.bind(null, sctpClient);
                    return [4 /*yield*/, loadContourTriplesCurried(scAddr)];
                case 1:
                    triples = _a.sent();
                    return [4 /*yield*/, getElementTypeInit(sctpClient, R.flatten(triples))];
                case 2:
                    getElementType = _a.sent();
                    return [2 /*return*/, makeSctpQuery(getElementType, triples)];
            }
        });
    });
}
export function doSctpQuery(sctpClient, query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, sctpClient.iterate_constr.apply(sctpClient, query)];
        });
    });
}
/**
 * Append restrictions. Find construct only in contour
 * @param contextAddr - contour sc-addr
 * @param query - query without context
 */
export function createQueryWithContext(contextAddr, query) {
    var fixedMappings = query.map(function (iterator) { return iterator.mappings; });
    var bindings = R.keys(R.mergeAll(fixedMappings));
    var makeContextIterator = function (binding) { return SctpConstrIter(SctpIteratorType.SCTP_ITERATOR_3F_A_F, [
        contextAddr, sc_type_arc_pos_const_perm, binding
    ], {}); };
    return R.concat(query, R.map(makeContextIterator, bindings));
}
