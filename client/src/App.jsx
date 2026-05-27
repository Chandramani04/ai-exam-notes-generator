import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { getCurrentUser } from "./services/api.js";
import { useDispatch, useSelector } from "react-redux";
import Notes from "./components/Notes.jsx";
import History from "./pages/History.jsx";
import PaymentSucess from "./pages/PaymentSucess.jsx";
import PaymentFailed from "./pages/PaymentFailed.jsx";
import Pricing from "./pages/Pricing.jsx";
import { baseUrl } from "./utils/constants.js";

// export const serverBaseUrl = "http://localhost:8000";
export const serverBaseUrl = baseUrl;

const App = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  // this is important because it it fetches the current user data from the server and updates the Redux store on app load
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  // Log whenever user data updates
  // useEffect(() => {
  //   console.log("User state updated:", userData);
  // }, [userData]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={userData ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/notes"
          element={userData ? <Notes /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/history"
          element={userData ? <History /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/pricing"
          element={userData ? <Pricing /> : <Navigate to="/auth" replace />}
        />

        <Route
          path="/payment-success"
          element={
            <PaymentSucess />
            // userData ? <PaymentSucess /> : <Navigate to="/auth" replace />
          }
        />
        <Route
          path="/payment-failed"
          element={
            <PaymentFailed />
            // userData ? <PaymentFailed /> : <Navigate to="/auth" replace />
          }
        />
      </Routes>
    </>
  );
};

export default App;
