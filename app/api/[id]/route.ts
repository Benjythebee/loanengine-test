import { getMockData } from '@/mock/data';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {

const { searchParams } = new URL(request.url);

const {id} = Object.fromEntries(searchParams.entries());

  if(!id){
    return NextResponse.json(
        { error: 'Missing loan account ID' },
        { status: 400 }
    );
  }

  const pagination = {
    page: searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0,
    size: searchParams.get('size') ? parseInt(searchParams.get('size') as string) : 10,
  }

  const data = getMockData(id,pagination)

  return NextResponse.json(data, { status: 200 });

}
  
