import { regionController } from "./region.controller";


export async function regionRouter(req: Request) {
    if(req.method === 'GET') {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if(id) {
            return regionController.getRegion(req);
        }
        return regionController.getAllRegions(req);
    }

    if (req.method === 'POST') {
        return regionController.createRegion(req)
    }
    if (req.method === 'PUT') {
        return regionController.updateRegion(req)
    }
    if (req.method === 'DELETE') {
        return regionController.deleteRegion(req)
    }
    return new Response('Not Found', { status: 404 });
}