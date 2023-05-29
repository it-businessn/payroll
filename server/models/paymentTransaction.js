export const PaymentTransaction = {
    lastPayDate: {
        type: Date,
        required: false,
    },
    nextPayDate: {
        type: Date,
        required: false,
    },
    deduction: [
        {
            CPP: { type: Number, required: false },
            EI: { type: Number, required: false },
            Tax: { type: Number, required: false },
        },
    ],
    gross: {
        type: Number,
        required: true,
    },
    netPay: {
        type: Number,
        required: false,
    },
};
