import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Reveal from "../Reveal";

describe("CSS reveal markup", () => {
  it("is server-rendered without animation hooks or browser observers", () => {
    const source = readFileSync("src/components/composables/Reveal.tsx", "utf8");
    for (const clientDependency of [
      '"use client"',
      "useEffect",
      "useState",
      "IntersectionObserver",
      "requestAnimationFrame",
    ]) {
      expect(source.includes(clientDependency)).toBe(false);
    }
  });

  it("preserves layout and exposes the scroll variant without inline hiding", () => {
    const html = renderToStaticMarkup(
      Reveal({
        className: "grid gap-4",
        animation: "fade-left",
        children: "Content",
      }),
    );
    expect(html).toContain("grid gap-4");
    expect(html).toContain('data-reveal="scroll"');
    expect(html).toContain('data-reveal-variant="fade-left"');
    expect(html).not.toContain("opacity:0");
    expect(html).toContain("Content");
  });

  it("computes child stagger values on the server", () => {
    const html = renderToStaticMarkup(
      Reveal({
        trigger: "load",
        delay: 0.2,
        stagger: 0.1,
        className: "grid",
        children: [
          createElement("span", { key: "one" }, "One"),
          createElement("span", { key: "two" }, "Two"),
        ],
      }),
    );
    expect(html.match(/data-reveal="load"/g)).toHaveLength(2);
    expect(html).toContain("--reveal-delay:0.2s");
    expect(html).toContain("--reveal-delay:0.3s");
    expect(html).not.toContain("opacity:0");
  });

  it("does not create grid items for absent conditional children", () => {
    const html = renderToStaticMarkup(
      Reveal({
        stagger: 0.1,
        children: [null, false, createElement("span", { key: "item" }, "Item"), "Text"],
      }),
    );
    expect(html.match(/data-reveal="scroll"/g)).toHaveLength(2);
    expect(html).toContain("--reveal-delay:0.1s");
  });
});
