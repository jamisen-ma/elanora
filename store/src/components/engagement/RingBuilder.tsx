"use client";

import { useState } from "react";
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
import { CARATS } from "@/data/catalog";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"] });

const STEPS = ["Choose a setting", "Choose a diamond", "Complete your ring"];

export default function RingBuilder() {
  const [step, setStep] = useState(0);
  const [setting, setSetting] = useState<string | null>(null);
  const [shape, setShape] = useState<string | null>(null);
  const [carat, setCarat] = useState<string | null>(null);
  const [metal, setMetal] = useState<string | null>(null);
  const [size, setSize] = useState("Not sure yet");

  const settingChoice = settingFamilies.find((item) => item.id === setting);
  const shapeChoice = diamondShapes.find((item) => item.id === shape);

  const canOpen = (target: number) => {
    if (target === 0) return true;
    if (target === 1) return !!setting;
    return !!setting && !!shape && !!carat;
  };

  const go = (target: number) => {
    if (!canOpen(target)) return;
    setStep(target);
    requestAnimationFrame(() => {
      document.getElementById("ring-studio")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const ringDetails = [
    ["Setting", settingChoice?.name ?? "—"],
    ["Center diamond", shapeChoice && carat ? `${carat} ${shapeChoice.name} lab-grown diamond` : "—"],
    ["Metal", metal ?? "—"],
    ["Ring size", size],
  ];

  const requestLink = `mailto:hello@elanora.com?subject=${encodeURIComponent(
    `Ring Studio request — ${settingChoice?.name ?? "Custom ring"}`,
  )}&body=${encodeURIComponent(
    `Hello ELANORA,\n\nI’d like to discuss this engagement ring: \n\n${ringDetails
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n")}\n\nPlease share available diamond options, final pricing, and production timing.\n\nThank you.`,
  )}`;

  const reset = () => {
    setSetting(null);
    setShape(null);
    setCarat(null);
    setMetal(null);
    setSize("Not sure yet");
    setStep(0);
  };

  return (
    <div className="bg-white text-[#1d1d1f]">
      <header className="px-6 pb-10 pt-14 text-center sm:pb-14 sm:pt-20 lg:pt-24">
        <p className="text-[13px] font-medium uppercase tracking-[0.32em] text-[#1d1d1f]/65">Engagement &amp; Bridal</p>
        <h1 className={`${serif.className} mt-5 text-balance text-[2.75rem] font-normal leading-[1.04] sm:text-[3.5rem] lg:text-[4rem]`}>
          Ring Studio
        </h1>
        <p className="mt-4 text-[16px] leading-[1.7] text-[#6e6e73]">
          Choose a setting, find your diamond, and make it yours.
        </p>
      </header>

      <nav id="ring-studio" aria-label="Ring Studio steps" className="scroll-mt-20 px-4 sm:px-6">
        <ol className="mx-auto grid max-w-[1200px] grid-cols-3 border-y border-[#e8e7e4]">
          {STEPS.map((label, index) => {
            const active = step === index;
            const available = canOpen(index);
            const choice = [settingChoice?.name, shapeChoice?.name, metal][index];
            return (
              <li key={label} className="min-w-0">
                <button
                  type="button"
                  onClick={() => go(index)}
                  disabled={!available}
                  aria-current={active ? "step" : undefined}
                  className={`relative flex min-h-[74px] w-full items-center justify-center gap-2 px-2 py-3 text-left transition-colors sm:min-h-[88px] sm:gap-4 sm:px-5 ${
                    active ? "text-[#1d1d1f]" : available ? "text-[#6e6e73] hover:text-[#1d1d1f]" : "cursor-not-allowed text-[#a6a5a2]"
                  }`}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center text-[15px] ${active ? "bg-[#1d1d1f] text-white" : "bg-[#f3f2f0]"}`}>
                    {String(index + 1)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium uppercase tracking-[0.12em] sm:text-[13px] sm:tracking-[0.18em]">{label}</span>
                    <span className="mt-1 hidden truncate text-[13px] text-[#86868b] sm:block">{choice ?? ""}</span>
                  </span>
                  {index < STEPS.length - 1 && <span aria-hidden className="absolute right-0 top-1/2 h-8 w-px -translate-y-1/2 bg-[#e8e7e4]" />}
                  <span className={`absolute inset-x-0 bottom-0 h-[2px] ${active ? "bg-[#1d1d1f]" : "bg-transparent"}`} />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <main className="mx-auto max-w-[1320px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pb-32">
        {step === 0 && (
          <StepPanel
            number="01"
            title="Choose your setting"
            subtitle="Start with the silhouette you love. Each setting is made to order."
          >
            <ul className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
              {settingFamilies.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSetting(item.id)}
                    aria-pressed={setting === item.id}
                    className="group block w-full text-left"
                  >
                    <div className={`relative aspect-[4/3] overflow-hidden bg-[#faf9f7] outline outline-1 transition-colors ${setting === item.id ? "outline-[#1d1d1f]" : "outline-transparent group-hover:outline-[#1d1d1f]/25"}`}>
                      <Image src={settingImage(item.id)} alt={`${item.name} engagement ring setting`} fill unoptimized sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px" className="object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.03]" />
                      {setting === item.id && <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#1d1d1f] text-[14px] text-white" aria-label="Selected">✓</span>}
                    </div>
                    <span className="mt-4 block text-[14px] font-medium tracking-[0.04em] sm:text-[16px]">{item.name}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-[#86868b]">{item.note}</span>
                  </button>
                </li>
              ))}
            </ul>
            <NextButton disabled={!setting} onClick={() => go(1)} />
          </StepPanel>
        )}

        {step === 1 && (
          <StepPanel
            number="02"
            title="Choose your diamond"
            subtitle="Tell us the center-stone shape and size you’re looking for. We’ll confirm available stones with you."
          >
            <div className="mx-auto max-w-[1000px]">
              <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#86868b]">Diamond type</span>
                <span className="border border-[#1d1d1f] px-4 py-2 text-[13px] uppercase tracking-[0.15em]">Lab-grown</span>
              </div>
              <p className="text-center text-[13px] font-medium uppercase tracking-[0.2em]">Shape</p>
              <ul className="mx-auto mt-5 grid max-w-[900px] grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-5">
                {diamondShapes.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setShape(item.id)}
                      aria-pressed={shape === item.id}
                      className={`group flex w-full flex-col items-center border px-2 py-3 transition-colors sm:py-4 ${shape === item.id ? "border-[#1d1d1f] bg-[#faf9f7]" : "border-[#e8e7e4] hover:border-[#1d1d1f]/40"}`}
                    >
                      <span className="relative block h-[54px] w-[54px] sm:h-[64px] sm:w-[64px]">
                        <Image src={shapeImage(item.id)} alt="" fill unoptimized sizes="64px" className="object-contain mix-blend-multiply" />
                      </span>
                      <span className="mt-2 text-[12px] font-medium uppercase tracking-[0.12em] sm:text-[13px]">{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mx-auto mt-10 max-w-[440px]">
                <label htmlFor="diamond-carat" className="block text-center text-[13px] font-medium uppercase tracking-[0.2em]">Carat preference</label>
                <select
                  id="diamond-carat"
                  value={carat ?? ""}
                  onChange={(event) => setCarat(event.target.value || null)}
                  className="mt-4 w-full border border-[#d8d7d4] bg-white px-4 py-3 text-[15px] focus:border-[#1d1d1f] focus:outline-none"
                >
                  <option value="">Select a carat size</option>
                  {CARATS.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                <p className="mt-3 text-center text-[14px] leading-relaxed text-[#86868b]">
                  These are starting preferences, not live inventory. We’ll confirm the available center stones and final price before you decide.
                </p>
              </div>
            </div>
            <StepActions onBack={() => go(0)} disabled={!shape || !carat} onContinue={() => go(2)} />
          </StepPanel>
        )}

        {step === 2 && (
          <StepPanel
            number="03"
            title="Complete your ring"
            subtitle="Choose a metal and ring size, then review your design."
          >
            <div className="mx-auto grid max-w-[1060px] gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#faf9f7] sm:aspect-[5/4]">
                  {setting && <Image src={settingImage(setting)} alt={`${settingChoice?.name} ring setting`} fill unoptimized sizes="(max-width: 1024px) 100vw, 560px" className="object-cover mix-blend-multiply" />}
                </div>
                <p className={`${serif.className} mt-5 text-[1.6rem]`}>{settingChoice?.name}</p>
                <p className="mt-1 text-[15px] text-[#86868b]">{carat} {shapeChoice?.name} lab-grown diamond</p>
              </div>

              <div className="lg:pt-2">
                <fieldset>
                  <legend className="text-[13px] font-medium uppercase tracking-[0.2em]">Metal</legend>
                  <ul className="mt-4 grid grid-cols-2 gap-3">
                    {ringMetals.map((option) => (
                      <li key={option}>
                        <button type="button" onClick={() => setMetal(option)} aria-pressed={metal === option} className={`w-full border px-4 py-3 text-left text-[14px] transition-colors ${metal === option ? "border-[#1d1d1f] bg-[#faf9f7]" : "border-[#e8e7e4] hover:border-[#1d1d1f]/40"}`}>
                          <span className={`mr-2 inline-block h-3 w-3 rounded-full border border-black/10 align-[-2px] ${option.includes("Yellow") ? "bg-[#d9b458]" : option.includes("Rose") ? "bg-[#c98f83]" : option.includes("White") ? "bg-[#d9d9d5]" : "bg-[#e8e8e6]"}`} />
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </fieldset>

                <div className="mt-8">
                  <label htmlFor="ring-size" className="block text-[13px] font-medium uppercase tracking-[0.2em]">Ring size</label>
                  <select id="ring-size" value={size} onChange={(event) => setSize(event.target.value)} className="mt-3 w-full border border-[#d8d7d4] bg-white px-4 py-3 text-[15px] focus:border-[#1d1d1f] focus:outline-none">
                    {ringSizes.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <a href="/size-guide" className="mt-2 inline-block text-[14px] text-[#6e6e73] underline underline-offset-4 hover:text-[#1d1d1f]">Need help finding your size?</a>
                </div>

                <section aria-labelledby="ring-summary-heading" className="mt-9 border-t border-[#e8e7e4] pt-6">
                  <h3 id="ring-summary-heading" className={`${serif.className} text-[1.6rem]`}>Your ring summary</h3>
                  <dl className="mt-4 divide-y divide-[#e8e7e4] border-y border-[#e8e7e4] text-[15px]">
                    {ringDetails.map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4 py-3">
                        <dt className="text-[#86868b]">{label}</dt>
                        <dd className="text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 flex items-center justify-between text-[15px]">
                    <span className="text-[#86868b]">Price</span>
                    <span className="font-medium">Confirmed with your diamond</span>
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-[#86868b]">
                    Once you approve the stone and quote, your ring is made to order. Current production estimate: 8–10 weeks.
                  </p>
                  <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <a href={requestLink} className="inline-flex min-h-12 flex-1 items-center justify-center bg-[#1d1d1f] px-6 text-center text-[13px] font-medium uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-85">
                      Request this ring
                    </a>
                    <button type="button" onClick={reset} className="text-[13px] uppercase tracking-[0.16em] text-[#86868b] underline underline-offset-4 hover:text-[#1d1d1f]">Start over</button>
                  </div>
                </section>
              </div>
            </div>
          </StepPanel>
        )}
      </main>
    </div>
  );
}

function StepPanel({ number, title, subtitle, children }: { number: string; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby="ring-step-heading">
      <header className="mb-9 text-center sm:mb-12">
        <p className="text-[12px] tracking-[0.22em] text-[#86868b]">STEP {number}</p>
        <h2 id="ring-step-heading" className={`${serif.className} mt-3 text-[2rem] leading-tight sm:text-[2.5rem]`}>{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-[1.7] text-[#6e6e73]">{subtitle}</p>
      </header>
      {children}
    </section>
  );
}

function NextButton({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <div className="mt-12 text-center">
      <button type="button" onClick={onClick} disabled={disabled} className="inline-flex min-h-12 items-center bg-[#1d1d1f] px-9 text-[13px] font-medium uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:bg-[#d2d2d7]">
        Continue to diamond <span aria-hidden className="ml-3">→</span>
      </button>
    </div>
  );
}

function StepActions({ onBack, onContinue, disabled }: { onBack: () => void; onContinue: () => void; disabled: boolean }) {
  return (
    <div className="mt-12 flex flex-col-reverse items-center justify-center gap-5 sm:flex-row">
      <button type="button" onClick={onBack} className="text-[13px] uppercase tracking-[0.18em] text-[#6e6e73] underline underline-offset-4 hover:text-[#1d1d1f]">Back to setting</button>
      <button type="button" onClick={onContinue} disabled={disabled} className="inline-flex min-h-12 items-center bg-[#1d1d1f] px-9 text-[13px] font-medium uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:bg-[#d2d2d7]">
        Complete your ring <span aria-hidden className="ml-3">→</span>
      </button>
    </div>
  );
}
