import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import uuidv4 from 'uuid/v4';

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

    const v1options = {
        node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
        clockseq: 0x1234,
        msecs: new Date('2011-11-01').getTime(),
        nsecs: 5678
    };
    console.log((uuidv4()));

    this.auth = app.auth();
    this.db   = app.database();
    this.store = app.firestore();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () =>
    this.auth.signOut();

  doPasswordReset = (email) =>
    this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  doGetQuestions = async (userId) => {
    const questionsRef = this.store.collection('user-questions');

    const query = questionsRef.where('userId', '==', userId);


    let questions;

    await query.get().then((snap) => {
      snap.forEach((doc) => {
        console.log(doc.id);
        console.log(doc.data());
        questions = doc.data().questions;
      });
    });

    return questions;
  }

  doGetQuestionsV2 = (userId) => {
    const questionMetaRef = this.store.collection('questionsMeta');
    const query = questionMetaRef.where('userId', '==', userId);

    query.get().then((snap) => {
      snap.forEach((doc) => {
        doc.data().qRefs.forEach((qRef) => {
          qRef.get().then((doc) => {
            console.log(doc.data());
          });
        });
      });
    });
  }

  doSetQuestions = async (questions, userId) => {
    const questionsRef = this.store.collection('user-questions');
    const query = questionsRef.doc();

    console.log(query);
    query.set({
      questions,
      userId
    }, {merge: false} ).then(console.log)
    .catch(console.err);
  };

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
