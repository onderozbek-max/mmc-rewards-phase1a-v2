import * as React from "react";
import { Body, Button, Divider, FormGroup, Heading, Radio, SegmentedControl, TextField } from "@walmart/ld-kit";
import type { Arm } from "../lib/phase1aEngine";
import { crossesFirstMilestone } from "../lib/phase1aEngine";
import { commonUnlockControlLabel, modeLabels } from "../lib/phase1aContent";
import { DEVICE_PRESETS } from "../lib/devicePresets";
import type { UseScenarioReturn } from "../lib/useScenario";
import { usePhase1AEventLog } from "../lib/usePhase1AEventLog";

/** Presenter shortcuts: below 250, just below the unlock, just past it, and above 1,000. */
const QUICK_MEMBER_PRESETS = [{ points: 150 }, { points: 240 }, { points: 320 }, { points: 1200 }] as const;

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
  const willCrossThreshold = crossesFirstMilestone(scenario.previousLifetimePoints, scenario.pointsEarnedInput);

  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <section className="phase1a-mode" aria-labelledby="phase1a-mode-heading">
        <Heading as="h2" size="small" id="phase1a-mode-heading" UNSAFE_style={{ margin: "0 0 8px" }}>
          Prototype option
        </Heading>
        <FormGroup label="Show the member experience for">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Radio
              name="phase1a-mode"
              value="A"
              checked={scenario.mode === "A"}
              onChange={() => scenario.setMode("A")}
              label={modeLabels.A.label}
            />
            <Radio
              name="phase1a-mode"
              value="B"
              checked={scenario.mode === "B"}
              onChange={() => scenario.setMode("B")}
              label={modeLabels.B.label}
            />
          </div>
        </FormGroup>
        <Body as="p" size="small" color="subtle" UNSAFE_style={{ margin: "8px 0 0" }}>
          {modeLabels[scenario.mode].description} Switching keeps the member&rsquo;s points.
        </Body>
      </section>

      <section className="phase1a-howto" aria-labelledby="phase1a-howto-heading">
        <Heading as="h2" size="small" id="phase1a-howto-heading" UNSAFE_style={{ margin: 0 }}>
          How to use this prototype
        </Heading>
        <ol>
          <li>
            <strong>Pick an option</strong> above. Option A keeps showing progress after 250 points; Option B stops
            at 250 and only says new milestones are coming soon.
          </li>
          <li>
            <strong>Pick an arm</strong> below. It sets which experiment group the member is in: Arm 1 sees no
            feedback, Arm 2 sees a vague &ldquo;next benefit&rdquo; message, Arm 3 sees the benefit named.
          </li>
          <li>
            <strong>Choose a member scenario</strong> in the bar at the bottom of the page. It sets how many
            lifetime points the member already has.
          </li>
          <li>
            <strong>Scroll Home</strong> inside the phone to see the content modules. They are locked below 250
            points and unlocked from 250.
          </li>
          <li>
            <strong>Press &ldquo;Complete an activity&rdquo;</strong> to see what the member sees afterwards: points
            earned, new total, and points left to the next milestone.
          </li>
          <li>
            Crossing 250 points shows the same unlock message in every arm. Press <strong>Reset scenario</strong>{" "}
            to start over.
          </li>
        </ol>
      </section>

      <div>
        <Heading as="h2" size="small" UNSAFE_style={{ marginBottom: 4 }}>
          Prototype controls
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

      <FormGroup label="Quick member presets">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {QUICK_MEMBER_PRESETS.map((preset) => (
            <Button key={preset.points} variant="secondary" size="small" onClick={() => scenario.seedPoints(preset.points)}>
              {preset.points.toLocaleString()} pts
            </Button>
          ))}
        </div>
        <Body as="p" size="small" color="subtle" UNSAFE_style={{ margin: "6px 0 0" }}>
          Sets the member&rsquo;s lifetime points: well below, just below, just past, and well past 250.
        </Body>
      </FormGroup>

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
