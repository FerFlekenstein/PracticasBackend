import ProductosDao from "./dao/mongo/productos.js"
import userService from "./dao/mongo/user.js";
const productosDAO = new ProductosDao();

const resolvers = {
    Query: {
        getProducts: async() => {
            const productos = await productosDAO.getAll()
            return productos
        },
        getUsers: async() => {
            const users = await userService.getAll()
            return users
        }
    }
}
export default resolvers