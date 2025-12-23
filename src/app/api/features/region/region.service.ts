import prisma from "@/lib/prisma";
import { Region, RegionCreateInput } from "@/app/api/interfaces/region.interface";
import { paginate, PaginationParams } from "../../utils/pagination";

export interface RegionFilters {
    name?: string;
    tenantId?: number;
}

export class RegionService {
    async getRegions(filters: RegionFilters = {}, pagination: PaginationParams = { page: 1, limit: 10, skip: 0 }) {
        const where: any = {};
        
        if (filters.name) where.name = { contains: filters.name, mode: 'insensitive' };
        if (filters.tenantId) where.tenantId = filters.tenantId;

        return paginate(prisma.region, {
            where,
            orderBy: {
                name: 'asc'
            }
        }, pagination);
    }

    async getRegionById(id: number) {
        const region = await prisma.region.findUnique({ where: { id } });
        return region;
    }

    async createRegion(region: RegionCreateInput) {
        const newRegion = await prisma.region.create({ data: region });
        return newRegion;
    }
    async updateRegion(region: any) {
        const updatedRegion = await prisma.region.update({ where: { id: region.id }, data: region });
        return updatedRegion;
    }
    async deleteRegion(id: number) {
        const deletedRegion = await prisma.region.delete({ where: { id } });
        return deletedRegion;
    }
}
export const regionService = new RegionService();