import { sanityClient } from "@/sanity/lib/client";


const TOKEN_URL = "https://bezpecnost.csas.cz/api/psd2/fl/oidc/v1/token";

let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;

async function getRefreshToken(): Promise<{ id: string; token: string }> {
  const doc = await sanityClient.fetch(`*[_type == "env"][0]{ _id, ersteRefToken }`);
  if (!doc?.ersteRefToken) throw new Error("ersteRefToken není v Sanity");
  return { id: doc._id, token: doc.ersteRefToken };
}

export async function getAccessToken(): Promise<string> {
  if (cachedAccessToken && Date.now() < tokenExpiresAt - 30_000) {
    return cachedAccessToken;
  }

  const { id, token: refreshToken } = await getRefreshToken();

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.ERSTE_CLIENT_ID!,
      client_secret: process.env.ERSTE_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) throw new Error(`Token refresh selhal: ${await res.text()}`);

  const data = await res.json();
  cachedAccessToken = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000;

  // Pokud přišel nový refresh token, ulož ho
  if (data.refresh_token && data.refresh_token !== refreshToken) {
    await sanityClient.patch(id).set({ ersteRefToken: data.refresh_token }).commit();
  }

  return cachedAccessToken!;
}