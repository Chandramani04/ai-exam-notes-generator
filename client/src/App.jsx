import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { getCurrentUser } from "./services/api.js";
import { useDispatch, useSelector } from "react-redux";
import Notes from "./components/Notes.jsx";

export const serverBaseUrl = "http://localhost:8000";

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
      </Routes>
    </>
  );
};

export default App;
