const { Keypair, Transaction, PublicKey, SystemProgram } = require('@solana/web3.js');
const bs58 = require('bs58');
const fs = require('fs');

const senderPrivateKeyBase58 = 'YOUR_WALLET_2_PRIVATE_KEY';
const senderSecretKey = bs58.default.decode(senderPrivateKeyBase58);
const senderKeypair = Keypair.fromSecretKey(senderSecretKey);
console.log('Sender Public Key:', senderKeypair.publicKey.toString());

const recipientPubkey = new PublicKey('YOUR_WALLET_1_PUBLIC_KEY');
const nonceData = JSON.parse(fs.readFileSync('nonce-data.json'));
const noncePubkey = new PublicKey(nonceData.noncePubkey);
const nonceValue = nonceData.nonceValue;

const transaction = new Transaction({
  feePayer: senderKeypair.publicKey,
  nonceInfo: {
    nonce: nonceValue,
    nonceInstruction: SystemProgram.nonceAdvance({
      noncePubkey: noncePubkey,
      authorizedPubkey: senderKeypair.publicKey,
    }),
  },
});
transaction.add(
  SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey: recipientPubkey,
    lamports: 100000000,
  })
);

transaction.sign(senderKeypair);
fs.writeFileSync('txn.bin', transaction.serialize());
console.log('Signed transaction saved as txn.bin');