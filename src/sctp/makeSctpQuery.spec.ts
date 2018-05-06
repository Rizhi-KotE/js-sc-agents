import {createSctpClientAdapter, SctpClient} from "./SctpClientPromisesAdapter";
import {getElementTypeInit, loadContourTriples as loadContourTriplesWithClient} from "./contours";
import {sc_type_arc_pos_const_perm, SctpConstrIter, SctpIteratorType, ScTriple} from "./ScTypes";
import {compileSctpQuery, createQueryWithContext, doSctpQuery, getConstants, makeSctpQuery} from "./makeSctpQuery";
import * as R from "ramda";

describe("Test making query from sc-countour", function () {
    let sctpClient: SctpClient = null;
    let loadContourTriples: (addr: number) => Promise<ScTriple[]> = null;
    beforeAll(function () {
        sctpClient = createSctpClientAdapter("ws://localhost:8000/sctp");
        loadContourTriples = loadContourTriplesWithClient.bind(null, sctpClient);
    });

    afterAll(function () {
        sctpClient.close();
    });

    it("check existance of data", async function () {
        const make_constr_query_test_1_constant_1: number = await sctpClient.find_element_by_system_identifier("make_constr_query_test_1_constant_1");
        const make_constr_query_test_1: number = await sctpClient.find_element_by_system_identifier("make_constr_query_test_1");
        expect(make_constr_query_test_1).toBeDefined();
        expect(make_constr_query_test_1_constant_1).toBeDefined();
    });

    describe("make sctpContucts query from sc-contour", function () {
        it("should create two iterators. And first element should be equal to make_constr_query_test_1_constant_1", async function () {
            const make_constr_query_test_1_constant_1: number = await sctpClient.find_element_by_system_identifier("make_constr_query_test_1_constant_1");
            const make_constr_query_test_1: number = await sctpClient.find_element_by_system_identifier("make_constr_query_test_1");
            const triples: ScTriple[] = await loadContourTriples(make_constr_query_test_1);
            const getElementType = await getElementTypeInit(sctpClient, R.flatten<number>(triples));
            expect(triples.length).toBe(2);

            const query: SctpConstrIter[] = makeSctpQuery(getElementType, triples);

            expect(query.length).toBe(2);
            expect(query[0].args[0]).toBe(make_constr_query_test_1_constant_1);
        });

        it("should create three iterators. First elements of first two should be either constant_1 or constant_2", async function () {
            const make_constr_query_test_2_constant_1: number = await sctpClient.find_element_by_system_identifier("make_constr_query_test_2_constant_1");
            const make_constr_query_test_2_constant_2: number = await sctpClient.find_element_by_system_identifier("make_constr_query_test_2_constant_2");
            const make_constr_query_test_1: number = await sctpClient.find_element_by_system_identifier("make_constr_query_test_2");
            const triples: ScTriple[] = await loadContourTriples(make_constr_query_test_1);
            const getElementType = await getElementTypeInit(sctpClient, R.flatten<number>(triples));
            expect(triples.length).toBe(3);

            const query: SctpConstrIter[] = makeSctpQuery(getElementType, triples);

            expect(query.length).toBe(3);
            const constants = [query[0].args[0], query[1].args[0]];
            expect(constants).toContain(make_constr_query_test_2_constant_1);
            expect(constants).toContain(make_constr_query_test_2_constant_2);
        });
    });

    it("get constants from contour", async function () {
        const make_constr_query_test_1_constant_1: number = await sctpClient.find_element_by_system_identifier("make_constr_query_test_1_constant_1");
        const make_constr_query_test_1: number = await sctpClient.find_element_by_system_identifier("make_constr_query_test_1");
        const triples: ScTriple[] = await loadContourTriples(make_constr_query_test_1);
        expect(triples.length).toBe(2);

        const getElementType = await getElementTypeInit(sctpClient, R.flatten<number>(triples));

        const constants: Set<number> = getConstants(getElementType, triples);

        expect(constants.size).toBe(1);
        expect(constants.has(make_constr_query_test_1_constant_1)).toBeTruthy();
    });

    it("Query using created query should read it self", async function () {
        const PFC_NON_TERMINAL_CONTOUR: number = await sctpClient.find_element_by_system_identifier("PFC_NON_TERMINAL_CONTOUR");
        const PFC: number = await sctpClient.find_element_by_system_identifier("PFC");
        const query: SctpConstrIter[] = await compileSctpQuery(sctpClient, PFC_NON_TERMINAL_CONTOUR);

        const rs = await doSctpQuery(sctpClient, query);
        expect(rs.results.length).toBe(2);
        expect(rs.results[0]).toContain(PFC);
        expect(rs.results[1]).toContain(PFC);
    });

    it("Query with context should get result contating context contour", async function () {
        const PFC_NON_TERMINAL_CONTOUR: number = await sctpClient.find_element_by_system_identifier("PFC_NON_TERMINAL_CONTOUR");
        const PFC: number = await sctpClient.find_element_by_system_identifier("PFC");
        const query: SctpConstrIter[] = await compileSctpQuery(sctpClient, PFC_NON_TERMINAL_CONTOUR);
        const queryWithContext: SctpConstrIter[] = createQueryWithContext(PFC_NON_TERMINAL_CONTOUR, query);

        const rs = await doSctpQuery(sctpClient, queryWithContext);
        expect(rs.results.length).toBe(1);
        expect(rs.results[0]).toContain(PFC);
        expect(rs.results[0]).toContain(PFC_NON_TERMINAL_CONTOUR);
    });
});
