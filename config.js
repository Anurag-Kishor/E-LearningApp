const dotenv = require('dotenv');
dotenv.config();
const {
    PORT,
    HOST, 
    HOST_URL,
    FIREBASE_SERVICE_ACCOUNT_KEY_PATH
} = process.env;


module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    service_key_path: FIREBASE_SERVICE_ACCOUNT_KEY_PATH
}