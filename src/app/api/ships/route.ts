import { NextResponse } from 'next/server';
import { mockShips } from '@/data/mock-ships';

export async function GET() {
  return NextResponse.json(mockShips);
}
