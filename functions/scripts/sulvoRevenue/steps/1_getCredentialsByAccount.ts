import { credential } from 'firebase-admin';

interface Time {
  _seconds: number;
  _nanoseconds: number;
}

interface Credential {
  provider: string;
  account: string;
  userName: string;
  createdAt: Time;
  email: string;
  password: string;
  updatedAt: Time;
  type: string;
}

const { firestoreLogic } = require('../../../utils/firebase');

exports.getCredentialsByAccount = async ({
  sanitizedReportRules = [],
} = {}) => {
  const credentials: Credential[] = [];
  if (sanitizedReportRules.length === 0) {
    console.log('No sanitizedReportRules added');
    return [];
  }
  try {
    for (let i = 0; i < sanitizedReportRules.length; i++) {
      await firestoreLogic
        .collection('credentials')
        .where('provider', '==', sanitizedReportRules[i].provider)
        .where('userName', '==', sanitizedReportRules[i].account)
        .get()
        .then((querySnapshot) => {
          try {
            querySnapshot.forEach(function (doc) {
              const credential: Credential = {
                type: sanitizedReportRules[i].type,
                ...doc.data(),
              };
              credentials.push(credential);
            });
          } catch (e) {
            console.log(
              `Error: Couldn't get credential from querySnapshot, message: ${e.message}`
            );
          }
        })
        .catch((e) =>
          console.log(
            `Error: Couldn't get data from Firestore, message: ${e.message}`
          )
        );
    }

    console.log(credentials);
  } catch (e) {
    console.log(
      'There is no result, maybe collection is unavailable or given data structure is wrong'
    );
  }
  return credentials;
};
