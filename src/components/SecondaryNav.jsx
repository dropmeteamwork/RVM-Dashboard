import React, { useState } from "react";
import { NavLink } from "react-router";
import SvgIcon from "./SvgIcon";

export default function SecondaryNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getNavLinkClasses = (isActive) => {
    return isActive 
      ? "bg-[var(--color-primary-color)] text-white shadow-md text-gray-100 font-medium px-4 py-3 rounded-md transition-all duration-200 ease-in-out flex items-center gap-3 w-full truncate"
      : "text-gray-700 font-medium px-4 py-3 rounded-md transition-all duration-200 ease-in-out hover:bg-[var(--color-primary-color)] hover:text-white flex items-center gap-3 w-full truncate";
  };

  const iconPaths = {
    overview:
      "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
    environment:
      "M11.25 11.25l.041-.02a.75.75 0 011.063 0l.041.02m-.663 9.5c-.862 0-1.614-.067-2.35-.183a2.25 2.25 0 01-1.599-1.599c-.116-.736-.183-1.488-.183-2.35v-6.75c0-1.036.84-1.875 1.875-1.875h2.25c1.036 0 1.875.84 1.875 1.875v6.75c0 .862-.067 1.614-.183 2.35a2.25 2.25 0 01-1.599 1.599c-.736.116-1.488.183-2.35.183Zm.375-14.625a.75.75 0 10-1.5 0v.375c0 .03.004.06.012.089a6.762 6.762 0 01.44-1.352 4.29 4.29 0 01.44-1.114c.09-.24.167-.477.234-.711.16-.566.21-1.157.159-1.745l-.011-.108a.75.75 0 01.99-.872l.123.089c.451.32.905.676 1.36.992.217.156.435.313.654.47a2.25 2.25 0 01.46 2.25c-.083.3-.17.6-.26.9-.21.67-.417 1.34-.625 2.011a.75.75 0 01-1.275.33l-.011-.01c-.352-.351-.71-.7-.759-.748a.75.75 0 01-.22-.515v-.375Z",
    users:
      "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
    machines:
      "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z",
    analytics:
      "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z",
    compliance:
      "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    maintenance:
      "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z",
    dataRights:
      "M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z",
    reports:
      "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
    transactions:
      "m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z",
  };

  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-80px)] w-56 bg-white shadow-lg overflow-y-auto z-40">
      <nav className="flex flex-col gap-1 p-4">
        {/* Dashboard Section */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase px-4 mb-2">Dashboard</h3>
          
          <NavLink to="/app/overview" end className={({ isActive }) => getNavLinkClasses(isActive)}>
            <SvgIcon pathD={iconPaths.overview} className="size-5 flex-shrink-0" />
            <span className="truncate">Overview</span>
          </NavLink>

          <NavLink to="/app/environment" end className={({ isActive }) => getNavLinkClasses(isActive)}>
            <SvgIcon pathD={iconPaths.environment} className="size-5 flex-shrink-0" />
            <span className="truncate">Environment</span>
          </NavLink>

          <NavLink to="/app/users" end className={({ isActive }) => getNavLinkClasses(isActive)}>
            <SvgIcon pathD={iconPaths.users} className="size-5 flex-shrink-0" />
            <span className="truncate">Users</span>
          </NavLink>

          <NavLink to="/app/machines" end className={({ isActive }) => getNavLinkClasses(isActive)}>
            <SvgIcon pathD={iconPaths.machines} className="size-5 flex-shrink-0" />
            <span className="truncate">Machines</span>
          </NavLink>

          <NavLink to="/app/analytics" end className={({ isActive }) => getNavLinkClasses(isActive)}>
            <SvgIcon pathD={iconPaths.analytics} className="size-5 flex-shrink-0" />
            <span className="truncate">Analytics</span>
          </NavLink>

          <NavLink to="/app/transaction" end className={({ isActive }) => getNavLinkClasses(isActive)}>
            <SvgIcon pathD={iconPaths.transactions} className="size-5 flex-shrink-0" />
            <span className="truncate">Transactions</span>
          </NavLink>
        </div>

        {/* Management Section */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase px-4 mb-2">Management</h3>
          
          <NavLink to="/app/compliance" end className={({ isActive }) => getNavLinkClasses(isActive)}>
            <SvgIcon pathD={iconPaths.compliance} className="size-5 flex-shrink-0" />
            <span className="truncate">Compliance</span>
          </NavLink>

          <NavLink to="/app/predictive-maintenance" end className={({ isActive }) => getNavLinkClasses(isActive)}>
            <SvgIcon pathD={iconPaths.maintenance} className="size-5 flex-shrink-0" />
            <span className="truncate">Pred. Maintenance</span>
          </NavLink>

          <NavLink to="/app/data-rights" end className={({ isActive }) => getNavLinkClasses(isActive)}>
            <SvgIcon pathD={iconPaths.dataRights} className="size-5 flex-shrink-0" />
            <span className="truncate">Data Rights</span>
          </NavLink>

          <NavLink to="/app/reports" end className={({ isActive }) => getNavLinkClasses(isActive)}>
            <SvgIcon pathD={iconPaths.reports} className="size-5 flex-shrink-0" />
            <span className="truncate">Reports</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
