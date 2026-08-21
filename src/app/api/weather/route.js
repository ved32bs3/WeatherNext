import { NextResponse } from "next/server";

export async function GET(request) {
  const {searchParams} = new URL(request.url);
  const city = searchParams.get('city') || "London";

  let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.OPENWEATHER_API_KEY}`);
  let data = await res.json();
  console.log(city);
  console.log("KEY:", process.env.OPENWEATHER_API_KEY);

  return NextResponse.json(data, { status: 200 });
}