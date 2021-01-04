const expect = require('chai').expect;
var chai = require('chai');
chai.use(require('chai-json-schema'));
const axios = require('axios').default;
const path = require('path');
const { getReportRules } = require('./0_getReportRules');

const reportRuleSchema = {
  title: 'reportRule schema',
  type: 'object',
  required: [
    'id',
    'type',
    'provider',
    'account',
    'subAccount',
    'status',
    'frequency',
    'domain',
    'createdAt',
    'updatedAt',
  ],
  properties: {
    id: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    provider: {
      type: 'string',
    },
    account: {
      type: 'string',
    },
    subAccount: {
      type: 'string',
    },
    status: {
      type: 'boolean',
    },
    frequency: {
      type: 'number',
    },
    domain: {
      type: 'string',
    },
    createdAt: {
      type: 'object',
      _seconds: {
        type: 'number',
      },
      _nanoseconds: {
        type: 'number',
      },
    },
    updatedAt: {
      type: 'object',
      _seconds: {
        type: 'number',
      },
      _nanoseconds: {
        type: 'number',
      },
    },
  },
};

describe('Get all reportRules', async () => {
  it('Get all reportRules type OK', async () =>
    expect(await getReportRules()).to.be.an('array'));
  it('Get all reportRules schema OK', async () => {
    const a = await getReportRules();
    expect(a[0]).to.be.jsonSchema(reportRuleSchema);
  });
});

describe('Get exactly one reportRule by id', async () => {
  const reportRuleIds = ['rqTOGcAOsvyEJn2tXFz9'];
  it('Get 1 reportRules type OK', async () =>
    expect(await getReportRules({ reportRuleIds })).to.be.an('array'));
  it('Get 1 reportRule schema OK', async () => {
    const a = await getReportRules({ reportRuleIds });
    expect(a[0]).to.be.jsonSchema(reportRuleSchema);
  });
});

describe('Get some reportRule by ids', async () => {
  const reportRuleIds = ['rqTOGcAOsvyEJn2tXFz9', 'bMPkVkD4XBmBd1QesAiI'];
  it('Get some reportRules type OK', async () =>
    expect(await getReportRules({ reportRuleIds })).to.be.an('array'));
  it('Get some reportRules schema OK', async () => {
    const a = await getReportRules({ reportRuleIds });
    expect(a[0]).to.be.jsonSchema(reportRuleSchema);
  });
});

describe('Added wrong id, no reportRule', async () => {
  const reportRuleIds = ['notAnId'];
  it('Get empty array as result', async () =>
    expect(await getReportRules({ reportRuleIds })).to.be.empty);
});

describe('Get all reportRules', async () => {
  it('Get all reportRules type OK', async () =>
    expect(await getReportRules({ type: 'domain' })).to.be.an('array'));
  it('Get all reportRules schema OK', async () => {
    const a = await getReportRules({ type: 'domain' });
    expect(a[0]).to.be.jsonSchema(reportRuleSchema);
  });
});
