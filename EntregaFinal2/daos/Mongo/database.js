import mongoose from "mongoose";
import { stringConn } from "../stringConnect";
class Database{
    async conn(){
        mongoose.connect(stringConn,{serverSelectionTimeoutMS: 5000}, (error) => {
            if(error) console.log(error);
            else console.log("Conectado a MongoDB Atlas");
        })
    }
    async disconn(){
        await mongoose.disconnect();
        console.log("MongoDB Atlas desconectado");
    }
}
export default Database;