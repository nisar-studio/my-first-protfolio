import { ArrowLeft } from "lucide-react";
import { profile } from "../data/profile";

export function NotFound() {
  return (
    <main className="shell flex min-h-[80vh] flex-col justify-center py-32">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-violet">404 — Not found</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-medium tracking-[-0.04em] text-ink sm:text-5xl">
        This page doesn&apos;t exist. The{" "}
        <span className="font-serif italic font-normal text-muted">good stuff</span> is one click back.
      </h1>
      <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-muted">
        Every project, note and contact detail lives on the main page of {profile.name}&apos;s portfolio.
      </p>
      <div className="mt-8">
        <a href="/" className="btn btn-primary">
          <ArrowLeft aria-hidden="true" size={16} />
          Back to the portfolio
        </a>
      </div>
    </main>
  );
}
