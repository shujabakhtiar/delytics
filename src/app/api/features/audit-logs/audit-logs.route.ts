import { auditLogController } from "./audit-logs.controller";

export async function auditLogRouter(req: Request) {
    if (req.method === 'GET') {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (id) {
            return auditLogController.getAuditLogById(req);
        }
        return auditLogController.getAllAuditLogs(req);
    }

    if (req.method === 'POST') {
        return auditLogController.createAuditLog(req);
    }

    return new Response('Method Not Allowed', { status: 405 });
}
