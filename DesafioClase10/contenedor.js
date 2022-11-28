const fs = require('fs');
class Contenedor {
    constructor(nombre) {
        this.nombre = nombre
    }
    async save(objeto) {
        try {
            const info = await this.getAll();
            objeto.id = ( info.length === 0 ) ? 1 : info[info.length - 1].id + 1;
            info.push(objeto)
            const infoJson = JSON.stringify(info, null, 2)
            await fs.promises.writeFile(`./${this.nombre}`, infoJson)
            return objeto.id
        } catch (error) {
            console.log(error);
        }
    }
    async getById(numero) {
        try {
            const info = await this.getAll();
            const resultado = info.find((item) => numero === item.id)
            return resultado
        } catch (error) {
            console.log(error);
        }
    }
    async getAll() {
        try {
            //revisa si el archivo existe en la carpeta
            const carpeta = await fs.promises.readdir('./', 'utf-8')
            if (carpeta.includes(`${this.nombre}`)) {
                //lee y verifica si el archivo contiene informacion
                const hayInfo = await fs.promises.readFile(`./${this.nombre}`, 'utf-8')
                if (hayInfo) {
                    const infoParseada = JSON.parse(hayInfo)
                    return infoParseada
                } else {
                    return null
                }
            } else {
                return null
            }
        } catch (error) {
           console.log(error); 
        }
    }
    async deleteById(numero) {
        try {
            const info = await this.getAll();
            //verifica si existe un item con un id igual al numero pasado por parametro
            const hayItem = info.some((item) => numero === item.id)
            if(hayItem){
                //obtengo el id del item y lo elimino del array
                const resultado = info.find((item) => numero === item.id)
                const indice = info.indexOf(resultado)
                info.splice(indice, 1)
                const infoJson = JSON.stringify(info, null, 2)
                await fs.promises.writeFile(`./${this.nombre}`, infoJson)
                return true
            } else {
                console.log("no existe un objeto con ese numero de id");
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.nombre}`, "")
        } catch (error) {
            console.log(error);
        }
    }
    async update(obj) {
        const todos = await this.getAll();
         todos.map((item) => {
            if(item.id == obj.id){
                item.title = obj.title,
                item.price = obj.price,
                item.thumbnail = obj.thumbnail
            }
        })
        const todosActualizado = JSON.stringify(todos, null, 2)
        await fs.promises.writeFile(`./${this.nombre}`, todosActualizado)
    }
}

//instaciacion de "productos"
const productos = new Contenedor("productos.txt")


//objetos de ejemplo
const obj = {
    title: "SSD 1TB KINGSTON SNVS NV1 M.2 NVME",
    price: 18600,
    thumbnail: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/hd-ssd-1tb-kingston-snvs-nv1-m2-nvme-0.jpg"
}
const obj2 = {
    title: "MONITOR 27' PHILIPS CURVO 271E1SCA/55",
    price: 60290,
    thumbnail: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/monitor-27-philips-curvo-271e1sca55-0.jpg"
}
const obj3 = {
    title: "TECLADO HP HYPERX ALLOY ORIGINS 65 MECANICO 4P5D6AA",
    price: 13990,
    thumbnail: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/teclado-hp-hyperx-alloy-origins-65-mecanico-4p5d6aa-0.jpg"
}
module.exports = { productos }