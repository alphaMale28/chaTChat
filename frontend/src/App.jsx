import { Navigate, Route, Routes } from "react-router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-[#11031f] relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#8686AC] opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 -right-32 h-[30rem] w-[30rem] rounded-full bg-[#505081] opacity-30 blur-[140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#272757_1px,transparent_1px),linear-gradient(to_bottom,#272757_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />

      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
