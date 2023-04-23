module.exports = {
  validator: {
    killRunningValidators: true,
    programs: [],
    accounts: [],
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
