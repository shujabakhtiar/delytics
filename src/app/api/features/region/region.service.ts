import prisma from "@/lib/prisma";
import { Region, RegionCreateInput } from "@/app/api/interfaces/region.interface";
export class RegionService {
    async getRegions() {
        const regions = await prisma.region.findMany();
        return regions;
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