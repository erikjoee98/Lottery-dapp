require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const MNEMONIC = process.env.MNEMONIC;
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
console.log("MNEMONIC:", MNEMONIC ? "Successfully loaded" : "Not found");
console.log("INFURA_PROJECT_ID:", INFURA_PROJECT_ID ? "Successfully loaded" : "Not found");
module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: MNEMONIC
        },
        providerOrUrl: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
        numberOfAddresses: 5,  // Az 5 azt jelenti, hogy 5 címet generál
        shareNonce: true
      }),
      network_id: 11155111,   // Sepolia hálózat ID-je
      gas: 4000000,           // Gas limit
      gasPrice: 10000000000,  // Gas ár (10 gwei)
      confirmations: 2,       // Hány blokkon keresztül várunk megerősítésekre
      timeoutBlocks: 200,     // Hány blokkon keresztül vár a tranzakció
      skipDryRun: true        // teszt kihagyása
    }
  },

  compilers: {
    solc: {
      version: "0.8.19",  // Solidity verzió
    }
  }
};