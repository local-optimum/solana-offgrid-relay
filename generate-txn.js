const { Keypair, Transaction, SystemProgram, PublicKey } = require('@solana/web3.js');
const fs = require('fs');

// For testing, generate a dummy keypair (real users will provide their own)
const senderKeypair = Keypair.generate();
console.log('Sender Public Key:', senderKeypair.publicKey.toString());

// Replace with a test recipient (e.g., from Phantom Devnet wallet)
const recipientPubkey = new PublicKey('GjS3HWjhLLh1xmQJBZsRpddaqnmf58myNfe1N3X7R56W');

// Create a SOL transfer transaction
const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey: recipientPubkey,
    lamports: 100000000, // 0.1 SOL (100 million lamports)
  })
);

// Sign offline with a dummy blockhash
transaction.recentBlockhash = '11111111111111111111111111111111'; // Placeholder
transaction.sign(senderKeypair);

// Save to file
const serializedTxn = transaction.serialize();
fs.writeFileSync('txn.bin', serializedTxn);

console.log('Transaction saved as txn.bin');