import { add } from "../src/random";

jest.setTimeout(1000);

describe("simple add function", () => {
  it("does simple addition correcly", () => {
    expect(add(1, 2)).toEqual(3);
  });
});
