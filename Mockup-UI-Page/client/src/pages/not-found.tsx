import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="glass-panel p-12 text-center rounded-3xl max-w-md w-[90%] flex flex-col items-center">
        <AlertCircle className="h-20 w-20 text-[#00A3E0] mb-6" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-white/60 mb-8 text-[1.1em]">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="bg-[#00A3E0] text-white hover:bg-[#008CC0] px-8 py-3 rounded-full font-medium transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
