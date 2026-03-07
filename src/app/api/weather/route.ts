import { NextResponse } from 'next/server';
import { mockWeatherBuoys } from '@/data/mock-weather';

export async function GET() {
  return NextResponse.json(mockWeatherBuoys);
}
