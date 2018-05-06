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
export function createSctpClientAdapter(url) {
    var sctpClientPromise = new Promise(function (success, fail) {
        var sctpClient = new window.SctpClient({
            onError: fail, onConnect: function () {
                success(sctpClient);
            }
        });
        sctpClient.connect(url);
    });
    return new SctpClientOnPromises(sctpClientPromise);
}
var SctpClientOnPromises = /** @class */ (function () {
    function SctpClientOnPromises(sctpClientPromise) {
        this.sctpClientPromise = sctpClientPromise;
    }
    SctpClientOnPromises.prototype._check = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sctpClientPromise];
            });
        });
    };
    SctpClientOnPromises.prototype.check_element = function (addr) {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.check_element(addr).then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.create_node = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.create_node(type).then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.create_arc = function (type, src, trg) {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.create_arc(type, src, trg).then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.create_link = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.create_link().then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.set_link_content = function (addr, data) {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.set_link_content(addr, data).then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.get_link_content = function (addr, type) {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.get_link_content(addr, type).then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.event_emit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.event_emit().then(success, fail); })
                                .then(console.log.bind(undefined, "Event "))];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.iterate_elements = function (iterator_type, args) {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.iterate_elements(iterator_type, args).then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.iterate_constr = function () {
        var iterators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            iterators[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.iterate_constr.apply(sctpClient, iterators).then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.find_element_by_system_identifier = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.find_element_by_system_identifier(data).then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.event_create = function (evt_type, addr, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.event_create(evt_type, addr, callback).then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.event_destroy = function (evt_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.event_destroy(evt_id).then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.erase_element = function (addr) {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.erase_element(addr).then(success, fail); })];
                }
            });
        });
    };
    ;
    SctpClientOnPromises.prototype.get_element_type = function (addr) {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.get_element_type(addr).then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.get_arc = function (arc) {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, new Promise(function (success, fail) { return sctpClient.get_arc(arc).then(success, fail); })];
                }
            });
        });
    };
    SctpClientOnPromises.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sctpClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sctpClientPromise];
                    case 1:
                        sctpClient = _a.sent();
                        return [2 /*return*/, sctpClient.socket.close()];
                }
            });
        });
    };
    return SctpClientOnPromises;
}());
export default SctpClientOnPromises;
