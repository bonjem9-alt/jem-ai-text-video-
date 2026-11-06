import { NextRequest, NextResponse } from 'next/server';
import RunwayML from '@runwayml/sdk';
export const runtime = 'nodejs';
const client = new RunwayML({ apiKey: process.env.RUNWAYML_API_SECRET });
export async function GET(_req: NextRequest, context: {params: Promise<{id:string}>}) {
  try {
    const {id} = await context.params;
    const task = await client.tasks.retrieve(id);
    return NextResponse.json({id:task.id,status:task.status,output:task.output,error:task.failure});
  } catch(e) {
    return NextResponse.json({error:e instanceof Error?e.message:'Could not retrieve task.'},{status:500});
  }
}
