import prisma from "@/lib/prisma";
import { paginate, PaginationParams } from "../../utils/pagination";

export interface DeliveryFilters {
    startDate?: string;
    endDate?: string;
    regionId?: number;
    region?: string;
    hubId?: number;
    hub?: string;
    status?: string;
    slaBreached?: boolean;
}

export class DeliveryService {
    async getDeliveryById(id: number) {
        const delivery = await prisma.delivery.findUnique({ 
            where: { id },
            include: {
                region: true,
                hub: true,
                agent: true
            }
        });
        return delivery;
    }

    async getAllDeliveries(filters: DeliveryFilters, pagination: PaginationParams) {
        const where: any = {};
        
        if (filters.regionId) where.regionId = filters.regionId;
        else if (filters.region) where.region = { name: filters.region };

        if (filters.hubId) where.hubId = filters.hubId;
        else if (filters.hub) where.hub = { name: filters.hub };

        if (filters.status) where.status = filters.status;
        if (filters.slaBreached !== undefined) where.slaBreached = filters.slaBreached;
        
        if (filters.startDate || filters.endDate) {
            where.createdAt = {};
            if (filters.startDate) where.createdAt.gte = new Date(filters.startDate);
            if (filters.endDate) {
                const end = new Date(filters.endDate);
                end.setHours(23, 59, 59, 999);
                where.createdAt.lte = end;
            }
        }

        return paginate(prisma.delivery, { 
            where,
            include: {
                region: true,
                hub: true,
                agent: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        }, pagination);
    }

    async createDelivery(deliveryData: any) {
        const newDelivery = await prisma.delivery.create({ data: deliveryData });
        return newDelivery;
    }

    async updateDelivery(id: number, deliveryData: any) {
        const updatedDelivery = await prisma.delivery.update({
            where: { id },
            data: deliveryData,
        });
        return updatedDelivery;
    }

    async deleteDelivery(id: number) {
        const deletedDelivery = await prisma.delivery.delete({ where: { id } });
        return deletedDelivery;
    }
}

export const deliveryService = new DeliveryService();
