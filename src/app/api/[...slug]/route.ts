import { authRouter } from '@/app/api/features/auth/auth.routes';
import { exampleRouter } from '@/app/api/features/exampleFeature/example.routes';
import { NextRequest, NextResponse } from 'next/server';
import { tenantRouter } from '@/app/api/features/tenants/tenants.routes';

async function handler(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    
    // slug[0] is the feature (e.g., 'auth', 'example')
    // slug[1] is the action (e.g., 'login', 'happy')
    
    const [feature, action] = slug;

    if (!feature || !action) {
        return new NextResponse('Bad Request', { status: 400 });
    }

    switch (feature) {
        case 'auth':
            return authRouter(req, { action });
        case 'example':
            return exampleRouter(req, { action });
        case 'tenant':
            return tenantRouter(req, { action });
        default:
            return new NextResponse('Feature Not Found', { status: 404 });
    }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
