import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
    try {
        const token = request?.headers?.authorization?.split(" ")[1];
        const isCustomAuth = token && token.length < 500;
        let verifiedUserDecodedData;
        if (token && isCustomAuth) {
            verifiedUserDecodedData = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY
            );
            request.userId = verifiedUserDecodedData?.id;
        } else {
            verifiedUserDecodedData = jwt.decode(token);
            request.userId = verifiedUserDecodedData?.sub; //sub differentiates every id
        }
        next();
    } catch (error) {
        console.log(error);
    }
};
export default auth;
