import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="sidebar">
      {/* Desktop Header */}
      <div className="sidebar-header">
        <span className="material-symbols-outlined sidebar-logo">
          account_balance_wallet
        </span>
        <h1>E-Wallet</h1>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" className={linkClass}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="link-text">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/add" className={linkClass}>
            <span className="material-symbols-outlined">add_circle</span>
            <span className="link-text">Add</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/transfer" className={linkClass}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span className="link-text">Transfer</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/transactions" className={linkClass}>
            <span className="material-symbols-outlined">receipt_long</span>
            <span className="link-text">History</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
