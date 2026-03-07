import { NextResponse } from 'next/server';
import { mockOceanTemperature } from '@/data/mock-ocean';

export async function GET() {
  return NextResponse.json(mockOceanTemperature);
}
