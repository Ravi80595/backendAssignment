const mongoose = require('mongoose');
const User = require('./src/modules/users/user.model');

const MONGO_URI = "mongodb+srv://root:root@cluster0.fc8vexn.mongodb.net/autoparts_db?retryWrites=true&w=majority";

const seedUsers = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('🔌 DB Connected!');

    console.log('🧹 Clearing old data...');
    await User.deleteMany({});

    const users = [
      {
        email: 'admin@company.com',
        password: 'adminpassword123',
        role: 'Admin'
      },
      {
        email: 'staff@company.com',
        password: 'staffpassword123',
        role: 'Staff'
      },
      {
        email: 'supplier@vendor.com',
        password: 'vendorpassword',    
        role: 'Staff'
      }
    ];

    console.log('🌱 Inserting new users...');
    await User.insertMany(users);
    
    console.log('✅ SUCCESS: Users Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedUsers();