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

const questionsRef = db.collection('questionsMeta');

let userId = 'gtang.gt';

if (process.argv[2] != undefined)
{
  userId = process.argv[2];
}

const query = questionsRef.where('userId', '==', userId)
      .get()
      .then((snap) => {
        snap.forEach((doc) =>
          {
            let qRefs = doc.data().qRefs;
            if (qRefs.length > 0)
            {
              qRefs[qRefs.length - 1].get()
                .then((qSnap) => {
                  console.log(qSnap.data().questions);
                })
                .catch(e => {console.log(e)});
              ;
            }
          });
      })
      .catch(e => {console.log(e)});
