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
import { createSctpClientAdapter } from "./SctpClientPromisesAdapter";
import { getElementTypeInit, loadContourTriples as loadContourTriplesWithClient } from "./contours";
import { compileSctpQuery, createQueryWithContext, doSctpQuery, getConstants, makeSctpQuery } from "./makeSctpQuery";
import * as R from "ramda";
describe("Test making query from sc-countour", function () {
    var sctpClient = null;
    var loadContourTriples = null;
    beforeAll(function () {
        sctpClient = createSctpClientAdapter("ws://localhost:8000/sctp");
        loadContourTriples = loadContourTriplesWithClient.bind(null, sctpClient);
    });
    afterAll(function () {
        sctpClient.close();
    });
    it("check existance of data", function () {
        return __awaiter(this, void 0, void 0, function () {
            var make_constr_query_test_1_constant_1, make_constr_query_test_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sctpClient.find_element_by_system_identifier("make_constr_query_test_1_constant_1")];
                    case 1:
                        make_constr_query_test_1_constant_1 = _a.sent();
                        return [4 /*yield*/, sctpClient.find_element_by_system_identifier("make_constr_query_test_1")];
                    case 2:
                        make_constr_query_test_1 = _a.sent();
                        expect(make_constr_query_test_1).toBeDefined();
                        expect(make_constr_query_test_1_constant_1).toBeDefined();
                        return [2 /*return*/];
                }
            });
        });
    });
    describe("make sctpContucts query from sc-contour", function () {
        it("should create two iterators. And first element should be equal to make_constr_query_test_1_constant_1", function () {
            return __awaiter(this, void 0, void 0, function () {
                var make_constr_query_test_1_constant_1, make_constr_query_test_1, triples, getElementType, query;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sctpClient.find_element_by_system_identifier("make_constr_query_test_1_constant_1")];
                        case 1:
                            make_constr_query_test_1_constant_1 = _a.sent();
                            return [4 /*yield*/, sctpClient.find_element_by_system_identifier("make_constr_query_test_1")];
                        case 2:
                            make_constr_query_test_1 = _a.sent();
                            return [4 /*yield*/, loadContourTriples(make_constr_query_test_1)];
                        case 3:
                            triples = _a.sent();
                            return [4 /*yield*/, getElementTypeInit(sctpClient, R.flatten(triples))];
                        case 4:
                            getElementType = _a.sent();
                            expect(triples.length).toBe(2);
                            query = makeSctpQuery(getElementType, triples);
                            expect(query.length).toBe(2);
                            expect(query[0].args[0]).toBe(make_constr_query_test_1_constant_1);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should create three iterators. First elements of first two should be either constant_1 or constant_2", function () {
            return __awaiter(this, void 0, void 0, function () {
                var make_constr_query_test_2_constant_1, make_constr_query_test_2_constant_2, make_constr_query_test_1, triples, getElementType, query, constants;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sctpClient.find_element_by_system_identifier("make_constr_query_test_2_constant_1")];
                        case 1:
                            make_constr_query_test_2_constant_1 = _a.sent();
                            return [4 /*yield*/, sctpClient.find_element_by_system_identifier("make_constr_query_test_2_constant_2")];
                        case 2:
                            make_constr_query_test_2_constant_2 = _a.sent();
                            return [4 /*yield*/, sctpClient.find_element_by_system_identifier("make_constr_query_test_2")];
                        case 3:
                            make_constr_query_test_1 = _a.sent();
                            return [4 /*yield*/, loadContourTriples(make_constr_query_test_1)];
                        case 4:
                            triples = _a.sent();
                            return [4 /*yield*/, getElementTypeInit(sctpClient, R.flatten(triples))];
                        case 5:
                            getElementType = _a.sent();
                            expect(triples.length).toBe(3);
                            query = makeSctpQuery(getElementType, triples);
                            expect(query.length).toBe(3);
                            constants = [query[0].args[0], query[1].args[0]];
                            expect(constants).toContain(make_constr_query_test_2_constant_1);
                            expect(constants).toContain(make_constr_query_test_2_constant_2);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    it("get constants from contour", function () {
        return __awaiter(this, void 0, void 0, function () {
            var make_constr_query_test_1_constant_1, make_constr_query_test_1, triples, getElementType, constants;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sctpClient.find_element_by_system_identifier("make_constr_query_test_1_constant_1")];
                    case 1:
                        make_constr_query_test_1_constant_1 = _a.sent();
                        return [4 /*yield*/, sctpClient.find_element_by_system_identifier("make_constr_query_test_1")];
                    case 2:
                        make_constr_query_test_1 = _a.sent();
                        return [4 /*yield*/, loadContourTriples(make_constr_query_test_1)];
                    case 3:
                        triples = _a.sent();
                        expect(triples.length).toBe(2);
                        return [4 /*yield*/, getElementTypeInit(sctpClient, R.flatten(triples))];
                    case 4:
                        getElementType = _a.sent();
                        constants = getConstants(getElementType, triples);
                        expect(constants.size).toBe(1);
                        expect(constants.has(make_constr_query_test_1_constant_1)).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Query using created query should read it self", function () {
        return __awaiter(this, void 0, void 0, function () {
            var PFC_NON_TERMINAL_CONTOUR, PFC, query, rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sctpClient.find_element_by_system_identifier("PFC_NON_TERMINAL_CONTOUR")];
                    case 1:
                        PFC_NON_TERMINAL_CONTOUR = _a.sent();
                        return [4 /*yield*/, sctpClient.find_element_by_system_identifier("PFC")];
                    case 2:
                        PFC = _a.sent();
                        return [4 /*yield*/, compileSctpQuery(sctpClient, PFC_NON_TERMINAL_CONTOUR)];
                    case 3:
                        query = _a.sent();
                        return [4 /*yield*/, doSctpQuery(sctpClient, query)];
                    case 4:
                        rs = _a.sent();
                        expect(rs.results.length).toBe(2);
                        expect(rs.results[0]).toContain(PFC);
                        expect(rs.results[1]).toContain(PFC);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Query with context should get result contating context contour", function () {
        return __awaiter(this, void 0, void 0, function () {
            var PFC_NON_TERMINAL_CONTOUR, PFC, query, queryWithContext, rs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sctpClient.find_element_by_system_identifier("PFC_NON_TERMINAL_CONTOUR")];
                    case 1:
                        PFC_NON_TERMINAL_CONTOUR = _a.sent();
                        return [4 /*yield*/, sctpClient.find_element_by_system_identifier("PFC")];
                    case 2:
                        PFC = _a.sent();
                        return [4 /*yield*/, compileSctpQuery(sctpClient, PFC_NON_TERMINAL_CONTOUR)];
                    case 3:
                        query = _a.sent();
                        queryWithContext = createQueryWithContext(PFC_NON_TERMINAL_CONTOUR, query);
                        return [4 /*yield*/, doSctpQuery(sctpClient, queryWithContext)];
                    case 4:
                        rs = _a.sent();
                        expect(rs.results.length).toBe(1);
                        expect(rs.results[0]).toContain(PFC);
                        expect(rs.results[0]).toContain(PFC_NON_TERMINAL_CONTOUR);
                        return [2 /*return*/];
                }
            });
        });
    });
});
