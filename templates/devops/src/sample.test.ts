import { describe, it, expect } from "vitest";

/**
 * DONT GO CRAZY WITH GUI TESTS
 * TEST LOGIC BLOCKS WHERE THEY ARE STABLE
 * CODE USED IN BACKEND IS SOMETHING WE ALWAYS WANT TESTS ON
 */

describe("Sample test group 1", () => {
    it("test1", () =>
        new Promise<void>((done) => {
            expect(1).toEqual(1);
            done();
        }));
});
