import { dashboardController } from "./dashboards.controller";

export async function dashboardRouter(req: Request) {
    if (req.method === 'GET') {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (id) {
            return dashboardController.getDashboardById(req);
        }
        return dashboardController.getAllDashboards(req);
    }

    if (req.method === 'POST') {
        return dashboardController.createDashboard(req);
    }

    if (req.method === 'PUT') {
        return dashboardController.updateDashboard(req);
    }

    if (req.method === 'DELETE') {
        return dashboardController.deleteDashboard(req);
    }

    return new Response('Not Found', { status: 404 });
}
