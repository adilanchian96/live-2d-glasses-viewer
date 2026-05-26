const sections = [
  {
    title: "Before you start",
    items: [
      "You need Meta Ray-Ban Display glasses (the model with a built-in display).",
      "Install or update the Meta AI app on your phone (iPhone or Android).",
      "Update your glasses and Meta AI app to the latest version when prompted.",
    ],
  },
  {
    title: "Turn on Developer Mode (one time)",
    items: [
      "Open the Meta AI app on your phone.",
      "Go to Settings → App Info.",
      "Tap the app version number five times in a row.",
      "When asked, tap Enable to turn on Developer Mode.",
    ],
  },
  {
    title: "Add TomoView to your glasses",
    items: [
      "Easiest: scan the QR code on this page with your phone camera. Meta AI should open and walk you through adding TomoView.",
      "On iPhone, tap the banner after scanning; on Android, choose to open with Meta AI if asked.",
      "If the QR code does nothing, make sure the Meta AI app is installed and updated.",
      "Manual option: Meta AI → Devices → your Display glasses → Web apps → Add. Name: TomoView. Paste the https link from this page.",
      "Save, then open TomoView from your glasses menu.",
    ],
  },
  {
    title: "The link must start with https://",
    items: [
      "Meta glasses only load secure https:// links—not http://.",
      "If you host TomoView yourself, use a service that provides HTTPS (for example Vercel or Netlify).",
      "After you redeploy an update, reload the web app from the glasses menu.",
    ],
  },
  {
    title: "Avatar not showing or not moving?",
    items: [
      "Confirm the exact link ends with /view (for example https://yoursite.com/view).",
      "Make sure your phone and glasses are connected in the Meta AI app.",
      "Try removing the web app and adding the link again.",
      "If the character’s eyes don’t follow your head, your phone may need to allow motion access for the page—open the link once in your phone browser and allow motion if asked.",
    ],
  },
  {
    title: "Pick a different character",
    items: [
      "Add ?model=natori to the end of your link for the Natori character.",
      "Default is Mao—use the link without extra text for Mao.",
    ],
  },
  {
    title: "Still stuck?",
    items: [
      "Official help: Meta Wearables docs for Web apps (search “Meta Ray-Ban Display web apps”).",
      "Double-check Developer Mode is still on after an app update.",
    ],
  },
];

export default function TroubleHelp() {
  return (
    <details className="trouble-panel group">
      <summary className="trouble-summary">
        <span>Having trouble?</span>
        <span className="trouble-chevron" aria-hidden>
          ▾
        </span>
      </summary>
      <div className="trouble-body">
        {sections.map((section) => (
          <section key={section.title} className="trouble-section">
            <h3 className="trouble-section-title">{section.title}</h3>
            <ul className="trouble-list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </details>
  );
}
