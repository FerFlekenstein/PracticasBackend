import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {faker} from "@faker-js/faker";
export const generateProd = () => {
    const producto = {
        title: faker.commerce.productName(),
        price: faker.commerce.price(50, 1000),
        thumbnail: faker.image.imageUrl(),
        stock: faker.random.numeric(2),
        id: faker.database.mongodbObjectId()
    }
    return producto;
}
export const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

