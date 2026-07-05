import { NextRequest, NextResponse } from 'next/server';

// 测试模式：当环境变量未配置时使用
const TEST_MODE = !process.env.WAFFO_MERCHANT_ID || !process.env.WAFFO_PRIVATE_KEY;

export async function POST(request: NextRequest) {
  try {
    const { productId, email } = await request.json();
    
    if (TEST_MODE) {
      console.log('⚠️ Waffo 环境变量未配置，使用测试模式');
      return NextResponse.json({
        sessionUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success?test=true&product=${productId}`
      });
    }
    
    // 在生产环境中，这里应该调用 Waffo Pancake SDK
    // const client = new WaffoPancake({
    //   merchantId: process.env.WAFFO_MERCHANT_ID!,
    //   privateKey: process.env.WAFFO_PRIVATE_KEY!,
    // });
    // const session = await client.checkout.createSession({...});
    
    return NextResponse.json({
      sessionUrl: `${process.env.NEXT_PUBLIC_APP_URL}/success`
    });
    
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
