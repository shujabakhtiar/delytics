import { NextResponse } from 'next/server';
import { authService } from './auth.service';
import { ApiResponse } from '@/app/types';

export class AuthController {
    
    async register(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        try {
            const body = await req.json();
            const { name, email, password } = body;

            if (!name || !email || !password) {
                return NextResponse.json({ success: false, data: null, error: 'Missing fields' }, { status: 400 });
            }

            const user = await authService.register(name, email, password);

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
            
            const response = NextResponse.json({
                success: true,
                data: { user, token }
            });

            // Set secure cookie
            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 86400 // 1 day
            });

            return response;

        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                error: error.message || 'Login failed'
            }, { status: 401 });
        }
    }

    async logout(req: Request): Promise<NextResponse<ApiResponse<any>>> {
        const response = NextResponse.json({
            success: true,
            data: { message: 'Logged out successfully' }
        });
        
        response.cookies.delete('token');
        return response;
    }
}

export const authController = new AuthController();
