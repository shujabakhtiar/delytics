import { NextResponse } from 'next/server';
import { ApiResponse } from '@/app/types';
import { tenantService } from './tenants.service';

export class TenantController {
    
    async getTenant(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');

            if (!id) {
                return NextResponse.json({
                    success: false,
                    data: null,
                    error: 'ID is required'
                }, { status: 400 });
            }

            const tenant = await tenantService.getTenants(id);
            
            return NextResponse.json({
                success: true,
                data: tenant,
            });

        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message
            }, { status: 500 });
        }
    }
    async getAllTenant(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const tenants = await tenantService.getAllTenants();
            return NextResponse.json({
                success: true,
                data: tenants,
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: 'Something went wrong'
            }, { status: 500 });
        }
    }
    async createTenant(req: Request): Promise<NextResponse<ApiResponse<any>>> {
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

            const tenant = await tenantService.createTenant(name);
            return NextResponse.json({
                success: true,
                data: tenant,
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

export const tenantController = new TenantController();