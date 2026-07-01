import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemsPage";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
import SessionPage from "./pages/SessionPage";
import { setAuthTokenGetter } from "./lib/axios";

function App() {
  const { isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [authTokenReady, setAuthTokenReady] = useState(false);

  useEffect(() => {
    setAuthTokenGetter(isSignedIn ? getToken : null);
    setAuthTokenReady(true);

    return () => setAuthTokenGetter(null);
  }, [getToken, isSignedIn]);

  // this will get rid of flickering effect
  if (!isLoaded || !authTokenReady) return null;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />}
        />
        <Route
          path="/dashboard"
          element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problem/:id"
          element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />}
        />
         <Route
          path="/session/:id"
          element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />}
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
