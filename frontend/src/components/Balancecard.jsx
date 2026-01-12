export default function BalanceCard({ balance }) {
  return (
    <div className="balance-card credit-card">
      <div className="card-top">
        <span className="card-bank">TimePay.com</span>
        <span className="card-type">NPST</span>
      </div>

      <div className="card-balance">
        ₹ {balance.toLocaleString("en-IN")}
      </div>

      <div className="card-number">
        •••• &nbsp; •••• &nbsp; •••• &nbsp; 1234
      </div>

      <div className="card-bottom">
        <div>
          <span className="card-label">Card Holder</span>
          <span className="card-value">Aditya Singh</span>
        </div>

        <div>
          <span className="card-label">Expires</span>
          <span className="card-value">26/07</span>
        </div>
      </div>
    </div>
  );
}
