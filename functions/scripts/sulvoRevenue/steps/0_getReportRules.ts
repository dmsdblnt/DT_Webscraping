interface Time {
  _seconds: number;
  _nanoseconds: number;
}

interface ReportRule {
  id: string;
  type: string;
  provider: string;
  account: string;
  subAccount: string;
  status: boolean;
  frequency: number;
  domain: string;
  createdAt: Time;
  updatedAt: Time;
}

const { firestoreReporting } = require('../../../utils/firebase');

exports.getReportRules = async ({ reportRuleIds = [], type = '' } = {}) => {
  const reportRules: ReportRule[] = [];
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
                  const reportRule: ReportRule = {
                    id: doc.id,
                    ...doc.data(),
                  };
                  reportRules.push(reportRule);
                });
              } catch (e) {
                console.log(
                  `Error: Couldn't get all "sulvoRevenue" reportRules from querySnapshot, message: ${e.message}`
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
                  const reportRule: ReportRule = {
                    id: doc.id,
                    ...doc.data(),
                  };
                  reportRules.push(reportRule);
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
        }
        break;

      default:
        for (let i = 0; i < reportRuleIds.length; i++) {
          await firestoreReporting
            .collection('reportRules')
            .doc(reportRuleIds[i])
            .get()
            .then((doc) => {
              try {
                const reportRule: ReportRule = {
                  id: doc.id,
                  ...doc.data(),
                };
                reportRules.push(reportRule);
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
    console.log(reportRules);
  } catch (e) {
    console.log(
      'There is no result, maybe collection is unavailable or parameter is undefined.'
    );
  }
  return reportRules;
};
