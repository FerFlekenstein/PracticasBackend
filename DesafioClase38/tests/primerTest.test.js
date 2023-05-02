import mongoose from "mongoose";
import userService from "../src/dao/mongo/user.js"
import {strict as assert} from 'assert';
import config from "../src/config/config.js"
const connection = mongoose.connect(config.mongo.URL);
describe('Test del DAO de usuarios',()=>{
    describe("Prueba sobre la consulta a la base de datos",()=>{
        before(async function(){
            //Se puede borrar la base de datos (de prueba)
        });
        it('Al insertar un usuario el DAO debe devolver el _id del mismo.', async function(){
            const user = {
                nombre: "test",
                apellido: "1",
                email: "a@ar.com",
                password: "123",
                avatar: "algo.jpg"
            }
            const result = userService.save(user)
            assert.ok(result._id);
        });
    });
});