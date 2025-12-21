import { deliveryController } from "./deliveries.controller";

export async function deliveryRouter(req: Request) {
    if (req.method === 'GET') {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (id) {
            return deliveryController.getDeliveryById(req);
        }
        return deliveryController.getAllDeliveries(req);
    }

    if (req.method === 'POST') {
        return deliveryController.createDelivery(req);
    }

    if (req.method === 'PUT') {
        return deliveryController.updateDelivery(req);
    }

    if (req.method === 'DELETE') {
        return deliveryController.deleteDelivery(req);
    }

    return new Response('Not Found', { status: 404 });
}
