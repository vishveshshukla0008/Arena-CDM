import { Link, Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function LoginPage() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading !</h1>;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#0c0c1d] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Neon Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#cf96ff] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#ff6b98] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse duration-[3s]"></div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px] [radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md animate-[fadeSlideUp_0.5s_ease-out]">
        <div className="backdrop-blur-xl bg-[#111124]/80 p-8 sm:p-10 rounded-2xl border border-[#474659]/50 shadow-[0_0_40px_rgba(207,150,255,0.1)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(207,150,255,0.15)] hover:border-[#cf96ff]/30">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-widest mb-2 bg-linear-to-r from-[#cf96ff] to-[#ff6b98] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(207,150,255,0.5)]">
              Code Death Match
            </h1>
            <p className="text-[#a1a0b5] text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
              Initiate Connect Sequence
            </p>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full bg-[#0c0c1d] hover:bg-[#1e1e20] rounded px-3 py-3.5 flex items-center justify-center gap-3 transition-colors duration-200 shadow-md hover:shadow-lg">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            <span className="text-[#e3e3e3] font-medium text-sm tracking-wider capitalize cursor-pointer">
              <a href="/api/auth/google">Continue with Google</a>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
