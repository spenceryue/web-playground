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

const answersRef = db.collection('answers');

if (process.argv[2] == undefined)
{
  console.log('node addAnswers.js <user> <timeCreated> <questionHash> <answer>');
  return -1;
}

if (process.argv.length % 2 === 1 || process.argv.length < 4)
{
  console.log('node addAnswers.js <user> <timeCreated> <questionHash> <answer>');
  return -1;
}

let userId = process.argv[2];
let date = new Date(process.argv[3]);
let answers = {};

for (let i = 4; i < process.argv.length; i += 2)
{
  let answer;
  if (process.argv[i + 1] === 'true') {
    answer = true;
  } else if (process.argv[i + 1] === 'false') {
    answer = false;
  } else {
    answer = process.argv[i + 1];
  }

  answers[process.argv[i]] = answer;
}

let answerObj = {
  timeCreated: admin.firestore.Timestamp.fromDate(date),
  userId,
  answers
}

console.log('Adding answers');
answersRef.add(answerObj)
  .then(ref => {
    console.log('Added document with ID: ', ref.id);
  })
  .catch(e => console.err);

