
import { NextResponse } from 'next/server'

export async function GET(request: Request) { 
  let data =  await fetch(`https://reqres.in/api/products`).then( res => res.json() )
  return NextResponse.json( data );
}