import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import ArenaPage from "../Features/Arena/pages/ArenaPage";
import LoginPage from "../Features/Authentication/pages/LoginPage";
import Protected from "../Features/Authentication/components/Protected";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to arena */}
        <Route path="/" element={<Navigate to="/arena" replace />} />
        <Route
          path="/arena"
          element={
            <Protected>
              <ArenaPage />
            </Protected>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
