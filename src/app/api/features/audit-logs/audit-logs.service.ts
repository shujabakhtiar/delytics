import prisma from "@/lib/prisma";

export class AuditLogService {
    async getAuditLogById(id: number) {
        const auditLog = await prisma.auditLog.findUnique({ where: { id } });
        return auditLog;
    }

    async getAuditLogs() {
        const auditLogs = await prisma.auditLog.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return auditLogs;
    }

    async getAuditLogsByUser(userId: number) {
        const auditLogs = await prisma.auditLog.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        return auditLogs;
    }

    async getAuditLogsByEntity(entity: string, entityId: number) {
        const auditLogs = await prisma.auditLog.findMany({
            where: { entity, entityId },
            orderBy: { createdAt: 'desc' }
        });
        return auditLogs;
    }

    async createAuditLog(auditLogData: any) {
        const newAuditLog = await prisma.auditLog.create({
            data: auditLogData
        });
        return newAuditLog;
    }
}

export const auditLogService = new AuditLogService();
