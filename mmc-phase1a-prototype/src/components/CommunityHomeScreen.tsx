import * as React from "react";
import { Body, Button, Card, CardContent, Heading, Icon, IconButton } from "@walmart/ld-kit";
import { Illustration } from "@walmart/ld-kit/utils/Illustration";
import { BottomNavBar } from "./BottomNavBar";

/**
 * Faithful, responsive approximation of the current Community Home screen
 * (Section 1, Screenshot 2). This is the Phase 1A BASE screen — unchanged by
 * the experiment. No lifetime-point total, no milestone, no progress bar,
 * no Community Pass card lives here; Phase 1A only adds an event-triggered
 * bottom sheet layered on top (Section 1 / Section 8).
 *
 * The real app would fetch member name / activity data from a service; this
 * prototype uses fixed mock content matching the screenshot, since wiring
 * Home's activity counts to the simulated survey completion is out of scope
 * (see the "reversible assumptions" note in the prototype README/summary).
 */
export function CommunityHomeScreen({ memberName }: { memberName: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: "1 1 auto", minHeight: 0 }}>
      <HeaderBar />
      <div style={{ flex: "1 1 auto", minHeight: 0, overflowY: "auto" }}>
        <Hero memberName={memberName} />
        <div style={{ padding: "0 16px 32px" }}>
          <OpenActivitiesSection />
          <WhatsNewSection />
        </div>
      </div>
      <BottomNavBar activeId="account" />
    </div>
  );
}

function HeaderBar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 4px",
        borderBottom: "1px solid var(--ld-semantic-color-border-subtlest, #74767c)",
        flex: "none",
      }}
    >
      <IconButton a11yLabel="Back" variant="ghost" size="medium">
        <Icon name="ChevronLeft" decorative />
      </IconButton>
      <Body as="span" weight="alt" UNSAFE_style={{ flex: 1, textAlign: "center", display: "block" }}>
        Member&rsquo;s Mark Community
      </Body>
      <div style={{ width: 40 }} />
    </div>
  );
}

function Hero({ memberName }: { memberName: string }) {
  return (
    <div
      style={{
        position: "relative",
        padding: "28px 20px 56px",
        background:
          "linear-gradient(135deg, var(--ld-semantic-color-fill-accent-green, #2a8703) 0%, var(--ld-semantic-color-fill-accent-green-subtle, #eaf3e6) 150%)",
        color: "var(--ld-semantic-color-text-inverse, #fff)",
      }}
    >
      <Body as="span" color="inverse" UNSAFE_style={{ display: "block", fontSize: "0.9375rem" }}>
        Welcome,
      </Body>
      <Heading as="h2" color="inverse" UNSAFE_style={{ fontSize: "1.75rem", margin: "2px 0 0" }}>
        {memberName}
      </Heading>

      <button
        type="button"
        onClick={(event) => event.preventDefault()}
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: -22,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--ld-semantic-color-surface, #fff)",
          borderRadius: "var(--ld-semantic-border-radius-round, 999px)",
          border: "none",
          boxShadow: "var(--ld-semantic-elevation-100)",
          padding: "14px 20px",
          font: "inherit",
          cursor: "pointer",
        }}
      >
        <span style={{ fontWeight: 700, color: "var(--ld-semantic-color-text, #2e2f32)" }}>
          5 activities completed
        </span>
        <Icon name="ChevronRight" decorative />
      </button>
    </div>
  );
}

const OPEN_ACTIVITIES = [
  {
    id: "shape-products",
    title: "See how members help shape products",
    description: "Follow feedback from idea to club.",
    points: 10,
    endsLabel: "Ends Aug 1",
    illustration: "Registry&Gifts" as const,
  },
  {
    id: "welcome",
    title: "Welcome to the community!",
    description: "See how to take part.",
    points: 10,
    endsLabel: "Ends Aug 1",
    illustration: null,
  },
];

function OpenActivitiesSection() {
  return (
    <section style={{ marginTop: 40, marginBottom: 32 }} aria-labelledby="open-activities-heading">
      <Heading as="h3" id="open-activities-heading" UNSAFE_style={{ marginBottom: 16 }}>
        Open activities <span style={{ color: "var(--ld-semantic-color-text-subtle, #515357)" }}>({OPEN_ACTIVITIES.length})</span>
      </Heading>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {OPEN_ACTIVITIES.map((activity) => (
          <Card key={activity.id}>
            <div style={{ display: "flex" }}>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
                  <Heading as="h4" UNSAFE_style={{ fontSize: "1rem" }}>
                    {activity.title}
                  </Heading>
                  <Body as="span" color="subtle">
                    {activity.description}
                  </Body>
                  <Body as="span" color="subtle" size="small">
                    {activity.points} points &middot; {activity.endsLabel}
                  </Body>
                  <div style={{ marginTop: "auto", paddingTop: 8 }}>
                    <Button variant="primary" size="small" onClick={() => undefined}>
                      Start
                    </Button>
                  </div>
                </div>
              </CardContent>
              <div
                style={{
                  flex: "0 0 112px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: activity.illustration
                    ? "var(--ld-semantic-color-surface-subtle, #f8f8f8)"
                    : "var(--ld-semantic-color-fill-inverse, #2e2f32)",
                }}
              >
                {activity.illustration ? (
                  <Illustration type="mono-large" name={activity.illustration} title={activity.title} size={56} />
                ) : (
                  <Icon
                    name="Gift"
                    a11yLabel="Member's Mark"
                    style={{ color: "var(--ld-semantic-color-text-inverse, #fff)", fontSize: 32 }}
                  />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

const WHATS_NEW = [
  { id: "gift", title: "A gift, just for you", illustrationType: "mono-small" as const, illustration: "GiftCard" as const },
  { id: "wood", title: "Crafted with care", illustrationType: "mono-large" as const, illustration: "PartySupplies" as const },
];

function WhatsNewSection() {
  return (
    <section aria-labelledby="whats-new-heading">
      <Heading as="h3" id="whats-new-heading" UNSAFE_style={{ marginBottom: 16 }}>
        What&rsquo;s new
      </Heading>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
        {WHATS_NEW.map((item) => (
          <div
            key={item.id}
            style={{
              flex: "0 0 62%",
              borderRadius: "var(--ld-semantic-border-radius-card, 8px)",
              overflow: "hidden",
              background: "var(--ld-semantic-color-surface-subtle, #f8f8f8)",
              aspectRatio: "4 / 3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Illustration type={item.illustrationType} name={item.illustration} title={item.title} size={72} />
          </div>
        ))}
      </div>
    </section>
  );
}
