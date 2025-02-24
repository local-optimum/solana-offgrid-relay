const { Connection, Transaction } = require('@solana/web3.js');
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

app.post('/relay', upload.array('txns'), async (req, res) => {
  try {
    const signatures = [];
    for (const file of req.files) {
      const serializedTxn = fs.readFileSync(file.path);
      const txn = Transaction.from(serializedTxn);
      const signature = await connection.sendRawTransaction(txn.serialize());
      signatures.push(signature);
      fs.unlinkSync(file.path);
    }
    await Promise.all(signatures.map(sig => connection.confirmTransaction(sig)));
    res.send(`Transactions relayed! Signatures: ${signatures.join(', ')}`);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.listen(3000, () => console.log('Relay node running on port 3000'));