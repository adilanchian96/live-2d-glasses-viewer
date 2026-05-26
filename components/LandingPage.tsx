import Link from "next/link";
import CopyViewerLink from "@/components/CopyViewerLink";
import TomoQrCode from "@/components/TomoQrCode";
import TroubleHelp from "@/components/TroubleHelp";
import { getViewerUrl } from "@/lib/site-url";

const steps = [
  {
    n: "1",
    title: "Scan the code",
    body: "Use your phone camera on the QR code. Meta AI should open by itself.",
  },
  {
    n: "2",
    title: "Confirm in Meta AI",
    body: "Follow the prompts to add TomoView to your Display glasses.",
  },
  {
    n: "3",
    title: "Say hello",
    body: "Open TomoView from your glasses—a little friend appears in your view.",
  },
];

export default function LandingPage() {
  const viewerUrl = getViewerUrl();

  return (
    <div className="landing">
      <header className="landing-header">
        <p className="landing-kicker">For Meta Ray-Ban Display</p>
        <h1 className="landing-title">TomoView</h1>
        <p className="landing-tagline">
          A cute companion on your glasses—keeps you company with gentle
          animations.
        </p>
      </header>

      <section className="landing-card landing-steps" aria-labelledby="how-heading">
        <h2 id="how-heading" className="section-title">
          How to set up
        </h2>
        <ol className="steps-list">
          {steps.map((step) => (
            <li key={step.n} className="step-item">
              <span className="step-num">{step.n}</span>
              <div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-body">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="landing-card landing-connect"
        aria-labelledby="connect-heading"
      >
        <h2 id="connect-heading" className="section-title">
          Connect your glasses
        </h2>
        <div className="connect-grid">
          <TomoQrCode />
          <div className="connect-details">
            <p className="connect-lead">
              The QR code is the easiest way—it opens Meta AI and adds TomoView
              for you.
            </p>
            <details className="manual-add">
              <summary>Prefer to add the link yourself?</summary>
              <div className="manual-add-body">
                <CopyViewerLink url={viewerUrl} />
                <p className="connect-hint">
                  In Meta AI: Devices → your glasses → Web apps → Add. Name it{" "}
                  <strong>TomoView</strong> and paste this link.
                </p>
              </div>
            </details>
            <Link href="/view" className="btn-primary">
              Preview the character
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-card landing-about">
        <h2 className="section-title">What you&apos;ll see</h2>
        <ul className="about-list">
          <li>A friendly animated character in the corner of your view</li>
          <li>Soft, looping animations—no typing or buttons needed</li>
        </ul>
      </section>

      <TroubleHelp />

      <footer className="landing-footer">
        <p>TomoView · tomō (友) — friend</p>
      </footer>
    </div>
  );
}
