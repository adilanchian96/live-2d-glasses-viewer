"use client";

import { useState } from "react";

interface CopyViewerLinkProps {
  url: string;
}

export default function CopyViewerLink({ url }: CopyViewerLinkProps) {
  const [copied, setCopied] = useState(false);

  async function copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="link-copy-block">
      <p className="link-copy-label">Link for Meta AI → Web apps</p>
      <div className="link-copy-row">
        <code className="link-copy-url">{url}</code>
        <button type="button" className="btn-secondary" onClick={copy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
