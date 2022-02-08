require('dotenv').config();
const path = require('path');
const config = {};
//const INSTANCIA_CLOUD_DB = (process.env.DB_SOCKET_PATH ? `${process.env.DB_SOCKET_PATH}/${process.env.INSTANCE_CONNECTION_NAME}` : (process.env.IP_POSTGRES ? process.env.IP_POSTGRES : '127.0.0.1') );

//console.log("process.env", process.env);
//console.log("__dirname:", __dirname);
console.log("process.env.USUARIO_POSTGRES:", process.env.USUARIO_POSTGRES);
console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
console.log("process.env.IP_POSTGRES:", process.env.IP_POSTGRES);
console.log("process.env.PORT_DB_POSTGRES:", process.env.PORT_DB_POSTGRES);

config.postgres = {
    user: process.env.USUARIO_POSTGRES || 'postgres',
    password: process.env.PASSWORD_POSTGRES || 'postgres',
    //host: INSTANCIA_CLOUD_DB,
    host: process.env.IP_POSTGRES ? process.env.IP_POSTGRES : '127.0.0.1',
    port: process.env.PORT_DB_POSTGRES || 5434,
    database: process.env.DATABASE_POSTGRES ||'PRUEBA_ISICOM'
}

config.express = {
    port: process.env.EXPRESS_PORT || 4000,
    ip: '127.0.0.1'
}

config.winston = {
    ruta: `${__dirname}/../logs/log-api.log`
}

config.token_isicom = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJU0lDT00tQVBQIiwiaWF0IjoxNjQzNjE5NjQ1LCJleHAiOjE2NDQzMTA4NDUsImlzcyI6IkNlbWVudG9zIFBhY2FtYXlvIFMuQS5BLiJ9.D5_nplY-32eEFgVDHj14TrNYNmmlRk9HoE7PKTkIzb-gExE6BpmlWwf8abYiFd_2fk_Yyue1A9KmU1KesC52ogdclfRBlbwrxj1XTT08WCMCJZMt0_Ioj4g2UMjqU8PhY8Fua2BH2CiyzOQvjX532FfZisnLE8dGPXlyzjI3XyT9WuDRjJIuGbflL5eAdzHw35NBHjVnJ1txpJPC7qkHfpwPASdw5CVOOvxL9oiFSadNSGNdFd_cJsTsIsokweqkfolpeftutI5pYLBH0O4w7xcRmDjytgV3OvkWsam8bDIYfrJZGATNP1dRdnnqX0_yjVIh4loA3S6mAGZz8F-5iSgA1CNkSHsWbYfhuxLtz4I9UTevNuJuCMJLUAeHR5xjylIp0594-59vmamdgwuanX_IsFNTYCeg2ld22v7TklPIx-dXtPl2S6XTROCEWNiIEXaGQlAwFR-H0dPtZNbA7RhptOkNwVwJipuFNcq74x_t5bydPIjO5oJLKj-e_YMIKfYcUSpGT1XKDf10V8Xih3Ptol7TmVJdqwJGNzfcdyVTeTOumtADi_Ps7Wy8g2h7VwZxvHC2Ewa0pN6t_r5vca8OaM7-1Q2_e4TohTvm3dA3_U2vz2Lbe1IXrzNQ5YO0iEkzzwgfinM-i9QB146gOHpM6b7GihsQx02l6lBal_o';

module.exports = config;