import { ApiResponse } from "@/app/types";
import { NextResponse } from "next/server";
import { agentService } from "./agents.service";


export class AgentController {
    async getAgentById(req: Request): Promise <NextResponse<ApiResponse<any>>> {
        try{
            const {searchParams } = new URL(req.url)
            const idStr = searchParams.get('id')
            
                if (!idStr) {
                    return NextResponse.json({
                        success: false,
                           data: null,
                           error: 'ID is required'
                       }, { status: 400 });
                }
            const id = Number(idStr);
            if(isNaN(id)){
                return NextResponse.json({
                        success: false,
                        data: null,
                        error: 'Invalid ID format'
                       }, { status: 400 });
            }
            const agent = await agentService.getAgentById(Number(idStr))
            return NextResponse.json({
                success: true,
                data: agent
            })
        } catch (error: any) {
            return NextResponse.json({
                success:false,
                data: null,
                error: error.message
            }, {status: 500})
        }
    }
    async getAllAgents(req: Request): Promise <NextResponse<ApiResponse<any>>> {
        try{
            const agents = await agentService.getAllAgents()
            return NextResponse.json({
                success: true,
                data: agents
            })
        } catch (error: any) {
            return NextResponse.json({
                success:false,
                data: null,
                error: error.message
            }, {status: 500})
        }
    }
    async createAgent(req: Request): Promise <NextResponse<ApiResponse<any>>> {
        try{
            const body = await req.json();
            const { tenantId, regionId,hubId,status } = body;
            if (!tenantId) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Tenant ID is required'
                }, { status: 400 });
            }
            const agentData = {
                tenantId,
                regionId,
                hubId,
                status
            }    
            const agent = await agentService.createAgent(agentData)
            return NextResponse.json({
                success: true,
                data: agent
            })
        } catch (error: any) {
            return NextResponse.json({
                success:false,
                data: null,
                error: error.message
            }, {status: 500})
        }
    }
}
export const agentController = new AgentController();