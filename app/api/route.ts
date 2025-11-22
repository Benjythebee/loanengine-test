import { getMockDataMetadata } from '@/mock/data';
import { NextResponse } from 'next/server';


export async function GET() {

  const data = getMockDataMetadata();

  return NextResponse.json(data, { status: 200 });

}