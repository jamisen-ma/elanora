"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { productSerif } from "@/lib/fonts";
import ProductFrame, { PAGE_BG } from "@/components/shop/ProductFrame";
import ShapeIcon from "@/components/shop/ShapeIcon";
import {
  COLOUR_TYPES,
  QUALITY_CLARITIES,
  QUALITY_COLOURS,
  QUALITY_CUTS,
  SETTINGS,
  SHAPES,
  STEPS,
  caratLabel,
  configFromParams,
  diamondTitle,
  getSetting,
  hasDiamond,
  isYellowStone,
  metalImage,
  onHandImage,
  paramsFromConfig,
  settingPhoto,
  settingProductHref,
  type RingConfig,
  type Step,
} from "@/data/ringDesign";
import RingSummary from "./RingSummary";
import CaratRange from "./CaratRange";
import { ActionBar, MetalSwatches, PrimaryButton, StepHeading, metalLabel, type Update } from "./parts";

// Design Your Ring: step bar → (1) setting → (2) diamond preference → (3) your ring +
// quote request. The whole design lives in the URL (shareable, survives refresh) and is
// also kept in localStorage so a returning visitor picks up where they left off.

const STORAGE_KEY = "elanora-ring-design";

export default function RingDesigner() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const config = useMemo(() => configFromParams(new URLSearchParams(params.toString())), [params]);
  const [restored, setRestored] = useState(false);

  // Latest choices, ahead of the URL: several quick clicks before the router catches up
  // must build on each other, not on the same stale params.
  const latest = useRef(config);
  useEffect(() => {
    latest.current = config;
  }, [config]);

  // Arriving from a product page keeps that page's scroll position; start at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const update: Update = (patch, opts) => {
    latest.current = { ...latest.current, ...patch };
    const url = `${pathname}?${paramsFromConfig(latest.current).toString()}`;
    if (opts?.navigate) router.push(url);
    else router.replace(url, { scroll: false });
  };
  const goStep = (step: Step) => update({ step }, { navigate: true });

  // Returning visitor with an empty link: bring back the last design.
  useEffect(() => {
    if (params.get("setting") || params.get("shape")) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && /setting=|shape=/.test(saved)) {
        router.replace(`${pathname}?${saved}`, { scroll: false });
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore notice
        setRestored(true);
      }
    } catch {
      /* storage unavailable */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, paramsFromConfig(config).toString());
    } catch {
      /* storage unavailable */
    }
  }, [config]);

  const startOver = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    setRestored(false);
    router.replace(`${pathname}?step=setting`, { scroll: false });
  };

  return (
    <div className={`${PAGE_BG} pb-28 text-[#1d1d1f] lg:pb-24`}>
      <header className="px-6 pb-8 pt-10 text-center sm:pt-14 lg:pb-10">
        <h1 className={`${productSerif.className} text-[2.1rem] leading-tight sm:text-[2.6rem]`}>Design Your Ring</h1>
        <p className="mt-3 text-[15px] text-[#1d1d1f]/70 sm:text-[16px]">
          Rings are shown with a center stone of about 1.5ct. Yours is made to the size you choose.
        </p>
      </header>

      <StepBar config={config} goStep={goStep} update={update} />

      {restored && (
        <div className="mx-auto mt-4 flex max-w-[1320px] items-center justify-center gap-4 px-6 text-[14px] text-[#1d1d1f]/70">
          <span>We kept your choices.</span>
          <button type="button" onClick={startOver} className="underline underline-offset-4 hover:text-[#1d1d1f]">
            Start over
          </button>
        </div>
      )}

      <div className="mx-auto mt-8 max-w-[1320px] px-5 sm:px-8 lg:mt-12">
        {config.step === "setting" && <SettingStep config={config} update={update} />}
        {config.step === "diamond" && <DiamondStep config={config} update={update} />}
        {config.step === "ring" && <RingSummary config={config} update={update} goStep={goStep} />}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- step bar */

function StepBar({ config, goStep, update }: { config: RingConfig; goStep: (s: Step) => void; update: Update }) {
  const setting = getSetting(config.setting);
  const photo = setting ? settingPhoto(setting, config.shape) : undefined;
  const thumb = photo ? metalImage(photo.item, config.metal) : undefined;
  const diamondDone = hasDiamond(config);

  const cells: { id: Step; done: boolean; content: ReactNode; extra?: ReactNode }[] = [
    {
      id: "setting",
      done: !!setting,
      content: setting ? (
        <Done thumb={<Thumb src={thumb} alt={setting.name} />} title={`${setting.name} Setting`} sub={metalLabel(config.metal)} />
      ) : (
        <Todo n={1} label={STEPS[0].label} title={STEPS[0].title} />
      ),
    },
    {
      id: "diamond",
      done: diamondDone,
      content: diamondDone ? (
        <Done
          thumb={
            <span className="flex h-full w-full items-center justify-center bg-white">
              <ShapeIcon shape={config.shape!} size={30} />
            </span>
          }
          title={diamondTitle(config)}
          sub={[config.colourType, caratLabel(config)].filter(Boolean).join(" · ")}
        />
      ) : (
        <Todo n={2} label={STEPS[1].label} title={STEPS[1].title} />
      ),
      extra: diamondDone ? (
        <button
          type="button"
          onClick={() => update({ diamondAdded: false, step: "diamond" }, { navigate: true })}
          className="text-[13px] text-[#1d1d1f]/60 underline underline-offset-4 hover:text-[#1d1d1f]"
        >
          Remove
        </button>
      ) : null,
    },
    {
      id: "ring",
      done: false,
      content:
        setting && diamondDone ? (
          <Done thumb={<Thumb src={thumb} alt="Your ring" />} title="Your Ring" sub="Review and request a quote" check={false} />
        ) : (
          <Todo n={3} label={STEPS[2].label} title={STEPS[2].title} />
        ),
    },
  ];

  return (
    <nav aria-label="Design steps" className="mx-auto max-w-[1320px] px-3 sm:px-8">
      <ol className="grid grid-cols-3 border-y border-[#1d1d1f]/12 bg-white/60">
        {cells.map((c, i) => {
          const current = config.step === c.id;
          return (
            <li
              key={c.id}
              className={`relative min-w-0 ${i > 0 ? "border-l border-[#1d1d1f]/10" : ""} ${
                current ? "after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:bg-[#1d1d1f]" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => goStep(c.id)}
                aria-current={current ? "step" : undefined}
                className="flex w-full min-w-0 items-center gap-2 px-2 py-3 text-left transition-colors hover:bg-white sm:gap-4 sm:px-5 sm:py-4"
              >
                {c.content}
              </button>
              {c.extra && <div className="absolute bottom-2 right-3 hidden sm:block">{c.extra}</div>}
              {c.done && <p className="sr-only">Completed</p>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Thumb({ src, alt }: { src?: string; alt: string }) {
  return src ? <ProductFrame src={src} alt={alt} className="h-full w-full" sizes="64px" /> : <span className="block h-full w-full bg-white" />;
}

function Done({ thumb, title, sub, check = true }: { thumb: ReactNode; title: string; sub: string; check?: boolean }) {
  return (
    <>
      <span className="relative block h-11 w-11 shrink-0 overflow-hidden sm:h-14 sm:w-14">
        {thumb}
        {check && (
          <span
            aria-hidden
            className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center bg-[#1d1d1f] text-[11px] text-white"
          >
            ✓
          </span>
        )}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] leading-snug sm:text-[15px]">{title}</span>
        <span className="mt-0.5 hidden truncate text-[14px] text-[#1d1d1f]/60 sm:block">{sub}</span>
        <span className="mt-0.5 hidden text-[13px] uppercase tracking-[0.14em] text-[#8a7358] sm:block">Price on request</span>
      </span>
    </>
  );
}

function Todo({ n, label, title }: { n: number; label: string; title: string }) {
  return (
    <>
      <span
        className={`${productSerif.className} flex h-11 w-8 shrink-0 items-center justify-center text-[1.4rem] text-[#1d1d1f]/45 sm:h-14 sm:w-10 sm:text-[1.8rem]`}
      >
        {n}
      </span>
      <span className="min-w-0">
        <span className="hidden text-[14px] text-[#1d1d1f]/60 sm:block">{label}</span>
        <span className={`${productSerif.className} block text-[16px] sm:text-[1.25rem]`}>{title}</span>
      </span>
    </>
  );
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value?: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex border border-[#1d1d1f]/20">
      {options.map((o, i) => {
        const on = o === value;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o)}
            className={`h-10 flex-1 text-[15px] transition-colors ${i > 0 ? "border-l border-[#1d1d1f]/15" : ""} ${
              on ? "bg-[#1d1d1f] text-white" : "bg-white hover:bg-[#f4f2ee]"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function FieldLabel({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  return (
    <p className="mb-3 flex items-baseline justify-between gap-4 text-[13px] font-medium uppercase tracking-[0.18em]">
      <span>{children}</span>
      {hint && <span className="text-[14px] font-normal normal-case tracking-normal text-[#1d1d1f]/60">{hint}</span>}
    </p>
  );
}

/* ---------------------------------------------------------------- step 1: setting */

function SettingStep({ config, update }: { config: RingConfig; update: Update }) {
  const next: Step = hasDiamond(config) ? "ring" : "diamond";
  return (
    <section aria-labelledby="setting-step">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div id="setting-step">
          <StepHeading title="Choose your setting" sub="Pick the ring design. You'll choose your diamond next." />
        </div>
        <MetalSwatches value={config.metal} onChange={(metal) => update({ metal })} />
      </div>

      {!config.setting && (
        <p className="mt-4 text-[15px] text-[#1d1d1f]/70">
          Know your diamond already?{" "}
          <Link
            href={`?${paramsFromConfig({ ...config, step: "diamond" }).toString()}`}
            className="underline underline-offset-4 hover:text-[#1d1d1f]"
          >
            Choose your diamond first →
          </Link>
        </p>
      )}

      <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-14">
        {SETTINGS.map((s, i) => {
          const photo = settingPhoto(s, config.shape);
          if (!photo) return null;
          const selected = config.setting === s.id;
          const shapes = Object.keys(s.photos);
          const stoneNote =
            config.colourType === "White" && isYellowStone(photo.item)
              ? "Shown with a yellow diamond."
              : config.colourType === "Yellow" && !isYellowStone(photo.item)
                ? "Shown with a white diamond."
                : "";
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => update({ setting: s.id })}
                aria-pressed={selected}
                className={`group block w-full border text-left transition-colors ${
                  selected ? "border-[#1d1d1f]" : "border-transparent hover:border-[#1d1d1f]/20"
                }`}
              >
                <span className="relative block">
                  <ProductFrame
                    src={metalImage(photo.item, config.metal)}
                    hoverSrc={onHandImage(photo.item, config.metal)}
                    alt={`${s.name} setting`}
                    priority={i < 3}
                    sizes="(max-width: 1024px) 50vw, 30vw"
                  />
                  {selected && (
                    <span className="absolute right-3 top-3 bg-[#1d1d1f] px-2 py-1 text-[12px] uppercase tracking-[0.16em] text-white">
                      ✓ Selected
                    </span>
                  )}
                </span>
                <span className="block px-1 pb-4 pt-4 text-center sm:px-3">
                  <span className="block text-[13px] font-medium uppercase tracking-[0.18em] sm:text-[14px]">{s.name}</span>
                  <span className="mt-1.5 block text-[14px] leading-snug text-[#1d1d1f]/65 sm:text-[15px]">{s.note}</span>
                  <span className="mt-1.5 block text-[14px] text-[#8a7358]">Price on request</span>
                  {!photo.exact && config.shape && (
                    <span className="mt-2 block text-[13px] text-[#1d1d1f]/60">
                      Shown in {photo.shownShape}. Made in {config.shape} for you.
                    </span>
                  )}
                  {stoneNote && <span className="mt-1 block text-[13px] text-[#1d1d1f]/60">{stoneNote}</span>}
                  <span className="mt-3 flex items-center justify-center gap-1.5" aria-label={`Photographed in ${shapes.join(", ")}`}>
                    {shapes.map((sh) => (
                      <ShapeIcon key={sh} shape={sh} size={16} />
                    ))}
                    <span className="ml-1 text-[13px] text-[#1d1d1f]/55">· all 10 shapes</span>
                  </span>
                </span>
              </button>
              <div className="mt-1 text-center">
                <Link
                  href={settingProductHref(s, config.shape)}
                  className="text-[13px] uppercase tracking-[0.16em] text-[#1d1d1f]/60 underline underline-offset-4 hover:text-[#1d1d1f]"
                >
                  View details
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mx-auto mt-12 max-w-md">
        <ActionBar note={!config.setting ? "Choose a setting to continue." : undefined}>
          <PrimaryButton disabled={!config.setting} onClick={() => update({ step: next }, { navigate: true })}>
            {next === "ring" ? "Continue to Your Ring →" : "Continue to Diamond →"}
          </PrimaryButton>
        </ActionBar>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- step 2: diamond */

function DiamondStep({ config, update }: { config: RingConfig; update: Update }) {
  const setting = getSetting(config.setting);
  const photo = setting ? settingPhoto(setting, config.shape) : undefined;
  const [moreOpen, setMoreOpen] = useState(config.qualityMode === "custom");

  const confirm = () => update({ diamondAdded: true, step: setting ? "ring" : "setting" }, { navigate: true });

  return (
    <section aria-labelledby="diamond-step" className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
      <div>
        <div id="diamond-step">
          <StepHeading
            title="Lab-grown diamond"
            sub="Tell us the diamond you'd like. We'll find the right stone and confirm every detail with you."
          />
        </div>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <FieldLabel hint={config.shape}>Shape</FieldLabel>
            <ul className="grid grid-cols-5 gap-1.5">
              {SHAPES.map((sh) => {
                const on = config.shape === sh;
                return (
                  <li key={sh}>
                    <button
                      type="button"
                      onClick={() => update({ shape: sh })}
                      aria-pressed={on}
                      aria-label={`${sh} diamond`}
                      className={`flex aspect-[6/5] w-full flex-col items-center justify-center gap-1 border text-[13px] transition-colors ${
                        on ? "border-[#1d1d1f] bg-white" : "border-transparent bg-[#f0ede8] hover:border-[#1d1d1f]/30"
                      }`}
                    >
                      <ShapeIcon shape={sh} size={24} />
                      {sh}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10">
              <FieldLabel>Colour</FieldLabel>
              <Segmented label="Diamond colour" options={COLOUR_TYPES} value={config.colourType} onChange={(colourType) => update({ colourType })} />
              {config.colourType === "Yellow" && (
                <p className="mt-2 text-[14px] text-[#1d1d1f]/60">A canary yellow diamond, set in yellow gold claws.</p>
              )}
            </div>
          </div>

          <div>
            <FieldLabel hint={caratLabel(config) || "Any size"}>Carat</FieldLabel>
            <CaratRange min={config.caratMin} max={config.caratMax} onChange={(r) => update(r)} />
            <p className="mt-2 text-[14px] text-[#1d1d1f]/60">Lab-grown, made to order. We&rsquo;ll suggest stones in your range.</p>

            <div className="mt-10">
              <FieldLabel>Quality</FieldLabel>
              <div role="radiogroup" aria-label="Diamond quality" className="space-y-2.5 text-[15px]">
                {(
                  [
                    ["recommend", "Let Elanora recommend"],
                    ["custom", "I have preferences"],
                  ] as const
                ).map(([mode, text]) => (
                  <label key={mode} className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="radio"
                      name="quality"
                      checked={config.qualityMode === mode}
                      onChange={() => {
                        update({ qualityMode: mode });
                        setMoreOpen(mode === "custom");
                      }}
                      className="h-4 w-4 accent-[#1d1d1f]"
                    />
                    {text}
                  </label>
                ))}
              </div>
              {moreOpen && config.qualityMode === "custom" && (
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="mb-1.5 text-[14px] text-[#1d1d1f]/70">Colour grade</p>
                    <Segmented label="Colour grade" options={QUALITY_COLOURS} value={config.qColour as never} onChange={(qColour) => update({ qColour })} />
                  </div>
                  <div>
                    <p className="mb-1.5 text-[14px] text-[#1d1d1f]/70">Clarity</p>
                    <Segmented label="Clarity" options={QUALITY_CLARITIES} value={config.qClarity as never} onChange={(qClarity) => update({ qClarity })} />
                  </div>
                  <div>
                    <p className="mb-1.5 text-[14px] text-[#1d1d1f]/70">Cut</p>
                    <Segmented label="Cut" options={QUALITY_CUTS} value={config.qCut as never} onChange={(qCut) => update({ qCut })} />
                  </div>
                  <p className="text-[13px] leading-[1.6] text-[#1d1d1f]/55">
                    These are preferences. We&rsquo;ll confirm the exact grades with you in your quote.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview + action */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        {photo ? (
          <>
            <ProductFrame
              src={metalImage(photo.item, config.metal)}
              alt={`${setting!.name} setting`}
              bg="bg-white"
              className="aspect-square"
              sizes="(max-width: 1024px) 100vw, 30vw"
              priority
            />
            <p className="mt-3 text-center text-[14px] text-[#1d1d1f]/70">
              {[setting!.name, config.shape, caratLabel(config), metalLabel(config.metal)].filter(Boolean).join(" · ")}
            </p>
            {config.shape && !photo.exact && (
              <p className="mt-1 text-center text-[13px] text-[#1d1d1f]/55">
                Shown in {photo.shownShape}. Made in {config.shape} for you.
              </p>
            )}
          </>
        ) : (
          <div className="flex aspect-square flex-col items-center justify-center bg-white text-center">
            {config.shape ? <ShapeIcon shape={config.shape} size={72} /> : <ShapeIcon shape="Round" size={72} />}
            <p className="mt-4 text-[14px] text-[#1d1d1f]/60">
              {config.shape ? diamondTitle(config) : "Choose a shape"}
            </p>
            <p className="mt-1 text-[13px] text-[#1d1d1f]/50">You&rsquo;ll choose the setting next.</p>
          </div>
        )}

        <div className="mt-6">
          <ActionBar note="No exact stone yet — we'll match one to your choices in your quote.">
            <PrimaryButton disabled={!config.shape} onClick={confirm}>
              {config.shape ? "Add Diamond Preference" : "Choose a Shape"}
            </PrimaryButton>
          </ActionBar>
        </div>
      </aside>
    </section>
  );
}
