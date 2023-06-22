export const BankDetail = {
    currency: {
        type: String,
        required: false,
    },
    accountNumber: {
        type: String,
        required: false,
    },
    branchTransitNumber: { type: String, required: false },
    institutionNumber: { type: String, required: false },
    created: {
        type: Date,
        default: new Date().toISOString(),
    },
};
