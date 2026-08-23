import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const title = body.title || 'Diagnostic Inspection & Operational Intuition';
    const expertName = body.expertName || 'Ramesh Kumar';
    const expertRole = body.expertRole || 'Master Mechanic';
    const category = body.category || 'Automotive Repair';
    const duration = body.duration || '03:15';

    // Extracted knowledge structure payload
    const processedMemory = {
      id: `mem-${Date.now()}`,
      catalogId: `ARCH-00${Math.floor(Math.random() * 90 + 10)}`,
      title,
      summary: body.prompt
        ? `Preserved oral account regarding "${body.prompt}". Contains diagnostic steps, tactile tests, and key mistakes to avoid.`
        : 'Spoken account capturing 35 years of unwritten diagnostic intuition.',
      expertId: 'ramesh-kumar',
      expertName,
      expertRole,
      expertExperience: 35,
      category,
      duration,
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      procedure: [
        { step: 1, instruction: 'Check coolant circulation flow before replacing the thermostat housing.', note: 'Feel upper vs lower radiator hose temperatures first.' },
        { step: 2, instruction: 'Inspect water pump impeller vanes for cavitation or micro-fractures.', note: 'A cold lower hose indicates pump failure, not thermostat failure.' },
        { step: 3, instruction: 'Perform aroma diagnostic at radiator cap once engine cools down.', note: 'A sweet metallic odor indicates head gasket pressure leakage.' }
      ],
      expertTips: [
        'Feel upper vs lower radiator hose temperatures before unbolting any parts.',
        'A metallic ticking under load combined with cold return lines signals impeller erosion.'
      ],
      commonMistakes: [
        'Replacing the thermostat immediately without verifying actual impeller cavitation.',
        'Opening radiator pressure cap while coolant system remains pressurized.'
      ],
      tools: ['Coolant Pressure Tester', 'Infrared Thermometer', 'Tactile Inspection Gloves']
    };

    return NextResponse.json({
      success: true,
      message: 'Memory extracted and preserved successfully',
      data: processedMemory
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process oral account' },
      { status: 500 }
    );
  }
}
