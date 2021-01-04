const expect = require('chai').expect;
const axios = require('axios').default;
const { getCredentialsByAccount } = require('./1_getCredentialsByAccount');
const { Message } = require('firebase-functions/lib/providers/pubsub');

const credentialSchema = {
  title: 'credential schema',
  type: 'object',
  required: [
    'account',
    'createdAt',
    'emailId',
    'password',
    'type',
    'updatedAt',
    'userName',
    'provider',
  ],
  properties: {
    account: {
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
    emailId: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    type: {
      type: 'string',
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
    userName: {
      type: 'string',
    },
  },
};

describe('get Credential By 1 Account ', async () => {
  const sanitizedReportRules = [
    {
      provider: 'sulvoRevenue',
      account: 'djakubovics@yahoo.com',
      type: 'asdasd',
    },
  ];
  it('Return 1 sulvo credential type OK', async () =>
    expect(await getCredentialsByAccount({ sanitizedReportRules })).to.be.an(
      'array'
    ));
  it('Return 1 sulvo credential schema OK', async () => {
    const a = await getCredentialsByAccount({ sanitizedReportRules });
    expect(a[0]).to.be.jsonSchema(credentialSchema);
  });
});

describe('getCredentialByAccount ', async () => {
  const sanitizedReportRules = [
    {
      provider: 'sulvoRevenue',
      account: 'djakubovics@yahoo.com',
      type: 'asdasd',
    },
    {
      provider: 'sulvoRevenue',
      account: 'mediametics@gmail.com',
      type: 'asdasd',
    },
  ];
  it('Return some sulvo credential', async () =>
    expect(await getCredentialsByAccount({ sanitizedReportRules })).to.be.an(
      'array'
    ));
  it('Return some sulvo credential', async () => {
    const a = await getCredentialsByAccount({ sanitizedReportRules });
    expect(a[0]).to.be.jsonSchema(credentialSchema);
  });
});

describe('No sulvo credential given ', async () => {
  it('Get empty array as result', async () =>
    expect(await getCredentialsByAccount()).to.be.empty);
});

// describe('Wrong structure given ', async () => {
//   const sanitizedReportRules = [
//     {
//       provider: 'sulvoRevenue',
//       type: 'asdasd',
//     },
//   ];
//   it('Get empty array as result', async () =>
//     expect(await getCredentialsByAccount({ sanitizedReportRules })).to.throw(
//       Error
//     ));
// });
