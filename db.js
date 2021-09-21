const admin = require("firebase-admin");
const {Storage} = require('@google-cloud/storage');
const config = require('./config')
const serviceAccount = require(config.service_key_path)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://elearningsystem-ba75b.appspot.com"
});
const db = admin.firestore();
const bucket = admin.storage().bucket();
/*const test = async () => {
    const storage = new Storage({
        keyFilename: config.service_key_path,
     });
    
    let bucketName = "gs://elearningsystem-ba75b.appspot.com"
    let destFilename = './test';
    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: destFilename,
    };

    // Downloads the file
    await storage.bucket(bucketName).file('index.js').download(options);
}
test();*/

module.exports = {
    db, admin,bucket
};