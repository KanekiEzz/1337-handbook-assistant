import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("http://127.0.0.1:8080/data");
  const data = await response.json();
  return NextResponse.json(data);
}
