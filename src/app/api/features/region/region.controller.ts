import { ApiResponse } from "@/app/types";
import { NextResponse } from "next/server";
import { RegionService, regionService } from "./region.service";


export class RegionController {
    async getRegion(req: Request): Promise <NextResponse<ApiResponse<any>>> {
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
       
                const region = await regionService.getRegionById(id);
                return NextResponse.json({
                       success: true,
                       data: region,
                });
       
               } catch (error: any) {
                   return NextResponse.json({
                       success: false,
                       data: null,
                       error: error.message
                   }, { status: 500 });
               }
    }

    async getAllRegions(req: Request): Promise <NextResponse<ApiResponse<any>>> {
        try {
            const regions = await regionService.getRegions();
            return NextResponse.json({
                success: true,
                data: regions,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async createRegion(req: Request): Promise <NextResponse<ApiResponse<any>>> {
         try {
                    const body = await req.json();
                    const { tenantId, name, timezone } = body;
                    
                    if (!name) {
                        return NextResponse.json({
                            success: false,
                            data: null,
                            error: 'Name is required'
                        }, { status: 400 });
                    }
                    const regionData = {
                        name,
                        tenantId,
                        timezone
                    }
                    const region = await regionService.createRegion(regionData);
                    return NextResponse.json({
                        success: true,
                        data: region,
                    });
                } catch (error: any) {
                    return NextResponse.json({
                        success: false,
                        data: null,
                        error: error.message
                    }, { status: 500 });
                }
    }

    async updateRegion(req: Request): Promise <NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { name } = body;
            
            if (!name) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Name is required'
                }, { status: 400 });
            }
    
            const region = await regionService.updateRegion(name);
            return NextResponse.json({
                success: true,
                data: region,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async deleteRegion(req: Request): Promise <NextResponse<ApiResponse<any>>> {
        try {
           const { searchParams } = new URL(req.url);
            const idStr = searchParams.get('id');
            if (!idStr) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Region id is required',
                }, { status: 400 });
            }
            const region = await regionService.deleteRegion(Number(idStr));
            return NextResponse.json({
                success: true,
                data: region,
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

export const regionController = new RegionController();