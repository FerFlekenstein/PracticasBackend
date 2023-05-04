const typeDefs = `#graphql
type Products {
    _id: ID,
    stock: Float,
    title: String,
    thumbnail: String,
    price: Float,
}
type User {
    _id: ID,
    nombre: String,
    apellido: String,
    avatar: String,
    email: String,
    password: String
}
type Query {
    getProducts: [Products]
    getUsers: [User]
}
`
export default typeDefs