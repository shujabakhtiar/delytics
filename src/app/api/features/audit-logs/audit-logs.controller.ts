import { ApiResponse } from "@/app/types";
import { NextResponse } from "next/server";
import { auditLogService } from "./audit-logs.service";

export class AuditLogController {
    async getAuditLogById(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const { searchParams } = new URL(req.url);
            const idStr = searchParams.get('id');

            if (!idStr) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'ID is required'
                }, { status: 400 });
            }

            const id = Number(idStr);
            if (isNaN(id)) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Invalid ID format'
                }, { status: 400 });
            }

            const auditLog = await auditLogService.getAuditLogById(id);
            return NextResponse.json({
                success: true,
                data: auditLog,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async getAllAuditLogs(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const { searchParams } = new URL(req.url);
            const userId = searchParams.get('userId');
            const entity = searchParams.get('entity');
            const entityId = searchParams.get('entityId');

            let auditLogs;
            if (userId) {
                auditLogs = await auditLogService.getAuditLogsByUser(Number(userId));
            } else if (entity && entityId) {
                auditLogs = await auditLogService.getAuditLogsByEntity(entity, Number(entityId));
            } else {
                auditLogs = await auditLogService.getAuditLogs();
            }

            return NextResponse.json({
                success: true,
                data: auditLogs,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async createAuditLog(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { userId, action, entity, entityId, metadata } = body;

            if (!userId || !action || !entity || !entityId) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Required fields missing: userId, action, entity, or entityId'
                }, { status: 400 });
            }

            const auditLogData = {
                userId: Number(userId),
                action,
                entity,
                entityId: Number(entityId),
                metadata: metadata || {}
            };

            const newAuditLog = await auditLogService.createAuditLog(auditLogData);
            return NextResponse.json({
                success: true,
                data: newAuditLog,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }
}

export const auditLogController = new AuditLogController();
