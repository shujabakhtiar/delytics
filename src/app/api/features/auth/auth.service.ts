import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/app/types'; // Assuming User type exists, we might need to extend it for Auth
import { cookies } from 'next/headers';

// Mock database for demonstration
const users: User[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-me';

export class AuthService {
    async register(name: string, email: string, password: string): Promise<User> {
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            role: 'user', // Default role
            // In a real DB, you'd store the password hash
        };

        // Simulate DB save
        // @ts-ignore - In a real app we would have a full user model with password
        users.push({ ...newUser, password: hashedPassword });

        return newUser;
    }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        // @ts-ignore
        const user = users.find(u => u.email === email);
        
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // @ts-ignore
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return { user, token };
    }

    async validateUser(token: string): Promise<User | null> {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            const user = users.find(u => u.id === decoded.id);
            return user || null;
        } catch (error) {
            return null;
        }
    }
}

export const authService = new AuthService();
