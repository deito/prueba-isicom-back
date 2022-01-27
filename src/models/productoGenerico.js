const winston = require('../utils/winston');
const model = {};

model.buscar = async (conn, parametros) => {
    try {
        let queryFinal;
        let selectQuery = "select *";
        let fromQuery = " from dino.tproducto_generico producto_generico";
        let whereCondition = "";
        let queryParameters = [];
        let parameterNames = [];

        if(parametros.cod_linea){
            parameterNames.push("cod_linea");
        }
        if(parametros.cod_sublinea){
            parameterNames.push("cod_sublinea");
        }
        if(parametros.material){
            parameterNames.push("material");
        }

        let i = 0;
        for(; i < parameterNames.length;){
            if(i > 0){
                whereCondition = whereCondition + " AND"
            }
            if(parameterNames[i] === "cod_linea"){
                whereCondition = whereCondition + " producto_generico.cod_linea=$" +(i + 1);
                queryParameters.push(parametros.cod_linea);
            }
            if(parameterNames[i] === "cod_sublinea"){
                whereCondition = whereCondition + " producto_generico.cod_sublinea=$" +(i + 1);
                queryParameters.push(parametros.cod_sublinea);
            }
            if(parameterNames[i] === "material"){
                whereCondition = whereCondition + " UPPER(producto_generico.material) like '%'||UPPER($" +(i + 1) +")||'%'";
                queryParameters.push(parametros.material);
            }
            i = i + 1;
        }

        queryFinal = selectQuery + fromQuery;

        if (whereCondition !== "") {
            queryFinal+= " where " + whereCondition;
        }

        queryFinal+=" ORDER BY producto_generico.id_producto_generico LIMIT $" + (i + 1) + " OFFSET $" + (i + 2);
        winston.info("queryFinal: " + queryFinal);
        queryParameters.push(parametros.cantidad_filas);// LIMIT
        let offset = parametros.cantidad_filas * (parametros.pagina - 1);
        queryParameters.push(offset);// OFFSET
        winston.info("queryParameters: ", queryParameters);
        const queryResponse = await conn.query(queryFinal, queryParameters);
        return queryResponse;
    } catch (error) {
        error.stack = "\nError en models.productoGenerico.buscar, " + error.stack;
        throw error;
    }
}

model.contarTotalFilasDeBuscar = async (conn, parametros) => {
    try {
        let queryFinal;
        let selectQuery = "select COUNT(*) as cantidad";
        let fromQuery = " from dino.tproducto_generico producto_generico";
        let whereCondition = "";
        let queryParameters = [];
        let parameterNames = [];

        if(parametros.cod_linea){
            parameterNames.push("cod_linea");
        }
        if(parametros.cod_sublinea){
            parameterNames.push("cod_sublinea");
        }
        if(parametros.material){
            parameterNames.push("material");
        }

        let i = 0;
        for(; i < parameterNames.length;){
            if(i > 0){
                whereCondition = whereCondition + " AND"
            }
            if(parameterNames[i] === "cod_linea"){
                whereCondition = whereCondition + " producto_generico.cod_linea=$" +(i + 1);
                queryParameters.push(parametros.cod_linea);
            }
            if(parameterNames[i] === "cod_sublinea"){
                whereCondition = whereCondition + " producto_generico.cod_sublinea=$" +(i + 1);
                queryParameters.push(parametros.cod_sublinea);
            }
            if(parameterNames[i] === "material"){
                whereCondition = whereCondition + " UPPER(producto_generico.material) like '%'||UPPER($" +(i + 1) +")||'%'";
                queryParameters.push(parametros.material);
            }
            i = i + 1;
        }

        queryFinal = selectQuery + fromQuery;

        if (whereCondition !== "") {
            queryFinal+= " where " + whereCondition;
        }

        winston.info("queryParameters: ", queryParameters);
        const queryResponse = await conn.query(queryFinal, queryParameters);
        return queryResponse;
    } catch (error) {
        error.stack = "\nError en models.productoGenerico.buscar, " + error.stack;
        throw error;
    }
}

model.actualizarEstado = async (conn, parametros) => {
    try {
        const queryResponse = await conn.query("UPDATE dino.tproducto_generico SET estado=$1 WHERE id_producto_generico=$2", [parametros.estado, parametros.id_producto_generico]);
        return queryResponse;
    } catch (error) {
        error.stack = "\nError en models.productoGenerico.actualizarEstado, " + error.stack;
        throw error;
    }
}

model.crear = async (conn, parametros) => {
    try {
        const queryResponse = await conn.query("INSERT INTO dino.tproducto_generico (");
    } catch (error) {
        
    }
}

module.exports = model;