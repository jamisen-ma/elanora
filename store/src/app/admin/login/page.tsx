import { adminConfigured } from "@/lib/adminAuth";

export const metadata = { title: "Sign in" };

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/admin";
  const failed = params.error === "1";
  const configured = adminConfigured();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        method="post"
        action="/api/admin/login"
        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg p-6 space-y-4"
      >
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Elanora Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to see the dashboard.</p>
        </div>

        {!configured && (
          <p className="text-sm text-amber-700 bg-amber-50 rounded p-3">
            No admin password is set yet. Add ADMIN_PASSWORD in Vercel → Settings → Environment
            Variables, then redeploy.
          </p>
        )}
        {failed && <p className="text-sm text-red-600">That password isn&apos;t right.</p>}

        <input type="hidden" name="next" value={next} />
        <label className="block">
          <span className="text-sm text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            required
            autoFocus
            autoComplete="current-password"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-gray-900 text-white text-sm rounded py-2 hover:bg-gray-700 transition-colors"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
