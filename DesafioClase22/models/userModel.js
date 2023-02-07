import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    id: {type: String},
    nombre: { type: String },
    apellido: { type: String },
    edad: {type: Number},
    alias: { type: String },
    avatar: { type: String }

})
const userModel = mongoose.model('Usuarios', userSchema);
export default userModel;