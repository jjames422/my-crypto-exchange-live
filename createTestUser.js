const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createTestUser = async () => {
  const username = 'testuser';
  const password = 'testpassword';
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    console.log('Test user created:', user);
  } catch (err) {
    console.error('Error creating test user:', err);
  } finally {
    await prisma.$disconnect();
  }
};

createTestUser();
