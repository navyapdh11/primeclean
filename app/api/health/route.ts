import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  const healthCheckEnabled = process.env.HEALTH_CHECK_ENABLED;

  if (healthCheckEnabled === 'false') {
    return NextResponse.json(
      { status: 'disabled', message: 'Health check endpoint is disabled' },
      { status: 503 }
    );
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
}
