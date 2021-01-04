const path = require('path');
const admin = require('firebase-admin');

const credentials = require(path.resolve(__dirname, '../adminSdks.json/'));

const firebaseLogic = admin.initializeApp({
  credential: admin.credential.cert(credentials['robust-dashboard-logic']),
  databaseURL: `https://robust-dashboard-logic.firebaseio.com`,
});

const firestoreLogic = firebaseLogic.firestore();

const firebaseReporting = admin.initializeApp(
  {
    credential: admin.credential.cert(
      credentials['robust-dashboard-reporting']
    ),
    databaseURL: `https://robust-dashboard-reporting.firebaseio.com`,
  },
  'robust-dashboard-reporting'
);

const firestoreReporting = firebaseReporting.firestore();

module.exports = {
  firebaseLogic,
  firestoreLogic,
  firebaseReporting,
  firestoreReporting,
};
