const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();


const serviceAccount = {
  "type": process.env.TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),  
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
  "universe_domain": process.env.UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIRE_BASE_BUKET,
});

const bucket = admin.storage().bucket();

async function uploadFirebase(req, res,next) {
  console.log("Request File:", req.file);  
  try {
    console.log("Inside firebase upload function:", req.file);
    const fileName = `${process.env.FIRE_BASE_FOLDER}/${req.file.originalname}`;
    console.log("File name is here=>",fileName)
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({

      metadata: {
        contentType: req.file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
        },
      },
    });

    blobStream.on('error', (error) => {
        console.error('Firebase upload error:', error);
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${uuidv4()}`;
      console.log("Public URL:", publicUrl);
       req.file.firebaseUrl = publicUrl;  
       next();
       
     });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error('Error in firebase upload =>', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
}

module.exports = uploadFirebase;
