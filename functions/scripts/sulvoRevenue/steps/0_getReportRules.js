const { firestoreReporting } = require('../../../utils/firebase');

/**
 * This function will communicate with the database and get the reportRules by its ids.
 * @param {object} reportRuleIds - Contains the ids of the reportRules which will be queryed.
 * Can be empty. In this case all reportRules will be queryed.
 */
exports.getReportRules = async ({ reportRuleIds = [], type = '' } = {}) => {
  const reportRules = [];
  try {
    switch (reportRuleIds.length) {
      case 0:
        if (type === '') {
          await firestoreReporting
            .collection('reportRules')
            .where('provider', '==', 'sulvoRevenue')
            .get()
            .then((querySnapshot) => {
              try {
                querySnapshot.forEach(function (doc) {
                  reportRules.push({ id: doc.id, ...doc.data() });
                });
              } catch (e) {
                console.log(
                  `Error: Couldn't get all "sulvoRevenue" reportRules with any type from querySnapshot, message: ${e.message}`
                );
              }
            })
            .catch((e) =>
              console.log(
                `Error: Couldn't get data from Firestore, message: ${e.message}`
              )
            );
        } else {
          await firestoreReporting
            .collection('reportRules')
            .where('provider', '==', 'sulvoRevenue')
            .where('type', '==', type)
            .get()
            .then((querySnapshot) => {
              try {
                querySnapshot.forEach(function (doc) {
                  reportRules.push({ id: doc.id, ...doc.data() });
                });
              } catch (e) {
                console.log(
                  `Error: Couldn't get all "sulvoRevenue ${type}" reportRules from querySnapshot, message: ${e.message}`
                );
              }
            })
            .catch((e) =>
              console.log(
                `Error: Couldn't get data from Firestore, message: ${e.message}`
              )
            );
          break;
        }
      default:
        for (let i = 0; i < reportRuleIds.length; i++) {
          await firestoreReporting
            .collection('reportRules')
            .doc(reportRuleIds[i])
            .get()
            .then((doc) => {
              try {
                if (doc.data() !== undefined) {
                  reportRules.push({ id: doc.id, ...doc.data() });
                }
              } catch (e) {
                console.log(
                  `Error: Couldn't get all reportRules by reportRuleIds! from querySnapshot, message: ${e.message}`
                );
              }
            })
            .catch((e) =>
              console.log(
                `Error: Couldn't get data from Firestore, message: ${e.message}`
              )
            );
        }
        break;
    }
  } catch (e) {
    console.log(
      'There is no result, maybe collection is unavailable or parameter is undefined.'
    );
    throw e;
  }
  console.log('getReportRules function ok');
  return reportRules;
};
