#!/bin/bash

echo "🚀 Starting Delytics Database Setup..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Start Docker Compose
echo ""
echo "🐳 Starting PostgreSQL database..."
docker-compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

# Check if database is healthy
if docker-compose ps | grep -q "healthy"; then
    echo "✅ Database is running and healthy!"
else
    echo "⚠️  Database is starting... (this may take a moment)"
fi

# Run Prisma migrations
echo ""
echo "🔄 Running database migrations..."
npx prisma migrate dev --name init

echo ""
echo "✅ Database setup complete!"
echo ""
echo "📊 You can now:"
echo "   - View your database: npx prisma studio"
echo "   - Test API: curl http://localhost:3000/api/users"
echo "   - Stop database: docker-compose down"
echo ""
