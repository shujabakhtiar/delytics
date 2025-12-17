import { authController } from './auth.controller';

/**
 * Route Dispatcher for Next.js App Router
 * This acts as the "Router" connecting incoming requests to specific controller methods.
 */
export async function authRouter(req: Request, params: { action: string }) {
    const { action } = params;

    // POST /api/auth/register
    if (req.method === 'POST' && action === 'register') {
        return authController.register(req);
    }
    
    // POST /api/auth/login
    if (req.method === 'POST' && action === 'login') {
        return authController.login(req);
    }

    // POST /api/auth/logout
    if (req.method === 'POST' && action === 'logout') {
        return authController.logout(req);
    }

    return new Response('Not Found', { status: 404 });
}
