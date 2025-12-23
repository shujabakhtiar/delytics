import { NextRequest, NextResponse } from 'next/server';
import { authRouter } from '@/app/api/features/auth/auth.routes';
import { tenantRouter } from '@/app/api/features/tenants/tenants.routes';
import { regionRouter } from '@/app/api/features/region/region.route';
import { hubRouter } from '../features/hub/hubs.routes';
import { agentRouter } from '../features/agents/agents.route';
import { deliveryRouter } from '../features/deliveries/deliveries.route';
import { dashboardRouter } from '../features/dashboards/dashboards.route';
import { dashboardWidgetRouter } from '../features/dashboard-widgets/dashboard-widgets.route';
import { exportRouter } from '../features/exports/exports.route';
import { auditLogRouter } from '../features/audit-logs/audit-logs.route';
import { authService } from '../features/auth/auth.service';

async function handler(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    
    // slug[0] is the feature (e.g., 'auth', 'example')
    // slug[1] is the action (e.g., 'login', 'happy')
    
    const [feature, action] = slug;

    if (!feature) {
        return new NextResponse('Bad Request', { status: 400 });
    }

    // Public routes that don't require authentication
    const publicRoutes = [
        { feature: 'auth', action: 'login' },
        { feature: 'auth', action: 'register' },
        { feature: 'auth', action: 'reset-password' }
    ];

    const isPublicRoute = publicRoutes.some(route => 
        route.feature === feature && route.action === action
    );

    if (!isPublicRoute) {
        // Check for authorization header
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ 
                success: false, 
                data: null, 
                error: 'Authorization token required in header (Authorization: Bearer <token>)' 
            }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const user = await authService.validateUser(token);

        if (!user) {
            return NextResponse.json({ 
                success: false, 
                data: null, 
                error: 'Invalid or expired token' 
            }, { status: 401 });
        }
    }

    switch (feature) {
        case 'auth':
            if (!action) return new NextResponse('Action Required', { status: 400 });
            return authRouter(req, { action });
        case 'tenant':
            return tenantRouter(req, { action });
        case 'region':
            return regionRouter(req);
        case 'hub':
            return hubRouter(req);
        case 'agent':
            return agentRouter(req);
        case 'delivery':
            return deliveryRouter(req);
        case 'dashboard':
            return dashboardRouter(req);
        case 'dashboard-widget':
            return dashboardWidgetRouter(req);
        case 'export':
            return exportRouter(req);
        case 'audit-log':
            return auditLogRouter(req);
        default:
            return new NextResponse('Feature Not Found', { status: 404 });
    }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
