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

model.buscarAll = async (conn, parametros) => {
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

        queryFinal+=" ORDER BY producto_generico.id_producto_generico";
        winston.info("queryFinal: " + queryFinal);
        
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

model.buscarUnidadMedida = async (conn, parametros) => {
    try {
        const queryResponse = await conn.query("SELECT material_unimed FROM dino.mp_material_comercial WHERE codigomateriallocal=$1", [parametros.codigo_material]);
        return queryResponse;
    } catch (error) {
        error.stack = "\nError en models.productoGenerico.buscarUnidadMedida, " + error.stack;
        throw error;
    }
}

model.crear = async (conn, parametros) => {
    try {
        const queryResponse = await conn.query(`INSERT INTO dino.tproducto_generico (codigo_sociedad, cod_linea, linea, cod_sublinea, sublinea, codigo_material, material, creado_por, fecha_creacion, unimed, estado) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, NOW(),$9, $10) RETURNING id_producto_generico`, 
        [parametros.codigo_sociedad, parametros.cod_linea, parametros.linea, parametros.cod_sublinea, parametros.sublinea, parametros.codigo_material, parametros.material, parametros.creado_por, parametros.unimed, parametros.estado]);
        return queryResponse;
    } catch (error) {
        error.stack = "\nError en models.productoGenerico.crear, " + error.stack;
        throw error;
    }
}

model.actualizar = async (conn, parametros) => {
    try {
        const queryResponse = await conn.query(`UPDATE dino.tproducto_generico SET codigo_sociedad=$1, cod_linea=$2, linea=$3, cod_sublinea=$4, sublinea=$5, codigo_material=$6, material=$7, unimed=$8, estado=$9 WHERE id_producto_generico=$10`,
        [parametros.codigo_sociedad, parametros.cod_linea, parametros.linea, parametros.cod_sublinea, parametros.sublinea, parametros.codigo_material, parametros.material, parametros.unimed, parametros.estado, parametros.id_producto_generico]);
        return queryResponse;
    } catch (error) {
        error.stack = "\nError en models.productoGenerico.actualizar, " + error.stack;
        throw error;
    }
}

module.exports = model;