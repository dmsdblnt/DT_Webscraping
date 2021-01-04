const path = require('path');

const { firestoreReporting } = require('./../firebase.js');

const { setRecovery } = require('./steps/0_setRecovery');
const { setLastRun } = require('./steps/1_setLastRun');
const { setError } = require('./steps/2_setError');

exports.errorHandling = async ({ func, reportRule, type, res }) => {
  const ruleId = reportRule.id;
  try {
    await func({ credentials: reportRule.credentials });
    //Get report rule to run
    const ref = await firestoreReporting
      .collection('reportRules')
      .doc(reportRule.id)
      .get();
    const health = ref.data().health;
    //0.: Set recovery(health:true, recoveredAt, lastRun) If health false, but now it works, then health switched true and recovery date added
    await setRecovery({ health, ruleId });
    //1.: Set last run anyway
    await setLastRun({ ruleId, ref, res });
  } catch (e) {
    //2.: Set error if any problem occured (health:false, lastErrorAt, lastErrorDuring, lastRun)
    await setError({ ruleId, type, e });
    console.log(
      `Error! Script failed, email not sent for this reportRuleId: ${ruleId}, message: ${e.message}`
    );
  }
};
