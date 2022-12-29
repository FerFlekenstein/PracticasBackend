import knexLib from 'knex';
class ClienteSQL{
    constructor(config, tabla){
        this.knex = knexLib(config),
        this.tabla = tabla
    }
    crearTabla(cb) {
        try {
            return this.knex.schema.dropTableIfExists(this.tabla)
            .finally(() => {
                return this.knex.schema.createTable(this.tabla, (table) => {
                    cb(table)
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
    save(contenido) {
        return this.knex(this.tabla).insert(contenido);
    }
    getAll() {
        return this.knex(this.tabla).select("*")
    }
    borrarArticuloPorId(id) {
        return this.knex.from(this.tabla).where("id", id).del();
    }
    actualizarStockPorId(stock, id) {
        return this.knex.from(this.tabla).where("id", id).update({ stock: stock });
    }
    close() {
        this.knex.destroy();
    }
}
export default ClienteSQL;