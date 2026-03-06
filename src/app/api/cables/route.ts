import { NextResponse } from 'next/server';
import { mockCables } from '@/data/mock-cables';

export async function GET() {
  return NextResponse.json(mockCables);
}
