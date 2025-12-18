import { NextResponse } from 'next/server';
import { ApiResponse } from '@/app/types';
import { tenantService } from './tenants.service';

export class TenantController {
    
    async getTenant(req: Request): Promise<NextResponse<ApiResponse<string>>> {
        try {
            const tenant = tenantService.getTenants();
            
            return NextResponse.json({
                success: true,
                data: tenant,
            });

        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: '',
                error: 'Something went wrong'
            }, { status: 500 });
        }
    }
}

export const tenantController = new TenantController();