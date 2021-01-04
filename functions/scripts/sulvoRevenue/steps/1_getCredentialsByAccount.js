const { firestoreLogic } = require('../../../utils/firebase');

/**
 * In this function we will get all the needed credentials
 * @param {object} sanitizedReportRules - This array contains all the needed credential userNames
 */
exports.getCredentialsByAccount = async ({
  sanitizedReportRules = [],
} = {}) => {
  const credentials = [];
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
              credentials.push({
                ...doc.data(),
                ...{ type: sanitizedReportRules[i].type },
              });
            });
          } catch (e) {
            console.log(
              `Error: Couldn't get credential from querySnapshot, message: ${e.message}`
            );
          }
        })
        .catch((e) => {
          console.log(
            `Error: Couldn't get data from Firestore, message: ${e.message}`
          );
        });
    }
  } catch (e) {
    console.log(
      'There is no result, maybe collection is unavailable or given data structure is wrong'
    );
    throw e;
  }
  console.log('getCredentials function ok');
  return credentials;
};
