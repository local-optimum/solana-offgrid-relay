# Solana Off-Grid Transaction Relay

A decentralized tool to generate Solana transactions offline and relay them later via a node, built for privacy, resilience, and real-world use cases like censorship resistance and off-grid access.

## Why This Exists
In a world with internet blackouts, censorship, or spotty connectivity, financial freedom shouldn’t stop. This project lets users:
- Create and sign Solana transactions (e.g., sending SOL) without internet.
- Save them locally and relay them when connectivity returns—via a peer or node.
- Leverage Solana’s speed and low costs for seamless, scalable operation.

Target users: activists, rural communities, or anyone valuing autonomy over centralized reliance.

## Current Status
- **Phase 1 (In Progress):** Offline transaction generator—creates signed `.bin` files for later relay.
- **Next Up:** Relay node to broadcast transactions to Solana Devnet.

## Getting Started
### Prerequisites
- **Node.js**: v16+ (LTS recommended)
- **Git**: For version control
- **Solana Knowledge**: Basic understanding of wallets and transactions

### Setup
1. **Clone the Repo:**
   ```bash
   git clone https://github.com/local-optimum/solana-offgrid-relay.git
   cd solana-offgrid-relay
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Generator:**
   ```bash
   node generate-txn.js
   ```

- Outputs txn.bin—a signed transaction file.
- Replace `GjS3HWjhLLh1xmQJBZsRpddaqnmf58myNfe1N3X7R56W` in generate-txn.js with a Devnet wallet address (e.g., from Phantom).

How It Works (So Far)
1. Generate: Script creates a SOL transfer transaction, signs it offline with a dummy blockhash, and saves it as txn.bin.
2. Next Steps: A relay node will update the blockhash and send it to Solana—coming soon!

### Roadmap
- Offline transaction generator
- Basic relay node (Devnet)
- Web UI for generating and relaying
- Robustness: Security, scalability, privacy features

### Contributing
This is a solo project for now—stay tuned for open-source plans once it’s battle-tested!

### License
TBD—likely MIT once public.

### Contact
Built by Local Optimum—ping me on X or GitHub for collabs or feedback!
