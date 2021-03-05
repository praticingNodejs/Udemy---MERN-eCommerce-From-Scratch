import './src/env.js';
import './src/mongoose.js';

import chalk from 'chalk';

import { logger } from './src/utils/logger.js';

import { User } from './src/models/user.model.js';
import { Product } from './src/models/product.model.js';
import { Order } from './src/models/order.model.js';

import users from './src/data/users.data.js';
import products from './src/data/products.data.js';

const importData = async () => {
    try {
        // clear all database
        await User.deleteMany();
        await Order.deleteMany();
        await Product.deleteMany();

        // insert user first
        const createdUser = await User.create(users);

        // get admin id
        const adminUser = createdUser.find(({ isAdmin }) => isAdmin)._id;
        logger.info(`AdminId: ${adminUser}`);

        const sampleProducts = products.map(product => ({ ...product, user: adminUser }))
        await Product.create(sampleProducts);

        logger.success('Data imported');
        process.exit()
    } catch (err) {
        logger.fail(err);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // clear all database
        await User.deleteMany();
        await Order.deleteMany();
        await Product.deleteMany();

        logger.success('Data destroyed', 'redBright');
        process.exit();
    } catch (err) {
        logger.fail(err);
        process.exit(1);
    }
};

// process
process.argv[2] === '-d' ? destroyData() : importData();
