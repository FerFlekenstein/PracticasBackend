const fs = require('fs');
const { builtinModules } = require('module');
class Contenedor {
    constructor(nombre) {
        this.nombre = nombre
        this.coleccion = []
    }
    async save(objeto) {
        try {
            //revisa si el archivo existe en la carpeta
            const carpeta = await fs.promises.readdir('./', 'utf-8')
            if (carpeta.includes(`${this.nombre}`)) {
                //lee y verifica si el archivo contiene informacion
                const hayInfo = await fs.promises.readFile(`./${this.nombre}`, 'utf-8')
                if (hayInfo) {
                    const infoParseada = JSON.parse(hayInfo)
                    this.coleccion = infoParseada
                    //agrega un id al objeto pasado por parametro
                    // obj.id = ( products.length === 0 ) ? 1 : products[products.length - 1].id + 1;
                    objeto.id = this.coleccion[this.coleccion.length - 1].id + 1
                } else {
                    objeto.id = 1
                }
            } else {
                objeto.id = 1
            }
            //agrega el objeto al array, lo guarda en el archivo y retorna el id otorgado
            this.coleccion.push(objeto)
            const colString = JSON.stringify(this.coleccion, null, 2)
            await fs.promises.writeFile(`./${this.nombre}`, colString)
            return objeto.id
        } catch (error) {
            console.log(error);
        }
    }
    async getById(numero) {
        try {
            //revisa si el archivo existe en la carpeta
            const carpeta = await fs.promises.readdir('./', 'utf-8')
            if (carpeta.includes(`${this.nombre}`)) {
                //lee y verifica si el archivo contiene informacion
                const hayInfo = await fs.promises.readFile(`./${this.nombre}`, 'utf-8')
                if (hayInfo) {
                    const infoParseada = JSON.parse(hayInfo)
                    const resultado = infoParseada.find((item) => numero === item.id)
                    return resultado
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
            //revisa si el archivo existe en la carpeta
            const carpeta = await fs.promises.readdir('./', 'utf-8')
            if (carpeta.includes(`${this.nombre}`)) {
                //lee y verifica si el archivo contiene informacion
                const hayInfo = await fs.promises.readFile(`./${this.nombre}`, 'utf-8')
                if (hayInfo) {
                    const infoParseada = JSON.parse(hayInfo)
                    //verifica si existe un item con un id igual al numero pasado por parametro
                    const hayItem = infoParseada.some((item) => numero === item.id)
                    if(hayItem){
                        //obtengo el id del item y lo elimino del array
                        const resultado = infoParseada.find((item) => numero === item.id)
                        const indice = infoParseada.indexOf(resultado)
                        infoParseada.splice(indice, 1)
                        this.coleccion = infoParseada
                        const colString = JSON.stringify(this.coleccion, null, 2)
                        await fs.promises.writeFile(`./${this.nombre}`, colString)
                    } else {
                        console.log("no existe un objeto con ese numero de id");
                        return null
                    }
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
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.nombre}`, "")
        } catch (error) {
            console.log(error);
        }
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