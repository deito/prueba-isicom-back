const path = require('path');
const config = {};
const INSTANCIA_CLOUD_DB = (process.env.DB_SOCKET_PATH ? `${process.env.DB_SOCKET_PATH}/${process.env.INSTANCE_CONNECTION_NAME}` : '127.0.0.1');

config.postgres = {
    user: process.env.SQL_USER || 'postgres',
    password: process.env.SQL_PASSWORD || 'postgres',
    host: INSTANCIA_CLOUD_DB,
    port: process.env.SQL_PORT || 5434,
    database: process.env.SQL_DATABASE || 'PRUEBA_ISICOM'
}

config.express = {
    port: process.env.EXPRESS_PORT || 4000,
    ip: '127.0.0.1'
}

config.winston = {
    ruta: `${__dirname}/../logs/log-api.log`
}

config.token_isicom = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJU0lDT00tQVBQIiwiaWF0IjoxNjQyNDEwMDIyLCJleHAiOjE2NDMxMDEyMjIsImlzcyI6IkNlbWVudG9zIFBhY2FtYXlvIFMuQS5BLiJ9.JtajbXrYt96mVm4iAe0XJb6CXIirjwhfTk6sILIHZwBNqEzj2WEDCDBurMvwwbrOx01L75racFJT5dZvHehCYeSrelvz6KlZcalwRdJE3TbDyKCJjlJ7EdH5ZBkBsgyavULWPhasJ4qJXgZdLOtRRxKoeCdCkVIKVjeEEIHKpjnIKB20MJYM6L7-qeFWlTx3PpnPuEXLx-vtho_0MCZb7q2uqxLuFAXNgjN7PBck0y9XZwHr3ezYo5QOL8kYGy2uilckxKzTvXR1KCyAXHZl-BKECgl76zA99Cc4ejlzFna6tbAXH_1ZyKOqzjxmgCp1fO556LUND4YDg-TkATL207w7GrA4iO2HYRAB7Fmk_mEcKCL9lSq-P2rHkS8LwCslKamGyq74W_oXOT1FLjZsKdAGnkzzyXnrSjCK3JcBdaZwzcguOrdkwHLUT-ci6mzYkz1qZf_wJgueFvXV5e-kAmW93Nkeu0k5eKQjbITmi0xXYsNfV5Bs9prY6FfTCtaWH89VN1MEOtwERNB9BJvwLtE7Op4lagR1VkRIiu7LhxfMzXKfsLP9NgUKDVi2uQwzP9UT9jwV7hx_ySmZREeEgiLEg-wdnr3SEJInNGtj2-qq8u-X9JcCC-Bc0PEjg96whrXuOTgv3AGPwUToO_nPNvCERhc4pTqjZ3Xk74Fq1vQ';

module.exports = config;