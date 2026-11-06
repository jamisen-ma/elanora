import CheckoutClient from "./CheckoutClient";

// Stripe returns the customer here with ?success=true or ?canceled=true.
export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const status = params.success ? "success" : params.canceled ? "canceled" : null;
  return <CheckoutClient status={status} />;
}
