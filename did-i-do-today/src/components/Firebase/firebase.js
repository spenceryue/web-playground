import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const config =
  {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };

class Firebase {
  constructor()
  {
    app.initializeApp(config);
    this.store = app.firestore();
    this.auth  = app.auth();
    this.database = app.database();
  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () =>
    this.auth.signOut();

  doGetUsername = (func) => {
    this.database.ref('users/' + this.auth.currentUser.uid).once('value').then((snapshot) =>
      {
        func(snapshot.val().username);
      }
    );
  }

  doGetGeorgeUsername = (func) => {
    this.database.ref('users/' + 'tTwRJTLmILXW3DZST1BbkoutXpt2').once('value').then((snapshot) =>
      {
        func(snapshot.val().username);
      }
    );
  }

  doGetAnswers = (userId, date, func) => {

    const answersRef = this.store.collection('answers');

    const query = answersRef.where('userId', '==', userId)
                            .where('timeCreated', '>', date)
                            .get().then((snap) => {

                              let ret = [];

                              snap.forEach((doc) => {
                                ret.push(doc.data());
                              });

                              func(ret);
                            });
  };

  doGetQuestions = (userId, func) => {
    const questionsRef = this.store.collection('questionsMeta');

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
                  func(qSnap.data());
                });
            }
          });
      });
  }

  doSetAnswers = (userId, answers) => {
    const answersRef = this.store.collection('answers');

    let answerObj = {
      timeCreated: app.firestore.Timestamp.now(),
      userId,
      answers
    }

    answersRef.add(answerObj)
      .then(ref => {
        console.log('Added document with ID: ', ref.id);
      })
      .catch(e => console.err);
  }

  doSetQuestions = (userId, questions) => {
    const questionsRef = this.store.collection('questions');
    const questionsMetaRef = this.store.collection('questionsMeta');

    questionsRef.add({
      userId,
      questions,
      timeCreated: app.firestore.Timestamp.now(),
    }).then(ref => {

      questionsMetaRef.where('userId', '==', userId)
        .get()
        .then((snap) => {
          snap.forEach((doc, i) =>
            {
              doc._ref.update({
                qRefs: admin.firestore.FieldValue.arrayUnion(ref)
              });
            });
        });
    });
  }
}

export default Firebase;
