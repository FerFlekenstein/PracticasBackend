class Usuario{
    constructor(nombre = "", apellido = ""){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    getFullName(){
        return `El nombre completo es ${this.nombre} ${this.apellido}`
    }
    addMascota(petName){
        this.mascotas.push(petName)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor})
    }
    getBookNames(){
        return this.libros.map((obj) => obj.nombre)
    }
}
const primerUser = new Usuario("Elon", "Musk");


