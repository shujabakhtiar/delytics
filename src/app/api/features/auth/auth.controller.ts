import { NextResponse } from 'next/server';
import { authService } from './auth.service';
import { ApiResponse } from '@/app/types';

export class AuthController {
    
    async register(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { name, email, password, tenantId } = body;

            if (!name || !email || !password || !tenantId) {
                return NextResponse.json({ success: false, data: null, error: 'Missing fields (name, email, password, tenantId)' }, { status: 400 });
            }

            const user = await authService.register(name, email, password, Number(tenantId));

            return NextResponse.json({
                success: true,
                data: { user },
            }, { status: 201 });

        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message || 'Registration failed'
            }, { status: 400 });
        }
    }

    async login(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { email, password } = body;

            if (!email || !password) {
                 return NextResponse.json({ success: false, data: null, error: 'Missing fields' }, { status: 400 });
            }

            const { user, token } = await authService.login(email, password);
            
            return NextResponse.json({
                success: true,
                data: { user, token }
            });

        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message || 'Login failed'
            }, { status: 401 });
        }
    }

    async me(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const authHeader = req.headers.get('Authorization');
            if (!authHeader) {
                return NextResponse.json({ success: false, data: null, error: 'Authorization required' }, { status: 401 });
            }
            const token = authHeader.split(' ')[1];
            const userData = await authService.getUserWithRegions(token);

            return NextResponse.json({
                success: true,
                data: userData
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message || 'Failed to fetch user data'
            }, { status: 401 });
        }
    }

    async logout(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        return NextResponse.json({
            success: true,
            data: { message: 'Logged out successfully' }
        });
    }
}

export const authController = new AuthController();
