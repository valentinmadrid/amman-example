module.exports = {
  validator: {
    killRunningValidators: true,
    programs: [],
    accounts: [
      {
        label: "Pyth SOL/USD",
        accountId: "H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG",
        executable: false,
        cluster: 'https://api.mainnet-beta.solana.com'
      },
    ],
    jsonRpcUrl: "127.0.0.1",
    websocketUrl: "",
    commitment: "confirmed",
    ledgerDir: "./test-ledger",
    resetLedger: true,
    verifyFees: false,
    detached: false,
  },
  relay: {
    enabled: true,
    killlRunningRelay: true,
  },
  storage: {
    enabled: true,
    storageId: "mock-storage",
    clearOnStart: true,
  },
};
