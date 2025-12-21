import prisma from "@/lib/prisma";

export class ExportService {
    async getExportById(id: number) {
        const exportItem = await prisma.export.findUnique({ where: { id } });
        return exportItem;
    }

    async getExports() {
        const exports = await prisma.export.findMany();
        return exports;
    }

    async getExportsByUser(userId: number) {
        const exports = await prisma.export.findMany({
            where: { userId }
        });
        return exports;
    }

    async createExport(exportData: any) {
        const newExport = await prisma.export.create({
            data: exportData
        });
        return newExport;
    }

    async updateExport(id: number, exportData: any) {
        const updatedExport = await prisma.export.update({
            where: { id },
            data: exportData,
        });
        return updatedExport;
    }

    async deleteExport(id: number) {
        const deletedExport = await prisma.export.delete({ where: { id } });
        return deletedExport;
    }
}

export const exportService = new ExportService();
