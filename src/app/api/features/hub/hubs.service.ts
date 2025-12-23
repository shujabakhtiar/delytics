import prisma from "@/lib/prisma";
import { paginate, PaginationParams } from "../../utils/pagination";

export interface HubFilters {
    name?: string;
    minCapacity?: number;
    maxCapacity?: number;
    regionId?: number;
    region?: string;
}

export class HubService {
    async getHubById(id: number) {
        const hub = await prisma.hub.findUnique({ 
            where: { id },
            include: {
                region: true,
                agents: true
            }
        });
        return hub;
    }
    async getHubs(filters: HubFilters, pagination: PaginationParams) {
        const where: any = {};
        if (filters.name) where.name = { contains: filters.name, mode: 'insensitive' };
        
        if (filters.minCapacity !== undefined || filters.maxCapacity !== undefined) {
            where.capacity = {};
            if (filters.minCapacity !== undefined) where.capacity.gte = filters.minCapacity;
            if (filters.maxCapacity !== undefined) where.capacity.lte = filters.maxCapacity;
        }

        if (filters.regionId) where.regionId = filters.regionId;
        if (filters.region) where.region = { name: { contains: filters.region, mode: 'insensitive' } };
        
        return paginate(prisma.hub, {
            where,
            include: {
                region: true,
                agents: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        }, pagination)
    }
    async createHub(hubData: any) {
        const hub = await prisma.hub.create({
            data: hubData
        });
        return hub;
    }
    async updateHub(id: number, name: string) {
        const hub = await prisma.hub.update({
            where: { id },
            data: { name },
        });
        return hub;
    }
    async deleteHub(id: number) {
        const hub = await prisma.hub.delete({ where: { id } });
        return hub;
    }
}

export const hubService = new HubService();

