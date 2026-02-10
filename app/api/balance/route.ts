import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.MOONSHOT_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "MOONSHOT_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.moonshot.ai/v1/users/me/balance", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      // Don't cache balance checks
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Moonshot API returned ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch balance from Moonshot API" },
      { status: 500 }
    );
  }
}
