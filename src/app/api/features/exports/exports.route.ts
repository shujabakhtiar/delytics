import { exportController } from "./exports.controller";

export async function exportRouter(req: Request) {
    if (req.method === 'GET') {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (id) {
            return exportController.getExportById(req);
        }
        return exportController.getAllExports(req);
    }

    if (req.method === 'POST') {
        return exportController.createExport(req);
    }

    if (req.method === 'PUT') {
        return exportController.updateExport(req);
    }

    if (req.method === 'DELETE') {
        return exportController.deleteExport(req);
    }

    return new Response('Not Found', { status: 404 });
}
