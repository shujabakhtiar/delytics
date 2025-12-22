import prisma from "@/lib/prisma";
import { paginate, PaginationParams } from "../../utils/pagination";

export interface AgentFilters {
    name?: string;
    status?: string;
    regionId?: number;
    region?: string;
    hubId?: number;
    hub?: string;
}

export class AgentService {
    async getAgentById(id: number) {
        const agent = await prisma.agent.findUnique({
            where: { id },
            include: {
                region: true,
                hub: true
            }
        });
        return agent;
    }

    async getAllAgents(filters: AgentFilters, pagination: PaginationParams) {
        const where: any = {};
        
        if (filters.name) where.name = { contains: filters.name, mode: 'insensitive' };
        if (filters.status) where.status = filters.status;
        if (filters.regionId) where.regionId = filters.regionId;
        if (filters.region) where.region = { name: { contains: filters.region, mode: 'insensitive' } };
        if (filters.hubId) where.hubId = filters.hubId;
        if (filters.hub) where.hub = { name: { contains: filters.hub, mode: 'insensitive' } };

        return paginate(prisma.agent, {
            where,
            include: {
                region: true,
                hub: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        }, pagination);
    }

    async createAgent(agentData: any) {
        const newAgent = await prisma.agent.create({ data: agentData });
        return newAgent;
    }

    async updateAgent(id: number, agentData: any) {
        const updatedAgent = await prisma.agent.update({ 
            where: { id }, 
            data: agentData 
        });
        return updatedAgent;
    }

    async deleteAgent(id: number) {
        const deletedAgent = await prisma.agent.delete({ where: { id } });
        return deletedAgent;
    }    
}

export const agentService = new AgentService();