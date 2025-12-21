import { ApiResponse } from "@/app/types";
import { NextResponse } from "next/server";
import { deliveryService } from "./deliveries.service";

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
            const deliveries = await deliveryService.getAllDeliveries();
            return NextResponse.json({
                success: true,
                data: deliveries,
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
