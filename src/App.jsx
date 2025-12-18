import "./App.css";
import NavBar from "./components/NavBar";
import { Outlet, Route, Routes } from "react-router";
import SecondaryNav from "./components/SecondaryNav";
import OverViewPage from "./pages/OverViewPage";
import EnvironmentPage from "./pages/EnvironmentPage";
import UserPage from "./pages/UserPage";
import MachinePage from "./pages/MachinePage";
import AiPerformancePage from "./pages/AiPerformancePage";
import TransactionPage from "./pages/TransactionPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ReportPage from "./pages/ReportPage";
import LoginPage from "./pages/LoginPage";
import CompliancePage from "./pages/CompliancePage";
import PredictiveMaintenancePage from "./pages/PredictiveMaintenancePage";
import DataRightsPage from "./pages/DataRightsPage";
import ReportsPage from "./pages/ReportsPage";

// export default function App() {
//   return (
//     <>
//       <NavBar />
//       <div className="p-6 min-h-screen bg-gray-50">
//         <SecondaryNav />
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/overview" element={<OverViewPage />} />
//           <Route path="/environment" element={<EnvironmentPage />} />
//           <Route path="/users" element={<UserPage />} />
//           <Route path="/machines" element={<MachinePage />} />
//           {/* <Route path="/ai-performance" element={<AiPerformancePage />} /> */}
//           <Route path="/transaction" element={<TransactionPage />} />
//           {/* <Route path="/analytics" element={<AnalyticsPage/>} /> */}
//           {/* <Route path="/reports" element={<ReportPage/>} /> */}
//         </Routes>
//       </div>
//     </>
//   );
// }


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/app"
        element={
          <>
            <NavBar />
            <SecondaryNav />
            <div className="ml-56 p-6 pt-24 min-h-screen bg-gray-50">
              <Outlet/>
            </div>
          </>
        }
      >
        <Route path="overview" element={<OverViewPage />} />
        <Route path="environment" element={<EnvironmentPage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="machines" element={<MachinePage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="transaction" element={<TransactionPage />} />
        <Route path="compliance" element={<CompliancePage />} />
        <Route path="predictive-maintenance" element={<PredictiveMaintenancePage />} />
        <Route path="data-rights" element={<DataRightsPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
}