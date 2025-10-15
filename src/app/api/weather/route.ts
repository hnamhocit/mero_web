import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 });
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();

    if (!data.current_weather)
      return NextResponse.json({ error: "No weather data" }, { status: 500 });

    const { temperature, weathercode } = data.current_weather;
    return NextResponse.json({ temperature, weatherCode: weathercode });
  } catch (err) {
    console.error("Weather fetch failed:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
