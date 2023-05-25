export type Profai = {
  version: '0.1.0'
  name: 'linktree'
  constants: [{ name: 'LINKTREE'; type: 'bytes'; value: '[76, 73, 78, 75, 84, 82, 69, 69]' }]
  instructions: [
    {
      name: 'init'
      accounts: [
        { name: 'profile'; isMut: true; isSigner: false },
        { name: 'signer'; isMut: true; isSigner: true },
        { name: 'systemProgram'; isMut: false; isSigner: false },
      ]
      args: [{ name: 'name'; type: 'string' }, { name: 'facebook'; type: 'string' }]
    },
    {
      name: 'update'
      accounts: [
        { name: 'profile'; isMut: true; isSigner: false },
        { name: 'signer'; isMut: true; isSigner: true },
        { name: 'systemProgram'; isMut: false; isSigner: false },
      ]
      args: [{ name: 'name'; type: 'string' }, { name: 'facebook'; type: 'string' }]
    },
  ]
  accounts: [
    {
      name: 'profile'
      type: {
        kind: 'struct'
        fields: [
          { name: 'author'; type: 'publicKey' },
          { name: 'name'; type: 'string' },
          { name: 'facebook'; type: 'string' },
        ]
      }
    },
  ]
}

export const IDL: Profai = {
  version: '0.1.0',
  name: 'linktree',
  constants: [{ name: 'LINKTREE', type: 'bytes', value: '[76, 73, 78, 75, 84, 82, 69, 69]' }],
  instructions: [
    {
      name: 'init',
      accounts: [
        { name: 'profile', isMut: true, isSigner: false },
        { name: 'signer', isMut: true, isSigner: true },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [
        { name: 'name', type: 'string' },
        { name: 'facebook', type: 'string' },
      ],
    },
    {
      name: 'update',
      accounts: [
        { name: 'profile', isMut: true, isSigner: false },
        { name: 'signer', isMut: true, isSigner: true },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [
        { name: 'name', type: 'string' },
        { name: 'facebook', type: 'string' },
      ],
    },
  ],
  accounts: [
    {
      name: 'profile',
      type: {
        kind: 'struct',
        fields: [
          { name: 'author', type: 'publicKey' },
          { name: 'name', type: 'string' },
          { name: 'facebook', type: 'string' },
        ],
      },
    },
  ],
}
