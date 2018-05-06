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
import { sc_type_arc_access, sc_type_edge_common, sc_type_link, sc_type_node } from "./ScTypes";
describe("Test sc utils", function () {
    var sctpClient = null;
    var loadContourTriples = null;
    beforeAll(function () {
        sctpClient = createSctpClientAdapter("ws://localhost:8000/sctp");
        loadContourTriples = loadContourTriplesWithClient.bind(null, sctpClient);
    });
    afterAll(function () {
        sctpClient.close();
    });
    describe("load contour as triples", function () {
        it("load PFC_NON_TERMINAL_CONTOUR shoud get 3 triples", function () {
            return __awaiter(this, void 0, void 0, function () {
                var contourAddr, triples;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sctpClient.find_element_by_system_identifier("PFC_NON_TERMINAL_CONTOUR")];
                        case 1:
                            contourAddr = _a.sent();
                            expect(contourAddr).toBeDefined();
                            return [4 /*yield*/, loadContourTriples(contourAddr)];
                        case 2:
                            triples = _a.sent();
                            expect(triples.length).toBe(3);
                            expect(triples).not.toContain(null);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("load test_contour_2_triples shoud get 3 triples", function () {
            return __awaiter(this, void 0, void 0, function () {
                var contourAddr, triples;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sctpClient.find_element_by_system_identifier("test_contour_2_triples")];
                        case 1:
                            contourAddr = _a.sent();
                            expect(contourAddr).toBeDefined();
                            return [4 /*yield*/, loadContourTriples(contourAddr)];
                        case 2:
                            triples = _a.sent();
                            expect(triples.length).toBe(2);
                            expect(triples).not.toContain(null);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("load types", function () {
        it("check elements types", function () {
            return __awaiter(this, void 0, void 0, function () {
                var typeNode, typeLink, edgeCommon, arcCommon, arcAccess, _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, sctpClient.find_element_by_system_identifier("elem_sc_type_node")];
                        case 1:
                            typeNode = _e.sent();
                            return [4 /*yield*/, sctpClient.find_element_by_system_identifier("elem_sc_type_link")];
                        case 2:
                            typeLink = _e.sent();
                            return [4 /*yield*/, sctpClient.find_element_by_system_identifier("elem_sc_type_edge_common")];
                        case 3:
                            edgeCommon = _e.sent();
                            return [4 /*yield*/, sctpClient.find_element_by_system_identifier("elem_sc_type_arc_common")];
                        case 4:
                            arcCommon = _e.sent();
                            return [4 /*yield*/, sctpClient.find_element_by_system_identifier("elem_sc_type_arc_access")];
                        case 5:
                            arcAccess = _e.sent();
                            _a = expect;
                            return [4 /*yield*/, sctpClient.get_element_type(typeNode)];
                        case 6:
                            _a.apply(void 0, [(_e.sent()) & sc_type_node]).toBe(sc_type_node);
                            _b = expect;
                            return [4 /*yield*/, sctpClient.get_element_type(typeLink)];
                        case 7:
                            _b.apply(void 0, [(_e.sent()) & sc_type_link]).toBe(sc_type_link);
                            _c = expect;
                            return [4 /*yield*/, sctpClient.get_element_type(edgeCommon)];
                        case 8:
                            _c.apply(void 0, [(_e.sent()) & sc_type_edge_common]).toBe(sc_type_edge_common);
                            // expect(await sctpClient.get_element_type(arcCommon) & sc_type_arc_common).toBe(sc_type_arc_common);
                            // expect(await sctpClient.get_element_type(arcCommon) & sc_type_edge_common).toBe(sc_type_edge_common);
                            _d = expect;
                            return [4 /*yield*/, sctpClient.get_element_type(arcAccess)];
                        case 9:
                            // expect(await sctpClient.get_element_type(arcCommon) & sc_type_arc_common).toBe(sc_type_arc_common);
                            // expect(await sctpClient.get_element_type(arcCommon) & sc_type_edge_common).toBe(sc_type_edge_common);
                            _d.apply(void 0, [(_e.sent()) & sc_type_arc_access]).toBe(sc_type_arc_access);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("get syncron version of get_element_type function", function () {
            return __awaiter(this, void 0, void 0, function () {
                var typeNode, typeLink, edgeCommon, arcCommon, arcAccess, addreses, getElementType, unresolvedElement;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sctpClient.find_element_by_system_identifier("elem_sc_type_node")];
                        case 1:
                            typeNode = _a.sent();
                            return [4 /*yield*/, sctpClient.find_element_by_system_identifier("elem_sc_type_link")];
                        case 2:
                            typeLink = _a.sent();
                            return [4 /*yield*/, sctpClient.find_element_by_system_identifier("elem_sc_type_edge_common")];
                        case 3:
                            edgeCommon = _a.sent();
                            return [4 /*yield*/, sctpClient.find_element_by_system_identifier("elem_sc_type_arc_common")];
                        case 4:
                            arcCommon = _a.sent();
                            return [4 /*yield*/, sctpClient.find_element_by_system_identifier("elem_sc_type_arc_access")];
                        case 5:
                            arcAccess = _a.sent();
                            addreses = [typeNode, typeLink, edgeCommon, arcCommon, arcAccess];
                            return [4 /*yield*/, getElementTypeInit(sctpClient, addreses)];
                        case 6:
                            getElementType = _a.sent();
                            expect(getElementType(typeNode) & sc_type_node).toBe(sc_type_node);
                            expect(getElementType(typeLink) & sc_type_link).toBe(sc_type_link);
                            expect(getElementType(edgeCommon) & sc_type_edge_common).toBe(sc_type_edge_common);
                            // expect(getElementType(arcCommon) & sc_type_arc_common).toBe(sc_type_arc_common);
                            expect(getElementType(arcAccess) & sc_type_arc_access).toBe(sc_type_arc_access);
                            unresolvedElement = 666;
                            expect(function () { return getElementType(unresolvedElement); })
                                .toThrow("Element was not resolved [addr=666]");
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
