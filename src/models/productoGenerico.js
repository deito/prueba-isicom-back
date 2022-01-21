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
                whereCondition = whereCondition + " UPPER(producto_generico.material) like '%'||UPPER($" +(i + 1) +"";
                queryParameters.push(parametros.material);
            }
            i = i + 1;
        }

        if (whereCondition !== "") {
            queryFinal = selectQuery + fromQuery + " where " + whereCondition;
        }

        queryFinal+=" ORDER BY producto_generico.material LIMIT $" + (i + 1) + " OFFSET $" + (i + 2);
        winston.info("queryFinal: " + queryFinal);

    } catch (error) {
        error.stack = "\nError en solicitudService.buscarPorFiltros, " + error.stack;
        throw error;
    }
}