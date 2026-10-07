"use client";

import { useEffect, useRef, useState } from "react";

const tagline = "A campus feels smaller when every turn is clear.";
const words = tagline.split(" ");

export default function TaglineReveal() {
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [visibleWords, setVisibleWords] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    const elements = wordRefs.current.filter(
      (element): element is HTMLSpanElement => element !== null,
    );

    if (!("IntersectionObserver" in window)) {
      const timeout = setTimeout(
        () => setVisibleWords(new Set(words.map((_, index) => index))),
        0,
      );
      return () => clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const newlyVisible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => Number((entry.target as HTMLSpanElement).dataset.wordIndex));

        if (newlyVisible.length > 0) {
          setVisibleWords((current) => new Set([...current, ...newlyVisible]));
          for (const entry of entries) {
            if (entry.isIntersecting) observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.6 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <p
      className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl text-wrap-balance"
    >
      <span className="sr-only">{tagline}</span>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            ref={(element) => {
              wordRefs.current[index] = element;
            }}
            data-word-index={index}
            aria-hidden="true"
            style={{ transitionDelay: `${Math.min(index * 45, 540)}ms` }}
            className={`mr-[0.25em] inline-block transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none ${
              visibleWords.has(index)
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-3 opacity-30 blur-[2px]"
            }`}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
