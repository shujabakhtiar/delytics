import { NextResponse } from "next/server";
import { hubService } from "./hubs.service";
import { ApiResponse } from "@/app/types";

export class HubController {
    async createHub(req: Request): Promise <NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { name, tenantId, regionId, capacity } = body;
            if (!name) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Hub name is required',
                }, { status: 400 });
            }
            const hub = await hubService.createHub({tenantId, regionId, name, capacity});
            return NextResponse.json({
                success: true,
                data: hub,
            }, { status: 201 });
        } catch (error: any) {
            console.error('Error creating hub:', error);
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message,
            }, { status: 500 });
        }
    }
    async getHubById(req: Request): Promise <NextResponse<ApiResponse<any>>> {
        try {
            const { searchParams } = new URL(req.url);
            const idStr = searchParams.get('id');
            if (!idStr) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Hub id is required',
                }, { status: 400 });
            }
            const hub = await hubService.getHubById(Number(idStr));
            return NextResponse.json({
                success: true,
                data: hub,
            }, { status: 201 });
        } catch (error) {
            console.error('Error creating hub:', error);
            return NextResponse.json({
                success: false,
                data: null,
                error: 'Failed to create hub',
            }, { status: 500 });
        }
    }
    async getAllHubs(req: Request): Promise <NextResponse<ApiResponse<any>>> {
        try {
            const hub = await hubService.getHubs();
            return NextResponse.json({
                success: true,
                data: hub,
            });
        } catch (error: any) {
            console.error('Error getting hubs:', error);
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message,
            }, { status: 500 });
        }
    }
    async updateHub(req: Request): Promise <NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { name, id } = body;
            
            if (!name) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Name is required'
                }, { status: 400 });
            }
            const hub = await hubService.updateHub(id, name);
            return NextResponse.json({
                success: true,
                data: hub,
            }, { status: 201 });
        } catch (error) {
            console.error('Error creating hub:', error);
            return NextResponse.json({
                success: false,
                data: null,
                error: 'Failed to create hub',
            }, { status: 500 });
        }
    }
    async deleteHub(req: Request): Promise <NextResponse<ApiResponse<any>>> {
        try {
            const { searchParams } = new URL(req.url);
            const idStr = searchParams.get('id');
            if (!idStr) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Hub id is required',
                }, { status: 400 });
            }
            const hub = await hubService.deleteHub(Number(idStr));
            return NextResponse.json({
                success: true,
                data: hub,
            }, { status: 201 });
        } catch (error) {
            console.error('Error creating hub:', error);
            return NextResponse.json({
                success: false,
                data: null,
                error: 'Failed to create hub',
            }, { status: 500 });
        }
    }
}
export const hubController = new HubController();
