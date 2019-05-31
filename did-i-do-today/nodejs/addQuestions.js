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
const questionsRef     = db.collection('questions');

if (process.argv[2] == undefined)
{
  console.log('node addUser.js <user> <question1> <type>');
  console.log('type: binary, integer');
  return -1;
}

if (process.argv.length % 2 === 0 || process.argv.length < 5)
{
  console.log('node addUser.js <user> <question1> <type>');
  console.log('type: binary, integer');
  return -1;
}

let userId = process.argv[2];

let questions = [];
for (let i = 3; i < process.argv.length; i+=2)
{
  questions.push({
    value: process.argv[i],
    type: process.argv[i + 1]
  });
}

  questionsMetaRef.where('userId', '==', userId)
    .get()
    .then((snap) => {
      snap.forEach((doc, i) => {

        doc.update({
          qRefs: admin.firestore.FieldValue.arrayUnion('czsARV99bx3Vu0s9w97b')
        });

      });
    });

/*
questionsRef.add({
  userId,
  questions,
  timeCreated: admin.firestore.Timestamp.now(),
}).then(ref => {
  console.log('Added document with ID: ', ref.id);

  questionsMetaRef.where('userId', '==', userId)
    .get()
    .then((snap) => {
      snap.docs[0].update({
        qRefs: admin.firestore.FieldValue.arrayUnion(ref)
      });
    });
});
*/
