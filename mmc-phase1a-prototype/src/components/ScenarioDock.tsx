import * as React from "react";
import { Body, Button, SegmentedControl } from "@walmart/ld-kit";
import { getNextMilestone, isHomeContentUnlocked, pointsWord } from "../lib/phase1aEngine";
import { SCENARIO_PRESETS, scenarioForPoints, type ScenarioId } from "../lib/phase1aScenarios";
import type { UseScenarioReturn } from "../lib/useScenario";

/**
 * Prototype-only scenario selector, docked to the bottom of the review page
 * (outside the phone frame and outside `<Page>`). Picking a band seeds the
 * member's lifetime points; "Complete an activity" then runs the same
 * simulation as the side panel. The selected band is DERIVED from the
 * current points, so it stays truthful after completions and manual edits.
 */
export function ScenarioDock({ scenario }: { scenario: UseScenarioReturn }) {
  const points = scenario.previousLifetimePoints;
  const activeId = scenarioForPoints(points);
  const unlocked = isHomeContentUnlocked(points);
  const next = getNextMilestone(points);

  return (
    <section className="phase1a-dock" aria-label="Scenario selector">
      <div className="phase1a-dock-inner">
        <div className="phase1a-dock-select">
          <Body as="p" size="small" weight="alt" UNSAFE_style={{ margin: "0 0 6px" }}>
            Scenario — member&rsquo;s lifetime points
          </Body>
          <SegmentedControl
            aria-label="Scenario by lifetime points"
            value={activeId}
            onChange={(value) => scenario.selectScenario(value as ScenarioId)}
            isFullWidth
            items={SCENARIO_PRESETS.map((preset) => ({ value: preset.id, label: preset.label }))}
          />
        </div>

        <div className="phase1a-dock-status" aria-live="polite">
          <Body as="p" size="small" UNSAFE_style={{ margin: 0 }}>
            <strong>
              {points} lifetime {pointsWord(points)}
            </strong>{" "}
            &middot; Home modules {unlocked ? "unlocked" : "locked"}
          </Body>
          <Body as="p" size="small" color="subtle" UNSAFE_style={{ margin: 0 }}>
            {next ? `${next.threshold - points} to next milestone (${next.threshold})` : "Past the last milestone"}
          </Body>
        </div>

        <Button variant="primary" onClick={scenario.simulate}>
          Complete an activity (+{scenario.pointsEarnedInput} {pointsWord(scenario.pointsEarnedInput)})
        </Button>
      </div>
    </section>
  );
}
