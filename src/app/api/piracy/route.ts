import { NextResponse } from 'next/server';
import { mockPiracyZones } from '@/data/mock-piracy';

export async function GET() {
  return NextResponse.json(mockPiracyZones);
}
