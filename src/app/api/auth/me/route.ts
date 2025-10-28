import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const user = await getCurrentUser(token);

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}