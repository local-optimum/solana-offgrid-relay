const { Connection, Keypair, SystemProgram, Transaction, NONCE_ACCOUNT_LENGTH, PublicKey } = require('@solana/web3.js');
const bs58 = require('bs58');
const fs = require('fs');

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const payerPrivateKeyBase58 = 'YOUR_PHANTOM_WALLET_1_PRIVATE_KEY';
const payerSecretKey = bs58.default.decode(payerPrivateKeyBase58);
const payerKeypair = Keypair.fromSecretKey(payerSecretKey);
const userPubkey = new PublicKey('YOUR_WALLET_2_PUBLIC_KEY');

(async () => {
  const nonceKeypair = Keypair.generate();
  const rentExempt = await connection.getMinimumBalanceForRentExemption(NONCE_ACCOUNT_LENGTH);
  const tx = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payerKeypair.publicKey,
      newAccountPubkey: nonceKeypair.publicKey,
      lamports: rentExempt,
      space: NONCE_ACCOUNT_LENGTH,
      programId: SystemProgram.programId,
    }),
    SystemProgram.nonceInitialize({
      noncePubkey: nonceKeypair.publicKey,
      authorizedPubkey: userPubkey,
    })
  );
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  tx.sign(payerKeypair, nonceKeypair);
  const sig = await connection.sendRawTransaction(tx.serialize());
  await connection.confirmTransaction(sig);
  const nonceAccount = await connection.getNonce(nonceKeypair.publicKey, 'confirmed');
  const nonceData = {
    noncePubkey: nonceKeypair.publicKey.toString(),
    nonceValue: nonceAccount.nonce,
  };
  fs.writeFileSync('nonce-data.json', JSON.stringify(nonceData));
  console.log('Nonce created for user:', nonceData);
})();