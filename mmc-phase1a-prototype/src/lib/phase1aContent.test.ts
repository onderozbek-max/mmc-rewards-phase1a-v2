import { describe, expect, it } from "vitest";
import {
  bottomSheetHeadline,
  commonUnlock,
  lifetimeTotalLine,
  milestoneBenefit,
  progressCopyByArm,
  progressNoteByArm,
} from "./phase1aContent";

describe("Arm 2 vs Arm 3 content (Section 11 — experiment integrity)", () => {
  it("shares an identical headline and lifetime-total line for the same inputs", () => {
    expect(bottomSheetHeadline(10)).toBe("You earned 10 points");
    expect(lifetimeTotalLine(100)).toBe("You now have 100 lifetime points.");
  });

  it("differs from Arm 3 ONLY in the benefit-name phrase, not the lead-in", () => {
    const arm2 = progressCopyByArm.arm2(150);
    const arm3 = progressCopyByArm.arm3(150);

    // Same first line (points-remaining lead-in) — proves the two arms are
    // not just coincidentally similar, they share the exact same sentence.
    expect(arm2[0]).toBe(arm3[0]);
    expect(arm2[0]).toBe("150 points to unlock");

    // Second line is the ONLY point of divergence.
    expect(arm2[1]).toBe("your next Community benefit.");
    expect(arm3[1]).toBe("expanded Community Home content.");
    expect(arm2[1]).not.toBe(arm3[1]);

    // Arm 2 never leaks the real benefit name.
    expect(arm2.join(" ")).not.toContain("expanded Community Home content");
  });

  it("pluralizes correctly for a single remaining point", () => {
    expect(progressCopyByArm.arm2(1)[0]).toBe("1 point to unlock");
    expect(progressCopyByArm.arm3(1)[0]).toBe("1 point to unlock");
  });

  it("pluralizes the headline and lifetime line for singular values", () => {
    expect(bottomSheetHeadline(1)).toBe("You earned 1 point");
    expect(lifetimeTotalLine(1)).toBe("You now have 1 lifetime point.");
  });
});

describe("Common unlock copy (Section 7)", () => {
  it("never uses the retired phrase 'unhide homepage modules'", () => {
    const text = `${commonUnlock.headline} ${commonUnlock.supportingLine(255)}`;
    expect(text.toLowerCase()).not.toContain("unhide");
    expect(text).toContain("unlocked expanded Community Home content");
  });

  it("preserves overshoot in the supporting line", () => {
    expect(commonUnlock.supportingLine(255)).toContain("255 lifetime points");
  });
});

describe("Per-milestone Arm 2 vs Arm 3 copy", () => {
  it("Arm 2 stays vague at every milestone — never names a benefit, never adds a note", () => {
    for (const id of Object.keys(milestoneBenefit) as (keyof typeof milestoneBenefit)[]) {
      const text = progressCopyByArm.arm2(100).join(" ");
      expect(text).toBe("100 points to unlock your next Community benefit.");
      expect(progressNoteByArm("arm2", id)).toBeNull();
    }
  });

  it("Arm 3 names the right benefit for each milestone, sharing line 1 with Arm 2", () => {
    expect(progressCopyByArm.arm3(150, "homeContent")).toEqual(["150 points to unlock", "expanded Community Home content."]);
    expect(progressCopyByArm.arm3(590, "basicIhut")).toEqual(["590 points to unlock", "basic IHUT eligibility."]);
    expect(progressCopyByArm.arm3(1490, "premiumIhut")).toEqual(["1490 points to unlock", "premium IHUT eligibility."]);
    expect(progressCopyByArm.arm3(1790, "inStore")).toEqual(["1790 points to unlock", "exclusive in-store benefits."]);
    expect(progressCopyByArm.arm3(590, "basicIhut")[0]).toBe(progressCopyByArm.arm2(590)[0]);
  });

  it("Arm 3 flags coming-soon benefits; the home-content unlock has no such note", () => {
    expect(progressNoteByArm("arm3", "homeContent")).toBeNull();
    expect(progressNoteByArm("arm3", "basicIhut")).toBe("Coming soon after unlock.");
    expect(progressNoteByArm("arm3", "premiumIhut")).toBe("Coming soon after unlock.");
    expect(progressNoteByArm("arm3", "inStore")).toBe("Coming soon.");
    expect(progressNoteByArm("arm3", null)).toBeNull();
  });
});
