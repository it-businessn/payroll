import bcrypt from "bcryptjs";
import currencyMapper from "country-currency-map";
import moment from "moment";
import otpGenerator from "otp-generator";
export const generateOTP = () => {
    const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
    });
    return OTP;
};
export const encryptPassword = async (password) =>
    await bcrypt.hash(password, 10);

export const calculatePay = (annualSalary, paymentStartDate) => {
    let lastPayDate = moment(paymentStartDate);
    let nextPayDate = moment(paymentStartDate)
        .add(1, "months")
        .subtract(1, "day");
    let deduction = 0;
    let gross = annualSalary / 12;
    let netPay = gross - deduction;
    return { lastPayDate, nextPayDate, deduction, gross, netPay };
};

export const getCurrencyAndUpdateBankDetails = (request) => {
    let getCurrencyAbbreviation = currencyMapper.getCurrencyAbbreviation;
    let currency = getCurrencyAbbreviation(request.country);
    let accountNumber = request.accountNumber;
    let branchTransitNumber = request.branchTransitNumber;
    let institutionNumber = request.institutionNumber;
    return { currency, accountNumber, branchTransitNumber, institutionNumber };
};

export const getUserAttendanceDetails = (request, user) => {
    let totalLeaves = 15;
    let requestedLeaves = request.requestedLeaves;
    let usedLeaves = 0; //to be updated after user has not cancelled after end date of requested leave period
    let leaveBalance = totalLeaves - usedLeaves - requestedLeaves;
    let leaveReason = request.leaveReason;
    let leaveDetails =
        request.role === "Employee"
            ? {
                  leaveBalance,
                  totalLeaves,
                  requestedLeaves,
                  usedLeaves,
                  leaveReason,
                  leaveApproved: false,
                  leaveRequestDecisionComment: "",
                  leaveRequestStatus: "Pending",
              }
            : {
                  leaveBalance,
                  totalLeaves,
                  requestedLeaves,
                  usedLeaves: totalLeaves - requestedLeaves,
                  leaveReason,
                  leaveApproved: request.leaveApproved,
                  leaveRequestDecisionComment:
                      request.leaveRequestDecisionComment,
                  leaveRequestStatus:
                      request.leaveApproved === "true"
                          ? "Approved"
                          : "Rejected",
              };
    return leaveDetails;
};
