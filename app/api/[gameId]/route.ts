// src/app/api/check/[gameId]/route.ts
import { NextResponse } from "next/server";

// CORS 헤더 설정
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // 모든 도메인 허용 (특정 도메인으로 제한 권장)
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// (선택) 간단한 유효성 검사
const isHex = (s: string) => /^[0-9a-f]+$/i.test(s);

// OPTIONS 요청 처리 (preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await params;

  if (!gameId || !isHex(gameId)) {
    return NextResponse.json(
      { error: "Invalid gameId" },
      { status: 400, headers: corsHeaders }
    );
  }

  // 목적지 URL 구성
  const target = `https://lim.com2us.com/${gameId}?lang=ko`;

  // 303 리다이렉트 (CORS 헤더 포함)
  return NextResponse.redirect(target, {
    status: 303,
    headers: corsHeaders,
  });
}
