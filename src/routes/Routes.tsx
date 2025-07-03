// src/routes/routes.tsx

import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "@/components/app/BaseLayout/BaseLayout";
import Login from "@/components/app/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import StackblitzPOC from "./StackblitzPOC";
import StackblitzGithubPOC from "./StackblitzGithubPOC";

export function AppRoutes() {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <BaseLayout />
          </ProtectedRoute>
        }
      />
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      {/* Stackblitz POC Route (public for demo) */}
      <Route path="/stackblitz-poc" element={<StackblitzPOC />} />
      {/* Stackblitz GitHub POC Route (public for demo) */}
      <Route path="/stackblitz-github-poc" element={<StackblitzGithubPOC />} />
    </Routes>
  );
}

export default AppRoutes;
