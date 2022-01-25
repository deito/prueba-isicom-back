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

config.token_isicom = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJU0lDT00tQVBQIiwiaWF0IjoxNjQzMDE0ODQ1LCJleHAiOjE2NDM3MDYwNDUsImlzcyI6IkNlbWVudG9zIFBhY2FtYXlvIFMuQS5BLiJ9.Ic9zN9GGDZbAEg5FXdq606KbaJUbEKGjUOMlCDGrcF4uOgpO8F-KGPOFT-LCuaG_UGWBIIERJEO85n-TWKACJeBoOmvJTCGbLdyDaz0Pb6KZsIqn5TebX8r0vYfqPdbnHNHz9w6ZyLvg4m_DG1gevlRtIHa2s3_JyeW04Ylfwdo7L2Zz6d_OExiX4gQt9BHfGPCI4wnrIc0hE4XEvGyFe0s2ayheUtpZ670I9YgL0_3giMR7go-iCSTP53Z_vFhR6UU2aYZ7WTBxX1d-HL-9fRljJbTngOaKYIsl0HoIx2HtIgJRDulSMNIcooT1v2xDGeppnMZZt1AZncSx_s34ys6SScuuqV8KnQNoVQxujK53235lntnAq8hjowIQvaXbcG2ji6jboYWN8JxZHuo6IkMGA8MgiYeLc9-Z9Qogay7_ZI5znBbCeA8diGZhTE4zWEU6Q3rSa7FlOb3fYzx7GJYHaxpGBxfkMWjqoViy3r9VLue0I6jnHZjIUDoIG-pvCECTIj-v9kzeOxd1wEjnsPHqVpKGDv4svXNFHhaohGL3n1BxS9B8HvnM8A4EGP157OwploVb4VZLwHE1qGFlHf5Xx7urTO2IZiQbH6fMk3BdY2pp959Y52tPws1LTZ3_aYa2YmG9cSaM_7UvMdzhxcXiBAvm1J9vzl2I8Zc34J8';

module.exports = config;