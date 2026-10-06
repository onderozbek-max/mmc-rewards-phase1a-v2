import * as React from "react";
import { Body, Button, Divider, FormGroup, Heading, Radio, SegmentedControl, TextField } from "@walmart/ld-kit";
import type { Arm } from "../lib/phase1aEngine";
import { FIRST_MILESTONE_POINTS } from "../lib/phase1aEngine";
import { commonUnlockControlLabel } from "../lib/phase1aContent";
import { DEVICE_PRESETS } from "../lib/devicePresets";
import type { UseScenarioReturn } from "../lib/useScenario";
import { usePhase1AEventLog } from "../lib/usePhase1AEventLog";

/**
 * Prototype-only review controls (Section 9) — intentionally rendered
 * OUTSIDE the phone frame / `<Page>` so it reads as tooling, not member UI.
 * Never shows arm numbers or debug data inside the phone.
 */
export function ControlPanel({
  scenario,
  deviceId,
  onDeviceChange,
}: {
  scenario: UseScenarioReturn;
  deviceId: string;
  onDeviceChange: (id: string) => void;
}) {
  const events = usePhase1AEventLog();
  const { lastResult } = scenario;
  const willCrossThreshold = scenario.previousLifetimePoints + scenario.pointsEarnedInput >= FIRST_MILESTONE_POINTS;

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <Heading as="h2" size="small" UNSAFE_style={{ marginBottom: 4 }}>
          Phase 1A prototype controls
        </Heading>
        <Body as="p" color="subtle" size="small" UNSAFE_style={{ margin: 0 }}>
          Review tooling only — never shown inside the member experience.
        </Body>
      </div>

      <FormGroup label="Assigned arm">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Radio
            name="phase1a-arm"
            value={1}
            checked={scenario.assignedArm === 1}
            onChange={() => scenario.setAssignedArm(1)}
            label="Arm 1 — Current experience"
          />
          <Radio
            name="phase1a-arm"
            value={2}
            checked={scenario.assignedArm === 2}
            onChange={() => scenario.setAssignedArm(2)}
            label="Arm 2 — Unnamed benefit"
          />
          <Radio
            name="phase1a-arm"
            value={3}
            checked={scenario.assignedArm === 3}
            onChange={() => scenario.setAssignedArm(3)}
            label="Arm 3 — Named benefit"
          />
        </div>
      </FormGroup>

      <div style={{ display: "flex", gap: 12 }}>
        <TextField
          label="Previous lifetime points"
          type="number"
          value={String(scenario.previousLifetimePoints)}
          onChange={(event) => scenario.setPreviousLifetimePoints(Number(event.target.value))}
        />
        <TextField
          label="Points earned"
          type="number"
          value={String(scenario.pointsEarnedInput)}
          onChange={(event) => scenario.setPointsEarnedInput(Number(event.target.value))}
        />
      </div>

      <div
        style={{
          padding: 12,
          borderRadius: "var(--ld-semantic-border-radius-card, 8px)",
          background: "var(--ld-semantic-color-surface-subtle, #f8f8f8)",
        }}
      >
        <Body as="p" size="small" color="subtle" UNSAFE_style={{ margin: 0 }}>
          Derived updated total
        </Body>
        <Heading as="div" size="small" UNSAFE_style={{ margin: "2px 0 0" }}>
          {scenario.previousLifetimePoints + scenario.pointsEarnedInput} points
        </Heading>
        {willCrossThreshold && (
          <Body as="p" size="small" color="info" UNSAFE_style={{ margin: "4px 0 0" }}>
            {commonUnlockControlLabel}
          </Body>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Button variant="primary" isFullWidth onClick={scenario.simulate}>
          Simulate confirmed RedJade return
        </Button>
        <Button
          variant="secondary"
          isFullWidth
          disabled={scenario.completionCount === 0}
          onClick={scenario.simulate}
        >
          Simulate another completion
        </Button>
        <Button variant="tertiary" isFullWidth onClick={scenario.resetScenario}>
          Reset scenario
        </Button>
      </div>

      <div>
        <Body as="p" size="small" color="subtle" UNSAFE_style={{ marginBottom: 8 }}>
          Preview viewport
        </Body>
        <SegmentedControl
          aria-label="Preview viewport size"
          value={deviceId}
          onChange={onDeviceChange}
          isFullWidth
          items={DEVICE_PRESETS.map((preset) => ({ value: preset.id, label: preset.label }))}
        />
      </div>

      <div style={{ margin: "0 0" }}>
        <Divider />
      </div>

      <div>
        <Body as="p" size="small" color="subtle" UNSAFE_style={{ marginBottom: 4 }}>
          Last simulation
        </Body>
        {lastResult ? (
          <Body as="div" size="small" UNSAFE_style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
            {JSON.stringify(
              {
                assignedArm: lastResult.assignedArm,
                outcome: lastResult.outcome,
                previousLifetimePoints: lastResult.previousLifetimePoints,
                pointsEarned: lastResult.pointsEarned,
                updatedLifetimePoints: lastResult.updatedLifetimePoints,
                pointsRemaining: lastResult.pointsRemaining,
                crossedThreshold: lastResult.crossedThreshold,
              },
              null,
              2,
            )}
          </Body>
        ) : (
          <Body as="p" size="small" color="subtle" UNSAFE_style={{ margin: 0 }}>
            No completion simulated yet.
          </Body>
        )}
      </div>

      <div>
        <Body as="p" size="small" color="subtle" UNSAFE_style={{ marginBottom: 4 }}>
          Event log
        </Body>
        <div
          style={{
            maxHeight: 220,
            overflowY: "auto",
            border: "1px solid var(--ld-semantic-color-border-subtlest, #74767c)",
            borderRadius: "var(--ld-semantic-border-radius-card, 8px)",
            padding: 8,
            fontFamily: "monospace",
            fontSize: "0.6875rem",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {events.length === 0 && <span style={{ color: "var(--ld-semantic-color-text-subtle, #515357)" }}>No events yet.</span>}
          {events
            .slice()
            .reverse()
            .map((entry) => (
              <span key={entry.id}>{entry.name}</span>
            ))}
        </div>
      </div>
    </div>
  );
}
