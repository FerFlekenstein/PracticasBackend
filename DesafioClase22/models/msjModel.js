import mongoose from "mongoose";
const msjSchema = new mongoose.Schema({
    author: { type: Object },
    date: { type: String },
    text: { type: String }
})
const msjModel = mongoose.model('Mensajes', msjSchema);
export default msjModel;