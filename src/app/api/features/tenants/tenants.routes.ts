import { tenantController } from './tenants.controller';

/**
 * Route Dispatcher for Tenant Feature
 */
export async function tenantRouter(req: Request, params: { action?: string }) {
    if (req.method === 'GET') {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        
        if (id) {
            return tenantController.getTenant(req);
        }
        return tenantController.getAllTenant(req);
    }

    if (req.method === 'POST') {
        return tenantController.createTenant(req)
    }

    return new Response('Not Found', { status: 404 });
}
