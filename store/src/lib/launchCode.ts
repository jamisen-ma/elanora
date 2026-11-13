// The launch-offer code. Launch sale prices are shown and charged only to visitors who have
// entered it (the box under the home page hero). Kept on the server only, so it never appears
// in the site's JavaScript. LAUNCH_CODE in the environment overrides it without a code change.
const LAUNCH_CODE = (process.env.LAUNCH_CODE || "ELANORALAUNCH").trim().toUpperCase();

/** True when `value` is the launch code (any letter case, spaces ignored). */
export function isLaunchCode(value: unknown): boolean {
  return typeof value === "string" && value.replace(/\s+/g, "").toUpperCase() === LAUNCH_CODE;
}
