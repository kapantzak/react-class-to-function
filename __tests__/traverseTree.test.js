import { generateSetterName } from "../src/traverseTree";

describe("generateSetterName()", () => {
  it("Should return 'setName' for prop name 'name'", () => {
    const expected = "setName";
    const actual = generateSetterName("name");
    expect(actual).toBe(expected);
  });

  it("Should return 'setA' for prop name 'a'", () => {
    const expected = "setA";
    const actual = generateSetterName("a");
    expect(actual).toBe(expected);
  });

  it("Should return null if provided with empty string", () => {
    const actual = generateSetterName("");
    expect(actual).toBeNull();
  });

  it("Should return null if provided with undefined", () => {
    const actual = generateSetterName();
    expect(actual).toBeNull();
  });
});
