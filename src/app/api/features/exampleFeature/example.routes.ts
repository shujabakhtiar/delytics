import { exampleController } from './example.controller';

/**
 * Route Dispatcher for Example Feature
 */
export async function exampleRouter(req: Request, params: { action: string }) {
    const { action } = params;

    // GET /api/example/happy
    if (req.method === 'GET' && action === 'happy') {
        return exampleController.getMessage(req);
    }

    return new Response('Not Found', { status: 404 });
}
