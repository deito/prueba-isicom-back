const winston = require('../utils/winston');
const fetch = require('node-fetch');
const AbortController = globalThis.AbortController || require("abort-controller");

const controller = {};

function temporizador(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

controller.timeout = async (req, res) => {
    winston.info(`=-=-=-=-=-=> Inicio: controllers.testController.timeout`);
    try {
        const { ms } = req.query;
        winston.info("ms:", ms);
        const timeoutId = await temporizador(parseInt(ms));
        winston.info("timeoutId:", timeoutId);
        res.status(200).json({
            codigo: 1,
            mensaje: ""
        });
    } catch (error) {
        winston.error("Error en controllers.testController.timeout: ", error);
        res.status(200).send({
            codigo: 0,
            mensaje: error.message
        });
    } finally {
        winston.info(`=-=-=-=-=-=> Fin: controllers.testController.timeout`);
    }
}

controller.node_fetch_timeout = async (req, res) => {
    winston.info(`=-=-=-=-=-=> Inicio: controllers.testController.node_fetch_timeout`);
    const abortControllerObj = new AbortController();
    const setTimeoutId = setTimeout(() => {
        abortControllerObj.abort();
    }, 3000);
    winston.info("setTimeoutId:", setTimeoutId);

    try {
        const response = {
            resultado: 0,
            mensaje: "Error inesperado controllers.productoGenerico.node_fetch_timeout"
        };

        let { tiempo } = req.query;
        winston.info("tiempo:", tiempo);
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            signal: abortControllerObj.signal,
            cache: 'no-cache'
        }

        const datosFetch = await fetch("http://127.0.0.1:4000/test/timeout?ms="+parseInt(tiempo), options);
        const datosFetchObj = await datosFetch.json();
        winston.info("datosFetchObj:", datosFetchObj);
        response.resultado = 1;
        response.mensaje = "";
        response.datos = datosFetchObj;
        res.status(200).json(response);
    } catch (error) {
        winston.error("Error en controllers.testController.node_fetch_timeout: ", error);
        res.status(200).send({
            codigo: 0,
            mensaje: error.message
        });
    } finally {
        clearTimeout(setTimeoutId);
        winston.info(`=-=-=-=-=-=> Fin: controllers.testController.node_fetch_timeout`);
    }
}

module.exports = controller;