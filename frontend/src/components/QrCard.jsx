import qrImage from "../assets/QRCode.png";

export default function QrCard() {
  return (
    <div className="card qr-card">
      <img
        src={qrImage}
        alt="Demo QR Code"
        className="qr-image"
      />

    
    </div>
  );
}
