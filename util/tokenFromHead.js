export const obtainTokenFromHeader = req => {
    const headersDetails = req.headers;
    if (!headersDetails.authorization || !headersDetails.authorization.startsWith("Bearer ")) {
        throw new Error("It seems there is no token attached to the header or the format is incorrect.");
    }
    const token = headersDetails.authorization.split(" ")[1];
        return token;
    };