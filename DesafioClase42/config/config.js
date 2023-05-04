import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
export default {
    mongo: {
        URL: process.env.mongoURL
    }
}