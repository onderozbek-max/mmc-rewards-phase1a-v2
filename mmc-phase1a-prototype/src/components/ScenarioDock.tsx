import * as React from "react";
import { Body, Button, Heading, Icon, SegmentedControl, Tag } from "@walmart/ld-kit";
import { getNextMilestone, isHomeContentUnlocked, pointsWord } from "../lib/phase1aEngine";
import { milestoneBenefit } from "../lib/phase1aContent";
import { SCENARIO_PRESETS, scenarioForPoints, type ScenarioId } from "../lib/phase1aScenarios";
import type { UseScenarioReturn } from "../lib/useScenario";

/**
 * Prototype-only scenario selector, docked to the bottom of the review page
 * (outside the phone frame and outside `<Page>`). Reads left to right as a
 * two-step flow: (1) pick the member's situation, see where they stand;
 * (2) complete an activity to see what that member would be shown.
 *
 * The selected band is DERIVED from the member's current points, so it stays
 * truthful after completions and manual edits in the side panel.
 */
export function ScenarioDock({ scenario }: { scenario: UseScenarioReturn }) {
  const points = scenario.previousLifetimePoints;
  const activeId = scenarioForPoints(points);
  const unlocked = isHomeContentUnlocked(points);
  // Option B never surfaces milestones beyond 250 — keep the presenter readout
  // consistent with what the member is shown in that mode.
  const next = scenario.mode === "B" && unlocked ? null : getNextMilestone(points);
  const earned = scenario.pointsEarnedInput;

  return (
    <section className="phase1a-dock" aria-label="Scenario selector">
      <div className="phase1a-dock-inner">
        {/* Step 1 — choose the member's situation */}
        <div className="phase1a-dock-panel phase1a-dock-pick">
          <div className="phase1a-dock-step">
            <span className="phase1a-dock-badge" aria-hidden="true">
              1
            </span>
            <Heading as="h2" size="small" UNSAFE_style={{ margin: 0 }}>
              Choose a member scenario
            </Heading>
          </div>
          <Body as="p" size="small" color="subtle" UNSAFE_style={{ margin: "4px 0 10px" }}>
            How many lifetime points does the member already have?
          </Body>
          <SegmentedControl
            aria-label="Member scenario by lifetime points"
            value={activeId}
            onChange={(value) => scenario.selectScenario(value as ScenarioId)}
            isFullWidth
            items={SCENARIO_PRESETS.map((preset) => ({ value: preset.id, label: `${preset.label} pts` }))}
          />
        </div>

        {/* Live readout of where this member stands */}
        <div className="phase1a-dock-panel phase1a-dock-state" aria-live="polite">
          <Body as="p" size="small" color="subtle" UNSAFE_style={{ margin: 0 }}>
            Member right now
          </Body>
          <div className="phase1a-dock-points">
            <span className="phase1a-dock-points-number">{points.toLocaleString()}</span>
            <Body as="span" size="small" color="subtle">
              lifetime {pointsWord(points)}
            </Body>
          </div>
          <div className="phase1a-dock-tags">
            <Tag
              color={unlocked ? "green" : "gray"}
              leading={<Icon name={unlocked ? "LockOpen" : "Lock"} decorative size="small" />}
            >
              Home modules {unlocked ? "unlocked" : "locked"}
            </Tag>
          </div>
          <Body as="p" size="small" UNSAFE_style={{ margin: "6px 0 0" }}>
            {next
              ? `${(next.threshold - points).toLocaleString()} to go: ${milestoneBenefit[next.id].name} at ${next.threshold.toLocaleString()}`
              : scenario.mode === "B"
                ? "Option B: no further milestones shown"
                : "Past the last milestone"}
          </Body>
        </div>

        {/* Step 2 — run the completion */}
        <div className="phase1a-dock-panel phase1a-dock-act">
          <div className="phase1a-dock-step">
            <span className="phase1a-dock-badge" aria-hidden="true">
              2
            </span>
            <Heading as="h2" size="small" UNSAFE_style={{ margin: 0 }}>
              See what the member sees
            </Heading>
          </div>
          <Body as="p" size="small" color="subtle" UNSAFE_style={{ margin: "4px 0 10px" }}>
            Simulates a confirmed survey return worth {earned} {pointsWord(earned)}.
          </Body>
          <Button variant="primary" isFullWidth onClick={scenario.simulate}>
            Complete an activity (+{earned})
          </Button>
        </div>
      </div>
    </section>
  );
}
