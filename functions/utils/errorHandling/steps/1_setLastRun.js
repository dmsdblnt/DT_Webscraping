const path = require('path');
const admin = require('firebase-admin');

const { firestoreReporting } = require('./../../../utils/firebase');

exports.setLastRun = async ({ ruleId, ref, res }) => {
  await firestoreReporting
    .collection('reportRules')
    .doc(ruleId)
    .update({
      //updated_at: admin.firestore.FieldValue.delete()
      ...{ lastRun: admin.firestore.FieldValue.serverTimestamp() },
    })
    //.then(console.log)
    .catch((e) => console.log(e.message, 'Set last run anyway'));

  res !== undefined
    ? res.json({ ...ref.data(), message: 'ReportRule updated.' })
    : console.log('ReportRule updated.');
};
