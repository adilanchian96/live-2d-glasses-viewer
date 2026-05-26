import QRCode from "qrcode";
import { getMetaAiDeepLink } from "@/lib/site-url";

export default async function TomoQrCode() {
  const deepLink = getMetaAiDeepLink();
  const qrDataUrl = await QRCode.toDataURL(deepLink, {
    width: 220,
    margin: 2,
    color: { dark: "#2d2640", light: "#fff9fc" },
  });

  return (
    <figure className="qr-block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={qrDataUrl}
        alt="QR code to add TomoView in the Meta AI app"
        width={220}
        height={220}
        className="qr-image"
      />
      <figcaption className="qr-caption">
        Scan with your phone camera to open Meta AI and add TomoView
      </figcaption>
      <a href={deepLink} className="btn-meta-add">
        Add in Meta AI
      </a>
    </figure>
  );
}
