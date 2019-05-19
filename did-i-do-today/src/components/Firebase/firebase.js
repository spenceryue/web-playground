import app from 'firebase/app';
import 'firebase/firestore';

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

}

export default Firebase;
