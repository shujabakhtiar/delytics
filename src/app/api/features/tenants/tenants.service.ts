import prisma from '@/lib/prisma';

export class TenantService {
    async getTenants(id: number): Promise<any> {
        const tenant = await prisma.tenant.findUnique({
            where: { id }
        });
        return tenant;
    }

    async getAllTenants(): Promise<any> {
        const tenants = await prisma.tenant.findMany();
        return tenants;
    }

    async createTenant(name: string): Promise<any> {
        const tenant = await prisma.tenant.create({
            data: {
                name
            }
        });
        return tenant;
    }
}

export const tenantService = new TenantService();
