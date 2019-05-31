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
  console.log('node addUser.js <user>');
  return -1;
}

let userId = process.argv[2];

questionsRef.add({
  userId,
  questions: {
    type: 'integer',
    value: 'on a scale of 1 - 10, how are you today?'
  },
  timeCreated: admin.firestore.Timestamp.now(),
}).then(ref => {
  console.log('Added document with ID: ', ref.id);

  questionsMetaRef.add({
    userId,
    qRefs: [ ref ]
  }).then(ref => {
    console.log('Created New User!');
  });
});
