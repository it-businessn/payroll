export const BankDetail = {
    currency: {
        type: String,
        required: false,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    branchTransitNumber: { type: String, required: true },
    institutionNumber: { type: String, required: true },
    created: {
        type: Date,
        default: new Date().toISOString(),
    },
};
