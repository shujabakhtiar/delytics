import prisma from "@/lib/prisma";

export class DashboardService {
    async getDashboardById(id: number) {
        const dashboard = await prisma.dashboard.findUnique({
            where: { id },
            include: { widgets: true }
        });
        return dashboard;
    }

    async getDashboards() {
        const dashboards = await prisma.dashboard.findMany({
            include: { widgets: true }
        });
        return dashboards;
    }

    async createDashboard(dashboardData: any) {
        const dashboard = await prisma.dashboard.create({
            data: dashboardData
        });
        return dashboard;
    }

    async updateDashboard(id: number, dashboardData: any) {
        const dashboard = await prisma.dashboard.update({
            where: { id },
            data: dashboardData,
        });
        return dashboard;
    }

    async deleteDashboard(id: number) {
        const dashboard = await prisma.dashboard.delete({ where: { id } });
        return dashboard;
    }
}

export const dashboardService = new DashboardService();
