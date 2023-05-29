export const BankDetail = {
    currency: {
        type: String,
        required: false,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    transitNumber: { type: String, required: true },
    branchNumber: { type: String, required: true },
    branchName: { type: String, required: true },
    created: {
        type: Date,
        default: new Date().toISOString(),
    },
};
