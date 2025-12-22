import { ApiResponse } from "@/app/types";
import { NextResponse } from "next/server";
import { agentService, AgentFilters } from "./agents.service";
import { getPaginationParams } from "../../utils/pagination";

export class AgentController {
    async getAgentById(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const { searchParams } = new URL(req.url);
            const idStr = searchParams.get('id');

            if (!idStr) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'ID is required'
                }, { status: 400 });
            }

            const id = Number(idStr);
            if (isNaN(id)) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Invalid ID format'
                }, { status: 400 });
            }

            const agent = await agentService.getAgentById(id);
            return NextResponse.json({
                success: true,
                data: agent
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async getAllAgents(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const { searchParams } = new URL(req.url);
            const pagination = getPaginationParams(searchParams);
            
            const filters: AgentFilters = {
                name: searchParams.get('name') || undefined,
                status: searchParams.get('status') || undefined,
                regionId: searchParams.get('regionId') ? Number(searchParams.get('regionId')) : undefined,
                region: searchParams.get('region') || undefined,
                hubId: searchParams.get('hubId') ? Number(searchParams.get('hubId')) : undefined,
                hub: searchParams.get('hub') || undefined,
            };

            const result = await agentService.getAllAgents(filters, pagination);
            return NextResponse.json({
                success: true,
                data: result
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async createAgent(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { name, tenantId, regionId, hubId, status } = body;
            
            if (!name || !tenantId || !regionId || !hubId) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Missing required fields: name, tenantId, regionId, hubId'
                }, { status: 400 });
            }

            const agent = await agentService.createAgent({
                name,
                tenantId: Number(tenantId),
                regionId: Number(regionId),
                hubId: Number(hubId),
                status: status || 'ACTIVE'
            });

            return NextResponse.json({
                success: true,
                data: agent
            }, { status: 201 });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async updateAgent(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { id, ...agentData } = body;
            
            if (!id) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'ID is required'
                }, { status: 400 });
            }

            const agent = await agentService.updateAgent(Number(id), agentData);
            return NextResponse.json({
                success: true,
                data: agent
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async deleteAgent(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const { searchParams } = new URL(req.url);
            const idStr = searchParams.get('id');

            if (!idStr) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'ID is required'
                }, { status: 400 });
            }

            const agent = await agentService.deleteAgent(Number(idStr));
            return NextResponse.json({
                success: true,
                data: agent
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }
}

export const agentController = new AgentController();