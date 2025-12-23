import { ApiResponse } from "@/app/types";
import { NextResponse } from "next/server";
import { RegionService, regionService, RegionFilters } from "./region.service";
import { getPaginationParams } from "../../utils/pagination";


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
            const { searchParams } = new URL(req.url);
            const pagination = getPaginationParams(searchParams);
            
            const filters: RegionFilters = {
                name: searchParams.get('name') || undefined,
                tenantId: searchParams.get('tenantId') ? Number(searchParams.get('tenantId')) : undefined,
            };

            const result = await regionService.getRegions(filters, pagination);
            return NextResponse.json({
                success: true,
                data: result,
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