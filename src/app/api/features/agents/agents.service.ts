import prisma from "@/lib/prisma";
import { Agent } from "http";

export class AgentService {
    async getAgentById(id: number) {
        const agent = await prisma.agent.findUnique({where: {id}});
        return agent;
    }
    async getAllAgents() {
        const agent = await prisma.agent.findMany();
        return agent;
    }
    async createAgent(agentData: any) {
        const newAgent = await prisma.agent.create({data: agentData});
        return newAgent;
    }
    async updateAgent(tenantId: Number, regionId: Number, hubId: Number, status: String, id: Number) {
        const updatedAgent = await prisma.agent.update({ where: { id }, data: {tenantId, regionId,hubId,status} });
        return updatedAgent;
    }
    async deleteAgent(id: Number) {
        const deletedAgent = await prisma.agent.delete({ where: { id } });
        return deletedAgent;
    }    
}
export const agentService = new AgentService();