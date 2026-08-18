import { describe, expect, it, vi } from "vitest";
import fs from "fs";
import path from "path";
import MailerQEjs from "../src/index";

const fixtures = path.join(__dirname, "fixtures");

describe("mailer-q-ejs", () => {
  it("renders a template with its locals interpolated", () => {
    const render = MailerQEjs(fixtures);
    expect(render("hello.ejs", { name: "Ada" })).toBe("<h1>Hello Ada</h1>");
  });

  it("returns a string", () => {
    const render = MailerQEjs(fixtures);
    expect(typeof render("hello.ejs", { name: "Ada" })).toBe("string");
  });

  it("resolves the template relative to the configured directory", () => {
    const spy = vi.spyOn(fs, "readFileSync");
    MailerQEjs(fixtures)("hello.ejs", { name: "Ada" });
    expect(spy).toHaveBeenCalledWith(path.join(fixtures, "hello.ejs"), "utf8");
    spy.mockRestore();
  });

  it("uses the locals passed to each call (no shared state)", () => {
    const render = MailerQEjs(fixtures);
    expect(render("hello.ejs", { name: "Ada" })).toBe("<h1>Hello Ada</h1>");
    expect(render("hello.ejs", { name: "Grace" })).toBe("<h1>Hello Grace</h1>");
  });

  it("throws when the template file does not exist", () => {
    expect(() => MailerQEjs(fixtures)("missing.ejs", {})).toThrow();
  });
});
