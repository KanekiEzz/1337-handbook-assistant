import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const response = await fetch("http://127.0.0.1:8080/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
