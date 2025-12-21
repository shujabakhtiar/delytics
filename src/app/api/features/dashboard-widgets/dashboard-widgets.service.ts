import prisma from "@/lib/prisma";

export class DashboardWidgetService {
    async getWidgetById(id: number) {
        const widget = await prisma.dashboardWidget.findUnique({ where: { id } });
        return widget;
    }

    async getWidgetsByDashboardId(dashboardId: number) {
        const widgets = await prisma.dashboardWidget.findMany({
            where: { dashboardId }
        });
        return widgets;
    }

    async createWidget(widgetData: any) {
        const widget = await prisma.dashboardWidget.create({
            data: widgetData
        });
        return widget;
    }

    async updateWidget(id: number, widgetData: any) {
        const widget = await prisma.dashboardWidget.update({
            where: { id },
            data: widgetData,
        });
        return widget;
    }

    async deleteWidget(id: number) {
        const widget = await prisma.dashboardWidget.delete({ where: { id } });
        return widget;
    }
}

export const dashboardWidgetService = new DashboardWidgetService();
