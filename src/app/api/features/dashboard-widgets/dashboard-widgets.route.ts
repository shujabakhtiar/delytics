import { dashboardWidgetController } from "./dashboard-widgets.controller";

export async function dashboardWidgetRouter(req: Request) {
    if (req.method === 'GET') {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const dashboardId = searchParams.get('dashboardId');
        
        if (id) {
            return dashboardWidgetController.getWidgetById(req);
        }
        
        if (dashboardId) {
            return dashboardWidgetController.getWidgetsByDashboard(req);
        }

        return new Response('Missing parameters', { status: 400 });
    }

    if (req.method === 'POST') {
        return dashboardWidgetController.createWidget(req);
    }

    if (req.method === 'PUT') {
        return dashboardWidgetController.updateWidget(req);
    }

    if (req.method === 'DELETE') {
        return dashboardWidgetController.deleteWidget(req);
    }

    return new Response('Not Found', { status: 404 });
}
