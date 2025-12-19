import prisma from "@/lib/prisma";

export class HubService {
    async getHubById(id: number) {
        const hub = await prisma.hub.findUnique({ where: { id } });
        return hub;
    }
    async getHubs() {
        const hubs = await prisma.hub.findMany();
        return hubs;
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

