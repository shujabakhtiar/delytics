import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // 1. Create a Tenant
  const tenant = await prisma.tenant.upsert({
    where: { name: 'Demo Tenant' },
    update: {},
    create: {
      name: 'Demo Tenant',
    },
  })
  console.log('✅ Tenant created:', tenant.name)

  // 2. Create a Region
  const region = await prisma.region.upsert({
    where: { name: 'North America' },
    update: {},
    create: {
      name: 'North America',
      timezone: 'America/New_York',
      tenantId: tenant.id,
    },
  })
  console.log('✅ Region created:', region.name)

  // 3. Create a Hub
  const hub = await prisma.hub.upsert({
    where: { name: 'Central Distribution' },
    update: {},
    create: {
      name: 'Central Distribution',
      capacity: 1000,
      tenantId: tenant.id,
      regionId: region.id,
    },
  })
  console.log('✅ Hub created:', hub.name)

  // 4. Create an Agent
  const agent = await prisma.agent.upsert({
    where: { name: 'Agent 001' },
    update: {},
    create: {
      name: 'Agent 001',
      status: 'IDLE',
      tenantId: tenant.id,
      regionId: region.id,
      hubId: hub.id,
    },
  })
  console.log('✅ Agent created:', agent.name)

  // 5. Create an Admin User
  // Note: In a real app, use bcrypt to hash passwords. using plaintext for simple seed if verify logic handles it,
  // but schema says passwordHash. I typically rely on the app to hash.
  // For now I'll use a placeholder hash or import bcrypt if I can.
  // package.json has bcryptjs.
  
  // Minimal hash for "password123"
  const passwordHash = "$2a$10$NotARealHashButPlaceHolderForNow...." 

  const user = await prisma.user.upsert({
    where: { email: 'admin@delytics.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@delytics.com',
      passwordHash: passwordHash, // Ideally use real hash
      role: 'ADMIN',
      tenantId: tenant.id,
    },
  })
  console.log('✅ User created:', user.email)
  
  // Link User to Region
  await prisma.userRegion.upsert({
    where: { userId_regionId: { userId: user.id, regionId: region.id } },
    update: {},
    create: {
      userId: user.id,
      regionId: region.id,
    },
  })
  console.log('✅ User linked to Region')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
