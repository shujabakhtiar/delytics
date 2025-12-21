import { ApiResponse } from "@/app/types";
import { NextResponse } from "next/server";
import { dashboardWidgetService } from "./dashboard-widgets.service";

export class DashboardWidgetController {
    async getWidgetById(req: Request): Promise<NextResponse<ApiResponse<any>>> {
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

            const widget = await dashboardWidgetService.getWidgetById(id);
            return NextResponse.json({
                success: true,
                data: widget,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async getWidgetsByDashboard(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const { searchParams } = new URL(req.url);
            const dashboardIdStr = searchParams.get('dashboardId');

            if (!dashboardIdStr) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'dashboardId is required'
                }, { status: 400 });
            }

            const widgets = await dashboardWidgetService.getWidgetsByDashboardId(Number(dashboardIdStr));
            return NextResponse.json({
                success: true,
                data: widgets,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async createWidget(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { dashboardId, type, queryConfig, visualConfig, position } = body;

            if (!dashboardId || !type) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Required fields missing: dashboardId or type'
                }, { status: 400 });
            }

            const widgetData = {
                dashboardId: Number(dashboardId),
                type,
                queryConfig,
                visualConfig,
                position: position !== undefined ? Number(position) : 0
            };

            const widget = await dashboardWidgetService.createWidget(widgetData);
            return NextResponse.json({
                success: true,
                data: widget,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async updateWidget(req: Request): Promise<NextResponse<ApiResponse<any>>> {
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

            if (updateData.dashboardId) updateData.dashboardId = Number(updateData.dashboardId);
            if (updateData.position !== undefined) updateData.position = Number(updateData.position);

            const widget = await dashboardWidgetService.updateWidget(Number(id), updateData);
            return NextResponse.json({
                success: true,
                data: widget,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async deleteWidget(req: Request): Promise<NextResponse<ApiResponse<any>>> {
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

            const widget = await dashboardWidgetService.deleteWidget(Number(idStr));
            return NextResponse.json({
                success: true,
                data: widget,
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

export const dashboardWidgetController = new DashboardWidgetController();
