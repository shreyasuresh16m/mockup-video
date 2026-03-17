import { useState } from "react";
import { Eye, EyeOff, ArrowRight, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    // Simulate auth — any credentials work (mockup)
    setTimeout(() => {
      onLogin();
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col font-sans">

      {/* ── Top bar ── */}
      <header className="px-8 py-6 flex items-center justify-between">
        <img
          src="/logo.png"
          alt="KONE"
          className="h-7 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement!.innerHTML =
              '<span class="font-bold tracking-widest text-white text-lg">KONE</span>';
          }}
        />
        <a
          href="https://www.kone.com/en/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[0.75em] text-white/35 hover:text-white/60 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          Help
        </a>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          {/* App name + tagline */}
          <div className="mb-10 text-center">
            <h1 className="text-[2.6em] font-semibold tracking-tight text-white mb-2">
              Sales<span className="text-[#1450f5]">NXT</span>
            </h1>
            <p className="text-white/45 text-[0.95em]">
              AI-powered visualisation for KONE sales teams
            </p>
          </div>

          {/* Card */}
          <div className="bg-[#1C1C1C] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-[1.15em] font-medium text-white mb-1">Sign in</h2>
            <p className="text-white/40 text-[0.85em] mb-8">
              Use your KONE account credentials to continue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[0.8em] font-medium text-white/60 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@kone.com"
                  autoComplete="email"
                  className={cn(
                    "w-full bg-[#141414] border rounded-xl px-4 py-3 text-white text-[0.95em] placeholder:text-white/25",
                    "outline-none transition-all focus:border-[#00A3E0]/70 focus:ring-2 focus:ring-[#00A3E0]/15",
                    error ? "border-red-500/50" : "border-white/10"
                  )}
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[0.8em] font-medium text-white/60 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-[0.78em] text-[#00A3E0] hover:text-[#00A3E0]/80 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={cn(
                      "w-full bg-[#141414] border rounded-xl px-4 py-3 pr-12 text-white text-[0.95em] placeholder:text-white/25",
                      "outline-none transition-all focus:border-[#00A3E0]/70 focus:ring-2 focus:ring-[#00A3E0]/15",
                      error ? "border-red-500/50" : "border-white/10"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-[0.82em] px-1">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-[0.95em] transition-all mt-2",
                  loading
                    ? "bg-[#00A3E0]/50 text-white/60 cursor-not-allowed"
                    : "bg-[#00A3E0] text-white hover:bg-[#008CC0] hover:shadow-lg active:scale-[0.98]"
                )}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* SSO hint */}
          <p className="text-center text-white/25 text-[0.78em] mt-6">
            Single sign-on available for enterprise accounts
          </p>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="px-8 py-6 flex justify-between items-center text-[0.72em] text-white/25">
        <p>© 2026 KONE Corporation. All rights reserved.</p>
        <p>SalesNXT v1.0</p>
      </footer>
    </div>
  );
}
