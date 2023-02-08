// export const obtainTokenFromHeader = req =>{
//     const headersDetails = req.headers;
//     const token = headersDetails['authorization'].split(" ")[1] 
//     console.log(token);
//     if(token !== undefined){
//         return token
//     }else{
//         return{
//             status: "error",
//             message: "It seems there is no token attached to the header"
//         }
//     }
// }

export const obtainTokenFromHeader = req => {
    const headersDetails = req.headers;
    if (!headersDetails.authorization || !headersDetails.authorization.startsWith("Bearer ")) {
        throw new Error("It seems there is no token attached to the header or the format is incorrect.");
    }
    const token = headersDetails.authorization.split(" ")[1];
        return token;
    };