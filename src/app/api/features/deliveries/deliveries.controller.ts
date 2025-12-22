import { ApiResponse } from "@/app/types";
import { NextResponse } from "next/server";
import { deliveryService, DeliveryFilters } from "./deliveries.service";
import { getPaginationParams } from "../../utils/pagination";

export class DeliveryController {
    async getDeliveryById(req: Request): Promise<NextResponse<ApiResponse<any>>> {
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

            const delivery = await deliveryService.getDeliveryById(id);
            return NextResponse.json({
                success: true,
                data: delivery,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async getAllDeliveries(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const { searchParams } = new URL(req.url);
            
            // Pagination
            const pagination = getPaginationParams(searchParams);
            
            // Filters
            const filters: DeliveryFilters = {
                startDate: searchParams.get('startDate') || undefined,
                endDate: searchParams.get('endDate') || undefined,
                regionId: searchParams.get('regionId') ? Number(searchParams.get('regionId')) : undefined,
                region: searchParams.get('region') || undefined,
                hubId: searchParams.get('hubId') ? Number(searchParams.get('hubId')) : undefined,
                hub: searchParams.get('hub') || undefined,
                status: searchParams.get('status') || undefined,
                slaBreached: (searchParams.get('slaBreached') === 'true' || searchParams.get('slaBreach') === 'true') ? true : 
                             (searchParams.get('slaBreached') === 'false' || searchParams.get('slaBreach') === 'false') ? false : undefined
            };

            const result = await deliveryService.getAllDeliveries(filters, pagination);
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

    async createDelivery(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { tenantId, regionId, hubId, agentId, status, deliveryTimeMinutes, slaBreached, deliveredAt } = body;

            if (!tenantId || !regionId || !hubId || !agentId) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'Required fields missing: tenantId, regionId, hubId, or agentId'
                }, { status: 400 });
            }

            const deliveryData = {
                tenantId: Number(tenantId),
                regionId: Number(regionId),
                hubId: Number(hubId),
                agentId: Number(agentId),
                status,
                deliveryTimeMinutes: Number(deliveryTimeMinutes),
                slaBreached,
                deliveredAt: new Date(deliveredAt)
            };

            const delivery = await deliveryService.createDelivery(deliveryData);
            return NextResponse.json({
                success: true,
                data: delivery,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async updateDelivery(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { id, ...updateData } = body;

            if (!id) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'ID is required'
                }, { status: 400 });
            }

            if (updateData.deliveredAt) {
                updateData.deliveredAt = new Date(updateData.deliveredAt);
            }

            const delivery = await deliveryService.updateDelivery(Number(id), updateData);
            return NextResponse.json({
                success: true,
                data: delivery,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }

    async deleteDelivery(req: Request): Promise<NextResponse<ApiResponse<any>>> {
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

            const delivery = await deliveryService.deleteDelivery(Number(idStr));
            return NextResponse.json({
                success: true,
                data: delivery,
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

export const deliveryController = new DeliveryController();
