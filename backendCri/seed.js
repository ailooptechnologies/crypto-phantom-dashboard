import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { username: 'admin' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcryptjs.hash('admin', 10);
    const admin = await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('Admin user created successfully:', admin.username);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();