import { describe, expect, it } from "vitest";
import { SCENARIO_PRESETS, scenarioForPoints } from "./phase1aScenarios";
import { isHomeContentUnlocked } from "./phase1aEngine";

describe("scenario presets", () => {
  it("each seed falls inside its own band", () => {
    for (const preset of SCENARIO_PRESETS) {
      expect(scenarioForPoints(preset.seedPoints)).toBe(preset.id);
    }
  });

  it("maps band boundaries correctly", () => {
    expect(scenarioForPoints(249)).toBe("below250");
    expect(scenarioForPoints(250)).toBe("250to1000");
    expect(scenarioForPoints(999)).toBe("250to1000");
    expect(scenarioForPoints(1000)).toBe("1000to3000");
    expect(scenarioForPoints(2999)).toBe("1000to3000");
    expect(scenarioForPoints(3000)).toBe("above3000");
    expect(scenarioForPoints(99999)).toBe("above3000");
  });

  it("only the below-250 preset leaves Home modules locked", () => {
    expect(SCENARIO_PRESETS.map((p) => isHomeContentUnlocked(p.seedPoints))).toEqual([false, true, true, true]);
  });
});
