import { tenantController } from './tenants.controller';

/**
 * Route Dispatcher for Tenant Feature
 */
export async function tenantRouter(req: Request, params: { action: string }) {
    const { action } = params;

    // GET /api/tenant/example
    if (req.method === 'GET' && action === 'example') {
        return tenantController.getTenant(req);
    }

    // GET /api/tenant/all
    if (req.method === 'GET' && action === 'all') {
        return tenantController.getAllTenant(req);
    }

    return new Response('Not Found', { status: 404 });
}
