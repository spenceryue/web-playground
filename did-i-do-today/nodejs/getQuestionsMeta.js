const admin = require('firebase-admin');

admin.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

const db = admin.firestore();

const questionsMetaRef = db.collection('questionsMeta');

if (process.argv[2] == undefined)
{
  console.log('node getQuestionsMeta.js <user>');
  return -1;
}

let userId = process.argv[2];

let doc = questionsMetaRef.where('userId', '==', userId).get()
console.log(doc);

  doc.then((snap) => {
    console.log(snap);

    snap.forEach((doc, i) =>
      {
        console.log('==================doc==================');
        console.log(doc);
        console.log('==================doc==================');
      });
  });

