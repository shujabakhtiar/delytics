import prisma from "@/lib/prisma";

export class DeliveryService {
    async getDeliveryById(id: number) {
        const delivery = await prisma.delivery.findUnique({ where: { id } });
        return delivery;
    }

    async getAllDeliveries() {
        const deliveries = await prisma.delivery.findMany();
        return deliveries;
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
