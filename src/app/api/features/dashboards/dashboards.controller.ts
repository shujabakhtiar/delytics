import { ApiResponse } from "@/app/types";
import { NextResponse } from "next/server";
import { dashboardService } from "./dashboards.service";

export class DashboardController {
    async getDashboardById(req: Request): Promise<NextResponse<ApiResponse<any>>> {
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

            const dashboard = await dashboardService.getDashboardById(id);
            return NextResponse.json({
                success: true,
                data: dashboard,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async getAllDashboards(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const dashboards = await dashboardService.getDashboards();
            return NextResponse.json({
                success: true,
                data: dashboards,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async createDashboard(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { tenantId, regionId, createdBy, name, isShared } = body;

            if (!name || !tenantId || !createdBy) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Required fields missing: name, tenantId, or createdBy'
                }, { status: 400 });
            }

            const dashboardData = {
                name,
                tenantId: Number(tenantId),
                regionId: regionId ? Number(regionId) : null,
                createdBy: Number(createdBy),
                isShared: !!isShared
            };

            const dashboard = await dashboardService.createDashboard(dashboardData);
            return NextResponse.json({
                success: true,
                data: dashboard,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async updateDashboard(req: Request): Promise<NextResponse<ApiResponse<any>>> {
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

            if (updateData.tenantId) updateData.tenantId = Number(updateData.tenantId);
            if (updateData.regionId) updateData.regionId = Number(updateData.regionId);
            if (updateData.createdBy) updateData.createdBy = Number(updateData.createdBy);

            const dashboard = await dashboardService.updateDashboard(Number(id), updateData);
            return NextResponse.json({
                success: true,
                data: dashboard,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async deleteDashboard(req: Request): Promise<NextResponse<ApiResponse<any>>> {
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

            const dashboard = await dashboardService.deleteDashboard(Number(idStr));
            return NextResponse.json({
                success: true,
                data: dashboard,
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

export const dashboardController = new DashboardController();
