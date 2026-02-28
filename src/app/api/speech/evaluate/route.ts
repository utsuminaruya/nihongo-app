import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Phase 4で実装 - 発音評価API
  return NextResponse.json(
    { message: "Speech Evaluation API - Coming soon" },
    { status: 501 }
  );
}
