const path = require('path');
const admin = require('firebase-admin');

const { firestoreReporting } = require('./../../../utils/firebase');

exports.setRecovery = async ({ health, ruleId }) => {
  if (health === false)
    await firestoreReporting
      .collection('reportRules')
      .doc(ruleId)
      .update({
        //updated_at: admin.firestore.FieldValue.delete()
        ...{
          health: true,
          recoveredAt: admin.firestore.FieldValue.serverTimestamp(),
          lastRun: admin.firestore.FieldValue.serverTimestamp(),
        },
      })
      //.then(console.log)
      .catch((e) =>
        console.log(
          `Error: Set recovery(health:true, recoveredAt, lastRun), message: ${e.message}`
        )
      );
};
