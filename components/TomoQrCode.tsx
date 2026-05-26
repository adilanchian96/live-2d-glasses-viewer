import QRCode from "qrcode";
import { getViewerUrl } from "@/lib/site-url";

export default async function TomoQrCode() {
  const viewerUrl = getViewerUrl();
  const qrDataUrl = await QRCode.toDataURL(viewerUrl, {
    width: 220,
    margin: 2,
    color: { dark: "#2d2640", light: "#fff9fc" },
  });

  return (
    <figure className="qr-block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={qrDataUrl}
        alt={`QR code linking to TomoView at ${viewerUrl}`}
        width={220}
        height={220}
        className="qr-image"
      />
      <figcaption className="qr-caption">
        Scan with your phone camera to open the setup link
      </figcaption>
    </figure>
  );
}
