import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-me';

export class AuthService {
    async register(name: string, email: string, password: string, tenantId: number): Promise<any> {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
                role: 'user',
                tenantId,
                isActive: true
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                tenantId: true,
                isActive: true,
                createdAt: true
            }
        });

        return newUser;
    }

    async login(email: string, password: string): Promise<{ user: any; token: string }> {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, tenantId: user.tenantId },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        const { passwordHash, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }

    async validateUser(token: string): Promise<any | null> {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            const user = await prisma.user.findUnique({
                where: { id: decoded.id }
            });
            return user || null;
        } catch (error) {
            return null;
        }
    }

    async getUserWithRegions(token: string): Promise<any> {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            const user = await prisma.user.findUnique({
                where: { id: decoded.id },
                include: {
                    userRegions: {
                        include: {
                            region: true
                        }
                    },
                    tenant: true
                }
            });

            if (!user) {
                throw new Error('User not found');
            }

            const { passwordHash, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    async resetPassword(email: string, newPassword: string): Promise<any> {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                passwordHash: hashedPassword
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        });

        return updatedUser;
    }
}

export const authService = new AuthService();
