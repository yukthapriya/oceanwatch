import { NextResponse } from 'next/server';
import { mockProtectedAreas } from '@/data/mock-fishing';

export async function GET() {
  return NextResponse.json(mockProtectedAreas);
}
