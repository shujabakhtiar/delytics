import { ApiResponse } from "@/app/types";
import { NextResponse } from "next/server";
import { exportService } from "./exports.service";

export class ExportController {
    async getExportById(req: Request): Promise<NextResponse<ApiResponse<any>>> {
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

            const exportItem = await exportService.getExportById(id);
            return NextResponse.json({
                success: true,
                data: exportItem,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async getAllExports(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const { searchParams } = new URL(req.url);
            const userId = searchParams.get('userId');

            let exports;
            if (userId) {
                exports = await exportService.getExportsByUser(Number(userId));
            } else {
                exports = await exportService.getExports();
            }

            return NextResponse.json({
                success: true,
                data: exports,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async createExport(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { userId, tenantId, regionId, filters, status, fileUrl } = body;

            if (!userId || !tenantId || !regionId) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Required fields missing: userId, tenantId, or regionId'
                }, { status: 400 });
            }

            const exportData = {
                userId: Number(userId),
                tenantId: Number(tenantId),
                regionId: Number(regionId),
                filters: filters || {},
                status: status || 'pending',
                fileUrl: fileUrl || ''
            };

            const newExport = await exportService.createExport(exportData);
            return NextResponse.json({
                success: true,
                data: newExport,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async updateExport(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { id, ...updateData } = body;

            if (!id) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'ID is required'
                }, { status: 400 });
            }

            if (updateData.userId) updateData.userId = Number(updateData.userId);
            if (updateData.tenantId) updateData.tenantId = Number(updateData.tenantId);
            if (updateData.regionId) updateData.regionId = Number(updateData.regionId);

            const updatedExport = await exportService.updateExport(Number(id), updateData);
            return NextResponse.json({
                success: true,
                data: updatedExport,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async deleteExport(req: Request): Promise<NextResponse<ApiResponse<any>>> {
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

            const deletedExport = await exportService.deleteExport(Number(idStr));
            return NextResponse.json({
                success: true,
                data: deletedExport,
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

export const exportController = new ExportController();
