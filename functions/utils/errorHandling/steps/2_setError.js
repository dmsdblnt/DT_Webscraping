const path = require('path');
const admin = require('firebase-admin');

const { firestoreReporting } = require('./../../../utils/firebase');
const stackTrace = require('stack-trace');

exports.setError = async ({ ruleId, type, e }) => {
  const trace = stackTrace.parse(e);
  await firestoreReporting
    .collection('reportRules')
    .doc(ruleId)
    .update({
      //updated_at: admin.firestore.FieldValue.delete()
      ...{
        health: false,
        lastErrorAt: admin.firestore.FieldValue.serverTimestamp(),
        lastErrorDuring: `Running Sulvo script: ${trace[0].getFileName()}:${trace[0].getLineNumber()}`,
        lastRun: admin.firestore.FieldValue.serverTimestamp(),
        lastErrorMessage: e.message,
      },
    })
    //.then(console.log)
    .catch((e) =>
      console.log(
        `Error: Set error if any (health:false, lastErrorAt, lastErrorDuring, lastRun) ${e.message}`
      )
    );
};
