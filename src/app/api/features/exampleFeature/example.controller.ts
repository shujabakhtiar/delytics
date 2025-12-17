import { NextResponse } from 'next/server';
import { exampleService } from './example.service';
import { ApiResponse } from '@/app/types';

export class ExampleController {
    
    async getMessage(req: Request): Promise<NextResponse<ApiResponse<string>>> {
        try {
            const message = exampleService.getHappyMessage();
            
            return NextResponse.json({
                success: true,
                data: message,
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

export const exampleController = new ExampleController();
