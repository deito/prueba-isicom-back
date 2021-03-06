const winston = require('../utils/winston');
const config = require('../config');
const fetch = require('node-fetch');
const postgresConn = require('../utils/postgres');
const productoGenericoModel = require('../models/productoGenerico');

const controller = {};

controller.listarLinea = async (req, res) => {
    winston.info(`=-=-=-=-=-=> Inicio: listarLinea`);
    try {
        const response = {
            resultado: 0,
            mensaje: "Error inesperado controllers.productoGenerico.listarLinea"
        };
        winston.info("Entro al try controller.productoGenerico.listarLinea");
        //const form = new FormData();
        //form.append('','');

        let bodyObj = {
            condicion: "linea_sap!='7000' and linea_sap!='0000' order by (linea_des+'|'+linea_sap)",
            columna: "distinct (linea_des+'|'+linea_sap) as datos"
        }

        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': config.token_isicom
            },
            body: JSON.stringify(bodyObj),
            cache: 'no-cache'
        }
        const datosIntegrador = await fetch("https://integracion.cpsaa.com.pe/organizacion/vista_material", request);
        const datosIntegradorObj = await datosIntegrador.json();
        winston.info("datosIntegradorObj.length:", datosIntegradorObj.length);
        response.datos = datosIntegradorObj;

        response.resultado = 1;
        response.mensaje = "";
        res.status(200).json(response);
    } catch (error) {
        winston.error("Error en controllers.productoGenerico.listarLinea: ", error);
        res.status(200).send({
            codigo: 0,
            mensaje: error.message
        });
    } finally {
        winston.info(`=-=-=-=-=-=> Fin: controllers.productoGenerico.listarLinea`);
    }
}

controller.listarSubLinea = async (req, res) => {
    winston.info(`=-=-=-=-=-=> Inicio: controllers.productoGenerico.listarSubLinea`);
    try {
        const response = {
            resultado: 0,
            mensaje: "Error inesperado controllers.productoGenerico.listarSubLinea"
        };
        winston.info("Entro al try controller.productoGenerico.listarSubLinea");
        let { cod_linea }= req.query;
        winston.info("cod_linea:", cod_linea);
        let bodyObj = {
            condicion: `linea_sap='${cod_linea}' order by (sublinea_des+'|'+sublinea_sap)`,
            columna: "distinct (sublinea_des+'|'+sublinea_sap) as datos"
        }

        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': config.token_isicom
            },
            body: JSON.stringify(bodyObj),
            cache: 'no-cache'
        }

        const datosIntegrador = await fetch("https://integracion.cpsaa.com.pe/organizacion/vista_material", request);
        const datosIntegradorObj = await datosIntegrador.json();
        winston.info("datosIntegradorObj.length:", datosIntegradorObj.length);
        response.datos = datosIntegradorObj;

        response.resultado = 1;
        response.mensaje = "";
        res.status(200).json(response);
    } catch (error) {
        winston.error("Error en controllers.productoGenerico.listarSubLinea: ", error);
        res.status(200).send({
            codigo: 0,
            mensaje: error.message
        });
    } finally {
        winston.info(`=-=-=-=-=-=> Fin: controllers.productoGenerico.listarSubLinea`);
    }
}

controller.buscar = async (req, res) => {
    winston.info(`=-=-=-=-=-=> Inicio: controllers.productoGenerico.buscar`);
    try {
        const response = {
            resultado: 0,
            mensaje: "Error inesperado controllers.productoGenerico.listarLinea"
        };

        let { cod_linea, cod_sublinea, material, cantidad_filas, pagina } = req.body;

        if( !(parseInt(cantidad_filas) && parseInt(cantidad_filas)> 0) ){
            response.mensaje = "El campo cantidad_filas no tiene un valor v??lido. Tipo de dato: '"+(typeof cantidad_filas)+"', valor = "+cantidad_filas;
            winston.info("response: ", response);
            res.status(200).json(response);
            return;
        }

        if( !(parseInt(pagina) && parseInt(pagina)> 0) ){
            response.mensaje = "El campo pagina no tiene un valor v??lido. Tipo de dato: '"+(typeof pagina)+"', valor = "+pagina;
            winston.info("response: ", response);
            res.status(200).json(response);
            return;
        }

        const busquedaRes = await productoGenericoModel.buscar(postgresConn, req.body);
        winston.info("busquedaRes.rows.length: ", busquedaRes.rows.length);

        const contarTotalFilasDeBuscarRes = await productoGenericoModel.contarTotalFilasDeBuscar(postgresConn, req.body);
        winston.info("contarTotalFilasDeBuscarRes.rows:", contarTotalFilasDeBuscarRes.rows);

        response.resultado = 1;
        response.mensaje = "";
        response.datos = {
            total_filas: contarTotalFilasDeBuscarRes.rows[0].cantidad,
            lista: busquedaRes.rows            
        };
        res.status(200).json(response);
    } catch (error) {
        winston.error("Error en controllers.productoGenerico.buscar: ", error);
        res.status(200).send({
            codigo: 0,
            mensaje: error.message
        });
    } finally {
        winston.info(`=-=-=-=-=-=> Fin: controllers.productoGenerico.buscar`);
    }
}

controller.buscarAll = async (req, res) => {
    winston.info(`=-=-=-=-=-=> Inicio: controllers.productoGenerico.buscarAll`);
    try {
        const response = {
            resultado: 0,
            mensaje: "Error inesperado controllers.productoGenerico.listarLinea"
        };

        let { cod_linea, cod_sublinea, material } = req.body;

        const busquedaRes = await productoGenericoModel.buscarAll(postgresConn, req.body);
        response.resultado = 1;
        response.mensaje = "";
        response.datos = {
            lista: busquedaRes.rows
        };
        res.status(200).json(response);
    } catch (error) {
        winston.error("Error en controllers.productoGenerico.buscarAll: ", error);
        res.status(200).send({
            codigo: 0,
            mensaje: error.message
        }); 
    } finally {
        winston.info(`=-=-=-=-=-=> Fin: controllers.productoGenerico.buscarAll`);
    }
}

controller.actualizarEstado = async (req, res) => {
    winston.info(`=-=-=-=-=-=> Inicio: controllers.productoGenerico.actualizarEstado`);
    try {
        const response = {
            resultado: 0,
            mensaje: "Error inesperado controllers.productoGenerico.listarLinea"
        };

        let { id_producto_generico } = req.params;
        let { estado } = req.body;
        winston.info("req.params:", req.params);
        winston.info("req.body:", req.body);
        if( !(parseInt(id_producto_generico) && parseInt(id_producto_generico) > 0) ){
            response.mensaje = "El campo id_producto_generico no tiene un valor v??lido. Tipo de dato: '"+(typeof id_producto_generico)+"', valor = "+id_producto_generico;
            winston.info("response: ", response);
            res.status(200).json(response);
            return;
        }
        if( !(estado === 'ACTIVO' || estado === 'INACTIVO') ){
            response.mensaje = "El campo estado no tiene un valor v??lido. Tipo de dato: '"+(typeof estado)+"', valor = "+estado;
            winston.info("response: ", response);
            res.status(200).json(response);
            return;
        }

        let parametros = {
            id_producto_generico: parseInt(id_producto_generico),
            estado: estado
        }
        const actualizarEstadoRes = await productoGenericoModel.actualizarEstado(postgresConn, parametros);
        //winston.info("actualizarEstadoRes:", actualizarEstadoRes);
        if( !(actualizarEstadoRes && actualizarEstadoRes.rowCount === 1) ){
            throw new Error(`Error en respuesta de productoGenericoModel.actualizarEstado, actualizarEstadoRes.rowCount: ${ actualizarEstadoRes.rowCount }`);
        }

        response.resultado = 1;
        response.mensaje = "";
        res.status(200).json(response);

    } catch (error) {
        winston.error("Error en controllers.productoGenerico.buscar: ", error);
        res.status(200).send({
            codigo: 0,
            mensaje: error.message
        });
    } finally {
        winston.info(`=-=-=-=-=-=> Fin: controllers.productoGenerico.actualizarEstado`);
    }
}

controller.buscarMaterial = async (req, res) => {
    winston.info(`=-=-=-=-=-=> Inicio: controllers.productoGenerico.buscarMaterial`);
    try {
        const response = {
            resultado: 0,
            mensaje: "Error inesperado controllers.productoGenerico.buscarMaterial"
        };
        let { material_sociedad, cod_linea, cod_sublinea, material_des, codigo_material } = req.query;
        winston.info(`material_des: '${material_des}'`);
        material_des = material_des.trim();
        winston.info(`material_des: '${material_des}'`);
        if( !(material_sociedad && material_sociedad !=="") ){
            response.mensaje = "El campo material_sociedad no tiene un valor v??lido. Tipo de dato: '"+(typeof material_sociedad)+"', valor = "+material_sociedad;
            winston.info("response: ", response);
            res.status(200).json(response);
            return;
        }
        if( !(cod_linea && cod_linea !=="") ){
            response.mensaje = "El campo cod_linea no tiene un valor v??lido. Tipo de dato: '"+(typeof cod_linea)+"', valor = "+cod_linea;
            winston.info("response: ", response);
            res.status(200).json(response);
            return;
        }
        if( !(cod_sublinea && cod_sublinea !=="") ){
            response.mensaje = "El campo cod_sublinea no tiene un valor v??lido. Tipo de dato: '"+(typeof cod_sublinea)+"', valor = "+cod_sublinea;
            winston.info("response: ", response);
            res.status(200).json(response);
            return;
        }
        let condicion_part1 = "";
        if(codigo_material && codigo_material !== ''){
            let arrayCodMaterial = codigo_material.split('-');
            let cod_material_mod = String("000000000000"+arrayCodMaterial[0]).slice(-13) + arrayCodMaterial[1];
            condicion_part1 = condicion_part1 + ` and codigomateriallocal='${cod_material_mod}'`;
        } else {
            if(!material_des){
                material_des = "";
            }
            material_des = material_des.toUpperCase();
            condicion_part1 = condicion_part1 + ` and material_des like '%${material_des}%'`;
        }
        
        let bodyObj = {
            condicion: `material_sociedad='${material_sociedad}' and linea_sap='${cod_linea}' and sublinea_sap='${cod_sublinea}'${condicion_part1}`,
            columna: "distinct (material_des+'??'+codigomateriallocal) as datos"
        }
        winston.info("bodyObj:", bodyObj);
        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': config.token_isicom
            },
            body: JSON.stringify(bodyObj),
            cache: 'no-cache'
        }

        const datosIntegrador = await fetch("https://integracion.cpsaa.com.pe/organizacion/vista_material", request);
        //console.log("datosIntegrador:", datosIntegrador);
        const datosIntegradorObj = await datosIntegrador.json();
        winston.info("datosIntegradorObj.length:", datosIntegradorObj.length);
        response.datos = datosIntegradorObj;

        response.resultado = 1;
        response.mensaje = "";
        res.status(200).json(response);
    } catch (error) {
        winston.error("Error en controllers.productoGenerico.buscarMaterial: ", error);
        res.status(200).send({
            codigo: 0,
            mensaje: error.message
        });
    } finally {
        winston.info(`=-=-=-=-=-=> Fin: controllers.productoGenerico.buscarMaterial`);
    }
}

controller.buscarUnidadMedida = async (req, res) => {
    winston.info(`=-=-=-=-=-=> Inicio: controllers.productoGenerico.buscarUnidadMedida`);
    try {
        const response = {
            resultado: 0,
            mensaje: "Error inesperado controllers.productoGenerico.buscarMaterial"
        };
        let { codigo_material } = req.query;
        winston.info("codigo_material:", codigo_material);
        if( !(codigo_material & codigo_material !=="") ){
            response.mensaje = "El campo codigo_material no tiene un valor v??lido. Tipo de dato: '"+(typeof codigo_material)+"', valor = "+codigo_material;
            winston.info("response: ", response);
            res.status(200).json(response);
            return;
        }

        const buscarUnidadMedidaRes = await productoGenericoModel.buscarUnidadMedida(postgresConn, req.query);
        winston.info("buscarUnidadMedidaRes.rows.length:", buscarUnidadMedidaRes.rows.length);
        winston.info("buscarUnidadMedidaRes.rows[0].material_unimed:", buscarUnidadMedidaRes.rows[0].material_unimed);

        if(buscarUnidadMedidaRes.rows.length > 0){
            response.datos = buscarUnidadMedidaRes.rows[0].material_unimed;
        } else {
            response.datos = "";
        }

        response.resultado = 1;
        response.mensaje = "";
        
        res.status(200).json(response);

    } catch (error) {
        winston.error("Error en controllers.productoGenerico.buscarUnidadMedida: ", error);
        res.status(200).send({
            codigo: 0,
            mensaje: error.message
        });
    } finally {
        winston.info(`=-=-=-=-=-=> Fin: controllers.productoGenerico.buscarUnidadMedida`);
    }
}

controller.crear = async (req, res) => {
    winston.info(`=-=-=-=-=-=> Inicio: controllers.productoGenerico.crear`);
    try {
        const response = {
            resultado: 0,
            mensaje: "Error inesperado controllers.productoGenerico.buscarMaterial"
        };
        let { codigo_sociedad, cod_linea, linea, cod_sublinea, sublinea, codigo_material, material, creado_por, unimed, estado } = req.body;
        winston.info("req.body:", req.body);
        const crearRes = await productoGenericoModel.crear(postgresConn, req.body);
        winston.info("crearRes.rows:", crearRes.rows);
        if(crearRes.rows[0].id_producto_generico){
            response.resultado = 1;
            response.mensaje = "";
            response.datos = crearRes.rows[0].id_producto_generico
        } else {
            response.mensaje = "Ocurrio un error al momento de insertar el nuevo Producto Generico."
        }
        
        res.status(200).json(response);
    } catch (error) {
        winston.error("Error en controllers.productoGenerico.crear: ", error);
        res.status(200).send({
            codigo: 0,
            mensaje: error.message
        });
    } finally {
        winston.info(`=-=-=-=-=-=> Fin: controllers.productoGenerico.crear`);
    }
}

controller.actualizar = async (req, res) => {
    winston.info(`=-=-=-=-=-=> Inicio: controllers.productoGenerico.actualizar`);
    try {
        const response = {
            resultado: 0,
            mensaje: "Error inesperado controllers.productoGenerico.actualizar"
        };
        let { codigo_sociedad, cod_linea, linea, cod_sublinea, sublinea, codigo_material, material, unimed, estado, id_producto_generico } = req.body;
        if( !(parseInt(id_producto_generico) && parseInt(id_producto_generico) > 0) ){
            response.mensaje = "El campo id_producto_generico no tiene un valor v??lido. Tipo de dato: '"+(typeof id_producto_generico)+"', valor = "+id_producto_generico;
            winston.info("response: ", response);
            res.status(200).json(response);
            return;
        }

        const actualizarRes = await productoGenericoModel.actualizar(postgresConn, req.body);
        winston.info("actualizarRes.rowCount:", actualizarRes.rowCount);
        if( !(actualizarRes && actualizarRes.rowCount == 1) ){
            response.mensaje = "";
            res.status(200).json(response);
            return;
        }

        response.resultado = 1;
        response.mensaje = "";
        res.status(200).json(response);
    } catch (error) {
        winston.error("Error en controllers.productoGenerico.actualizar: ", error);
        res.status(200).send({
            codigo: 0,
            mensaje: error.message
        });
    } finally {
        winston.info(`=-=-=-=-=-=> Fin: controllers.productoGenerico.actualizar`);
    }
}

module.exports = controller;