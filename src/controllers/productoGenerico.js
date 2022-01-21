const winston = require('../utils/winston');
const config = require('../config');
const fetch = require('node-fetch');

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
        winston.info(`=-=-=-=-=-=> Fin: listarLinea`);
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
        
    } catch (error) {
        
    } finally {
        winston.info(`=-=-=-=-=-=> Inicio: controllers.productoGenerico.buscar`);
    }
}

module.exports = controller;