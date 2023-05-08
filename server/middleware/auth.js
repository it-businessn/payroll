import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        const isCustomAuth = token && token.length < 500;
        let verifiedUserDecodedData;
        if (token && isCustomAuth) {
            verifiedUserDecodedData = jwt.verify(token, "test");
            req.userId = verifiedUserDecodedData?.id;
        } else {
            verifiedUserDecodedData = jwt.decode(token);
            req.userId = verifiedUserDecodedData?.sub; //sub differentiates every id
        }
        next();
    } catch (error) {
        console.log(error);
    }
};
export default auth;
