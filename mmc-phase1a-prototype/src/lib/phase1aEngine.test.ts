import { describe, expect, it } from "vitest";
import {
  FIRST_MILESTONE_POINTS,
  computeCompletion,
  crossesFirstMilestone,
  getNextMilestone,
  isHomeContentUnlocked,
  isValidArm,
  pointsWord,
  resolveOutcome,
  simulateCompletion,
  type ScenarioState,
} from "./phase1aEngine";

describe("computeCompletion — points math (Section 5)", () => {
  it("matches the documented default scenario: 90 + 10 = 100, 150 remaining", () => {
    const result = computeCompletion({ previousLifetimePoints: 90, pointsEarned: 10 });
    expect(result.updatedLifetimePoints).toBe(100);
    expect(result.pointsRemaining).toBe(150);
    expect(result.crossedThreshold).toBe(false);
  });

  it("treats exactly 250 as crossing the threshold", () => {
    const result = computeCompletion({ previousLifetimePoints: 240, pointsEarned: 10 });
    expect(result.updatedLifetimePoints).toBe(FIRST_MILESTONE_POINTS);
    expect(result.crossedThreshold).toBe(true);
    // Remaining now counts toward the NEXT milestone (1000), not null.
    expect(result.pointsRemaining).toBe(750);
    expect(result.nextMilestoneId).toBe("basicIhut");
  });

  it("preserves overshoot past 250 instead of clamping to the milestone", () => {
    const result = computeCompletion({ previousLifetimePoints: 245, pointsEarned: 10 });
    expect(result.updatedLifetimePoints).toBe(255);
    expect(result.crossedThreshold).toBe(true);
    expect(result.pointsRemaining).toBe(745);
  });

  it("does NOT re-trigger the 250 crossing for a member already past it", () => {
    const result = computeCompletion({ previousLifetimePoints: 300, pointsEarned: 10 });
    expect(result.crossedThreshold).toBe(false);
    expect(result.pointsRemaining).toBe(690);
  });

  it("never reports a negative remaining count below threshold", () => {
    const result = computeCompletion({ previousLifetimePoints: 0, pointsEarned: 1 });
    expect(result.pointsRemaining).toBe(249);
  });
});

describe("resolveOutcome — routing (Section 4)", () => {
  const belowThreshold = computeCompletion({ previousLifetimePoints: 90, pointsEarned: 10 });
  const atThreshold = computeCompletion({ previousLifetimePoints: 240, pointsEarned: 10 });
  const overThreshold = computeCompletion({ previousLifetimePoints: 245, pointsEarned: 10 });

  it("routes Arm 1 below threshold to the control experience", () => {
    expect(resolveOutcome(1, belowThreshold)).toBe("arm1");
  });

  it("routes Arm 2 below threshold to the unnamed-benefit sheet", () => {
    expect(resolveOutcome(2, belowThreshold)).toBe("arm2");
  });

  it("routes Arm 3 below threshold to the named-benefit sheet", () => {
    expect(resolveOutcome(3, belowThreshold)).toBe("arm3");
  });

  it("routes every arm to the common unlock once the threshold is reached", () => {
    expect(resolveOutcome(1, atThreshold)).toBe("commonUnlock");
    expect(resolveOutcome(2, atThreshold)).toBe("commonUnlock");
    expect(resolveOutcome(3, atThreshold)).toBe("commonUnlock");
  });

  it("routes every arm to the common unlock on overshoot, bypassing the assigned arm", () => {
    expect(resolveOutcome(1, overThreshold)).toBe("commonUnlock");
    expect(resolveOutcome(2, overThreshold)).toBe("commonUnlock");
    expect(resolveOutcome(3, overThreshold)).toBe("commonUnlock");
  });
});

describe("simulateCompletion — persistence across repeated completions (Section 4)", () => {
  it("keeps the assigned arm fixed across repeated simulated completions", () => {
    let state: ScenarioState = { assignedArm: 2, previousLifetimePoints: 90 };

    const first = simulateCompletion(state, 10);
    expect(first.assignedArm).toBe(2);
    expect(first.outcome).toBe("arm2");
    expect(first.updatedLifetimePoints).toBe(100);

    // Caller advances previousLifetimePoints between completions; arm is untouched.
    state = { assignedArm: state.assignedArm, previousLifetimePoints: first.updatedLifetimePoints };
    const second = simulateCompletion(state, 160);
    expect(second.assignedArm).toBe(2);
    expect(second.previousLifetimePoints).toBe(100);
    expect(second.updatedLifetimePoints).toBe(260);
    // Crossing 250 on the second completion bypasses the (still Arm 2) assignment.
    expect(second.outcome).toBe("commonUnlock");
  });
});

describe("pointsWord — singular/plural grammar (Section 5)", () => {
  it("uses singular for exactly 1", () => {
    expect(pointsWord(1)).toBe("point");
    expect(pointsWord(-1)).toBe("point");
  });

  it("uses plural for everything else, including 0", () => {
    expect(pointsWord(0)).toBe("points");
    expect(pointsWord(2)).toBe("points");
    expect(pointsWord(150)).toBe("points");
  });
});

describe("isValidArm", () => {
  it("accepts only 1, 2, or 3", () => {
    expect(isValidArm(1)).toBe(true);
    expect(isValidArm(2)).toBe(true);
    expect(isValidArm(3)).toBe(true);
    expect(isValidArm(4)).toBe(false);
    expect(isValidArm(0)).toBe(false);
    expect(isValidArm(NaN)).toBe(false);
    expect(isValidArm("2")).toBe(false);
  });
});

describe("milestone ladder — scenario bands", () => {
  it("locks Home content below 250 and unlocks at exactly 250", () => {
    expect(isHomeContentUnlocked(249)).toBe(false);
    expect(isHomeContentUnlocked(250)).toBe(true);
    expect(isHomeContentUnlocked(3200)).toBe(true);
  });

  it("points at the right next milestone in each band", () => {
    expect(getNextMilestone(0)?.threshold).toBe(250);
    expect(getNextMilestone(249)?.id).toBe("homeContent");
    expect(getNextMilestone(250)?.id).toBe("basicIhut");
    expect(getNextMilestone(999)?.id).toBe("basicIhut");
    expect(getNextMilestone(1000)?.id).toBe("premiumIhut");
    expect(getNextMilestone(2999)?.id).toBe("premiumIhut");
    expect(getNextMilestone(3000)?.id).toBe("inStore");
    expect(getNextMilestone(3200)?.id).toBe("inStore");
  });

  it("returns no next milestone past the final one", () => {
    expect(getNextMilestone(1_000_000)).toBeNull();
    const result = computeCompletion({ previousLifetimePoints: 6000, pointsEarned: 10 });
    expect(result.pointsRemaining).toBeNull();
    expect(result.nextMilestoneId).toBeNull();
  });

  it("only treats a completion as crossing 250 when it starts below it", () => {
    expect(crossesFirstMilestone(245, 10)).toBe(true);
    expect(crossesFirstMilestone(250, 10)).toBe(false);
    expect(crossesFirstMilestone(90, 10)).toBe(false);
  });

  it("routes members already past 250 to their arm, not the common unlock", () => {
    for (const previous of [400, 1500, 3200]) {
      const state: ScenarioState = { assignedArm: 3, previousLifetimePoints: previous };
      expect(simulateCompletion(state, 10).outcome).toBe("arm3");
      expect(simulateCompletion({ ...state, assignedArm: 2 }, 10).outcome).toBe("arm2");
      expect(simulateCompletion({ ...state, assignedArm: 1 }, 10).outcome).toBe("arm1");
    }
  });

  it("reports remaining points to the next milestone per band (default +10)", () => {
    expect(simulateCompletion({ assignedArm: 2, previousLifetimePoints: 90 }, 10).pointsRemaining).toBe(150);
    expect(simulateCompletion({ assignedArm: 2, previousLifetimePoints: 400 }, 10).pointsRemaining).toBe(590);
    expect(simulateCompletion({ assignedArm: 2, previousLifetimePoints: 1500 }, 10).pointsRemaining).toBe(1490);
    expect(simulateCompletion({ assignedArm: 2, previousLifetimePoints: 3200 }, 10).pointsRemaining).toBe(1790);
  });
});
