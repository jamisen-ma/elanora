"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import {
  diamondShapes,
  ringMetals,
  ringSizes,
  settingFamilies,
  settingImage,
  shapeImage,
} from "@/data/engagement";

// Build your engagement ring: 01 diamond → 02 setting → 03 make it yours → 04 review.
// No prices yet; the review step sends the chosen ring to ELANORA by email.

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"] });

const STEPS = ["Choose your diamond", "Choose your setting", "Make it yours", "Review your ring"];

export default function RingBuilder() {
  const [step, setStep] = useState(0);
  const [shape, setShape] = useState<string | null>(null);
  const [setting, setSetting] = useState<string | null>(null);
  const [metal, setMetal] = useState<string | null>(null);
  const [size, setSize] = useState(ringSizes[0]);

  const shapeName = diamondShapes.find((s) => s.id === shape)?.name;
  const settingName = settingFamilies.find((s) => s.id === setting)?.name;

  // A step can be opened once everything before it is chosen.
  const done = [!!shape, !!setting, !!metal, false];
  const canOpen = (i: number) => done.slice(0, i).every(Boolean);
  const go = (i: number) => {
    if (!canOpen(i)) return;
    setStep(i);
    document.getElementById("builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const summary = [
    ["Diamond shape", shapeName],
    ["Setting", settingName],
    ["Metal", metal],
    ["Ring size", size],
  ] as const;

  const mailto = `mailto:hello@elanora.com?subject=${encodeURIComponent(
    "My engagement ring",
  )}&body=${encodeURIComponent(
    `Hello ELANORA,\n\nI'd like to order this engagement ring:\n\n${summary
      .map(([k, v]) => `${k}: ${v ?? "-"}`)
      .join("\n")}\n\nThank you.`,
  )}`;

  return (
    <div className="bg-white text-[#1d1d1f]">
      {/* Intro */}
      <header className="px-6 pt-16 pb-12 text-center sm:pt-20 lg:pt-24">
        <h1 className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/70">Engagement &amp; Bridal</h1>
        <p
          className={`${serif.className} mt-6 text-balance text-[2.25rem] leading-[1.08] tracking-[-0.01em] sm:text-[2.75rem] lg:text-[3.25rem]`}
        >
          Build your engagement ring.
        </p>
        <p className="mt-5 text-[14px] leading-[1.7] text-[#6e6e73]">
          Choose your diamond, your setting and your metal.
        </p>
      </header>

      {/* Step navigation */}
      <nav id="builder" aria-label="Ring builder steps" className="scroll-mt-20 px-6">
        <ol className="mx-auto flex max-w-[1100px] flex-wrap items-start justify-center gap-y-5 border-b border-[#ececec] pb-6">
          {STEPS.map((label, i) => {
            const isActive = step === i;
            const open = canOpen(i);
            const choice = [shapeName, settingName, metal, undefined][i];
            return (
              <Fragment key={label}>
                {i > 0 && (
                  <li aria-hidden className="mx-3 mt-[7px] hidden h-px w-8 bg-[#d2d2d7] sm:block lg:mx-6 lg:w-14" />
                )}
                <li className="w-1/2 text-center sm:w-auto">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    disabled={!open}
                    aria-current={isActive ? "step" : undefined}
                    className={`group ${open ? "" : "cursor-not-allowed"}`}
                  >
                    <span className={`block text-[10px] tracking-[0.2em] ${isActive ? "text-[#1d1d1f]" : "text-[#86868b]"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`mt-2 inline-block whitespace-nowrap border-b pb-1 text-[10px] font-medium uppercase tracking-[0.12em] sm:text-[11px] sm:tracking-[0.22em] ${
                        isActive
                          ? "border-[#1d1d1f] text-[#1d1d1f]"
                          : open
                            ? "border-transparent text-[#1d1d1f]/70 group-hover:text-[#1d1d1f]"
                            : "border-transparent text-[#1d1d1f]/35"
                      }`}
                    >
                      {label}
                    </span>
                    <span className="mt-1 block h-4 text-[12px] text-[#86868b]">{choice ?? ""}</span>
                  </button>
                </li>
              </Fragment>
            );
          })}
        </ol>
      </nav>

      <div className="mx-auto max-w-[1200px] px-6 pb-28 pt-12 md:px-10 lg:pt-16">
        {/* 01 — Diamond */}
        {step === 0 && (
          <StepPanel title="Choose your diamond shape" subtitle="Lab-grown diamonds.">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
              {diamondShapes.map((s) => (
                <li key={s.id}>
                  <Choice
                    selected={shape === s.id}
                    onSelect={() => setShape(s.id)}
                    image={shapeImage(s.id)}
                    title={s.name}
                    square
                  />
                </li>
              ))}
            </ul>
            <NextButton disabled={!shape} onClick={() => go(1)} />
          </StepPanel>
        )}

        {/* 02 — Setting */}
        {step === 1 && (
          <StepPanel title="Choose your setting" subtitle={`Shown with a round diamond. Yours will have your ${shapeName?.toLowerCase()} diamond.`}>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-10">
              {settingFamilies.map((s) => (
                <li key={s.id}>
                  <Choice
                    selected={setting === s.id}
                    onSelect={() => setSetting(s.id)}
                    image={settingImage(s.id)}
                    title={s.name}
                    note={s.note}
                  />
                </li>
              ))}
            </ul>
            <NextButton disabled={!setting} onClick={() => go(2)} />
          </StepPanel>
        )}

        {/* 03 — Make it yours */}
        {step === 2 && (
          <StepPanel title="Make it yours" subtitle="Choose your metal and ring size.">
            <div className="mx-auto max-w-[560px]">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em]">Metal</p>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {ringMetals.map((m) => {
                  const on = metal === m;
                  return (
                    <li key={m}>
                      <button
                        type="button"
                        onClick={() => setMetal(m)}
                        aria-pressed={on}
                        className={`w-full border px-4 py-3.5 text-left text-[13px] transition-colors ${
                          on ? "border-[#1d1d1f] text-[#1d1d1f]" : "border-[#e5e5ea] text-[#1d1d1f]/80 hover:border-[#1d1d1f]/40"
                        }`}
                      >
                        {m}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <label htmlFor="ring-size" className="mt-10 block text-[11px] font-medium uppercase tracking-[0.22em]">
                Ring size
              </label>
              <select
                id="ring-size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="mt-4 w-full border-b border-[#1d1d1f]/25 bg-transparent py-2.5 text-[13px] focus:border-[#1d1d1f] focus:outline-none"
              >
                {ringSizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <p className="mt-2 text-[12px] text-[#86868b]">You can confirm your size later.</p>
            </div>
            <NextButton disabled={!metal} onClick={() => go(3)} label="Review your ring" />
          </StepPanel>
        )}

        {/* 04 — Review */}
        {step === 3 && (
          <StepPanel title="Review your ring">
            <div className="mx-auto grid max-w-[960px] grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-14">
              <div className="relative aspect-[4/5] bg-[#fafaf8]">
                {setting && (
                  <Image
                    src={settingImage(setting)}
                    alt={`${settingName} setting`}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover mix-blend-multiply"
                  />
                )}
              </div>
              <div>
                <p className={`${serif.className} text-[1.75rem] leading-tight`}>
                  {shapeName} diamond, {settingName}
                </p>
                <dl className="mt-8 border-t border-[#ececec] text-[13px]">
                  {summary.map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-[#ececec] py-3.5">
                      <dt className="text-[#86868b]">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-[13px] leading-[1.7] text-[#6e6e73]">
                  Send us your ring. We&rsquo;ll reply with the price and timing. It&rsquo;s made after you order.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    href={mailto}
                    className="inline-flex h-11 items-center bg-[#1d1d1f] px-7 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-black"
                  >
                    Request This Ring
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setShape(null);
                      setSetting(null);
                      setMetal(null);
                      setSize(ringSizes[0]);
                      go(0);
                    }}
                    className="text-[11px] uppercase tracking-[0.2em] text-[#86868b] underline underline-offset-4 hover:text-[#1d1d1f]"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          </StepPanel>
        )}
      </div>
    </div>
  );
}

function StepPanel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-10 text-center sm:mb-12">
        <h2 className={`${serif.className} text-[1.75rem] leading-tight sm:text-[2rem]`}>{title}</h2>
        {subtitle && <p className="mt-3 text-[13px] text-[#6e6e73]">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Choice({
  selected,
  onSelect,
  image,
  title,
  note,
  square = false,
}: {
  selected: boolean;
  onSelect: () => void;
  image: string;
  title: string;
  note?: string;
  square?: boolean;
}) {
  return (
    <button type="button" onClick={onSelect} aria-pressed={selected} className="group block w-full text-center">
      <div
        className={`relative overflow-hidden bg-[#fafaf8] outline outline-1 transition-[outline-color] ${
          square ? "aspect-square" : "aspect-[4/5]"
        } ${selected ? "outline-[#1d1d1f]" : "outline-transparent group-hover:outline-[#1d1d1f]/20"}`}
      >
        <Image
          src={image}
          alt=""
          fill
          unoptimized
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <span
        className={`mt-4 inline-block border-b pb-1 text-[11px] font-medium uppercase tracking-[0.22em] ${
          selected ? "border-[#1d1d1f]" : "border-transparent"
        }`}
      >
        {title}
      </span>
      {note && <span className="mt-1 block text-[12px] text-[#86868b]">{note}</span>}
    </button>
  );
}

function NextButton({ disabled, onClick, label = "Continue" }: { disabled: boolean; onClick: () => void; label?: string }) {
  return (
    <div className="mt-14 text-center">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="inline-flex h-11 items-center bg-[#1d1d1f] px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-[#d2d2d7]"
      >
        {label} &rarr;
      </button>
    </div>
  );
}
