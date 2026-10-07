type StateMessageProps = {
  state: "idle" | "loading" | "empty" | "error";
  message?: string;
};

const stateDetails = {
  idle: {
    title: "Ready when you are",
    message: "Search for a campus destination to see the best walking route.",
    icon: "⌖",
  },
  loading: {
    title: "Finding your way",
    message: "Checking campus paths for the quickest route…",
    icon: "↗",
  },
  empty: {
    title: "No destination found",
    message: "Try another campus facility or use one of the suggested places.",
    icon: "?",
  },
  error: {
    title: "We couldn't find a route",
    message: "Check your starting point and destination, then try again.",
    icon: "!",
  },
};

export default function StateMessage({ state, message }: StateMessageProps) {
  const details = stateDetails[state];
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 ${
        state === "error" || state === "empty"
          ? "border-amber-500/30 bg-[#211b18] text-amber-100"
          : "border-[#393442] bg-[#19171f]/95 text-slate-100"
      }`}
      role={state === "error" || state === "empty" ? "alert" : "status"}
      aria-live="polite"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#393442] bg-[#24212c] text-lg font-semibold text-indigo-300 shadow-sm">
        {state === "loading" ? (
          <span className="size-4 animate-spin rounded-full border-2 border-indigo-300/30 border-t-indigo-300" />
        ) : (
          details.icon
        )}
      </span>
      <div>
        <p className="font-semibold">{details.title}</p>
        <p className="mt-0.5 text-sm text-slate-400">{message ?? details.message}</p>
      </div>
    </div>
  );
}
