import { describe, expect, it } from "vitest";
import { assertNever, isValidEmail, isValidSpanishPhone } from "./validation";

describe("isValidEmail", () => {
  it("accepts valid emails", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("name.surname@domain.org")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("notanemail")).toBe(false);
    expect(isValidEmail("@domain.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("user@.com")).toBe(false);
  });
});

describe("isValidSpanishPhone", () => {
  it("accepts valid Spanish phone numbers", () => {
    expect(isValidSpanishPhone("612345678")).toBe(true);
    expect(isValidSpanishPhone("912345678")).toBe(true);
    expect(isValidSpanishPhone("+34612345678")).toBe(true);
    expect(isValidSpanishPhone("0034612345678")).toBe(true);
    expect(isValidSpanishPhone("971123456")).toBe(true);
  });

  it("rejects invalid phone numbers", () => {
    expect(isValidSpanishPhone("")).toBe(false);
    expect(isValidSpanishPhone("123")).toBe(false);
    expect(isValidSpanishPhone("512345678")).toBe(false);
    expect(isValidSpanishPhone("112345678")).toBe(false);
    expect(isValidSpanishPhone("+3461234567")).toBe(false);
    expect(isValidSpanishPhone("text")).toBe(false);
  });
});

describe("assertNever", () => {
  it("throws an error with the provided value", () => {
    expect(() => assertNever("test" as never)).toThrow("Missing type: test");
  });
});
