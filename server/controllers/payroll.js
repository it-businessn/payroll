import Payroll from "../models/payroll.js";
export const getAllPayroll = async (request, response) => {
    try {
        const result = await Payroll.find();
        response.status(200).json({ data: result });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
};
export const addPayroll = async (request, response) => {
    const records = request.body;
    records.map((item) => {
        item.lastPayDate = new Date().toISOString();
        item.nextPayDate = new Date().toISOString();
        item.deduction = 12;
        item.gross = item.annualSalary / 12;
        item.netPay = item.gross - item.deduction;
        item.currency = item.bankDetails.currency;
        return item;
    });
    try {
        const payroll = await Payroll.insertMany(records);
        response.status(200).json({ data: payroll });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: "Something went wrong",
        });
    }
};
