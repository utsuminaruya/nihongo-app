import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Step 6で実装 - 作文添削API
  return NextResponse.json(
    { message: "Essay Correction API - Coming soon" },
    { status: 501 }
  );
}
