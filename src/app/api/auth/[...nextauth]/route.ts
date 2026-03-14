import { handlers } from "@/auth";

// At runtime on Vercel, DATABASE_URL is the real Supabase URL (not "mock")
// so isMock will be false and the real auth handlers are used.
// During build, DATABASE_URL contains "mock" so we return dummy responses.
const isMock = !process.env.DATABASE_URL || 
               process.env.DATABASE_URL.includes("mock") || 
               process.env.BUILD_MODE === "1";

if (isMock && process.env.NODE_ENV === "production") {
  console.log("NextAuth: Mock mode activated in production. Checks:", {
    hasDbUrl: !!process.env.DATABASE_URL,
    isMockUrl: process.env.DATABASE_URL?.includes("mock"),
    buildMode: process.env.BUILD_MODE
  });
}

export const GET = isMock 
  ? () => new Response(JSON.stringify({ ok: true, mode: "mock", detail: "Check Vercel environment variables" }), { status: 200 })
  : handlers.GET;

export const POST = isMock 
  ? () => new Response(JSON.stringify({ ok: true, mode: "mock", detail: "Check Vercel environment variables" }), { status: 200 })
  : handlers.POST;
