import * as React from "react";
import { Page } from "@walmart/ld-kit";
import { PhoneFrame } from "../components/PhoneFrame";
import { CommunityHomeScreen } from "../components/CommunityHomeScreen";
import { Phase1ABottomSheet } from "../components/Phase1ABottomSheet";
import { ControlPanel } from "../components/ControlPanel";
import { useScenario, type SheetVisibility } from "../lib/useScenario";
import { DEFAULT_DEVICE_PRESET_ID, getDevicePreset } from "../lib/devicePresets";

const MEMBER_NAME = "Onder";

/**
 * Root of the Phase 1A prototype. Exactly one `<Page>` lives here, wrapping
 * ONLY the member-facing phone frame — the control panel is a sibling
 * outside it, per Section 9 ("clearly separated from the member-facing
 * UI") and the a11y rule that exactly one `<Page>` may exist per app.
 */
export function Phase1APrototypePage() {
  const scenario = useScenario();
  const [deviceId, setDeviceId] = React.useState(DEFAULT_DEVICE_PRESET_ID);
  const device = getDevicePreset(deviceId);

  // The LAST non-"none" sheet variant, kept stable through the close
  // transition so BottomSheet's exit animation doesn't render blank content
  // (BottomSheet keeps itself mounted while isOpen flips to false — see
  // Phase1ABottomSheet's isOpen prop).
  const [displayedVariant, setDisplayedVariant] = React.useState<Exclude<SheetVisibility, "none">>("arm2");
  React.useEffect(() => {
    if (scenario.sheet !== "none") setDisplayedVariant(scenario.sheet);
  }, [scenario.sheet]);

  // Focus returns to whatever triggered the simulated completion when the
  // sheet closes (rules/a11y.md#overlays-and-focus) — BottomSheet itself
  // only manages focus *inside* the dialog, not where it goes afterward.
  const lastTriggerRef = React.useRef<HTMLElement | null>(null);
  const simulate = React.useCallback(() => {
    lastTriggerRef.current = document.activeElement as HTMLElement | null;
    scenario.simulate();
  }, [scenario]);

  const handleDismiss = React.useCallback(
    (reason: "cta" | "close") => {
      scenario.dismissSheet(reason);
      window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
    },
    [scenario],
  );

  return (
    <div className="phase1a-shell">
      <div className="phase1a-stage">
        <PhoneFrame device={device}>
          <Page title="Member's Mark Community" titleVisuallyHidden>
            <CommunityHomeScreen memberName={MEMBER_NAME} />
          </Page>
        </PhoneFrame>
      </div>

      <Phase1ABottomSheet
        variant={displayedVariant}
        result={scenario.lastResult}
        isOpen={scenario.sheet !== "none"}
        onDismiss={handleDismiss}
      />

      <aside className="phase1a-controls" aria-label="Phase 1A prototype controls">
        <ControlPanel
          scenario={{ ...scenario, simulate }}
          deviceId={deviceId}
          onDeviceChange={setDeviceId}
        />
      </aside>
    </div>
  );
}
