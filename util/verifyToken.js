// import jwt from 'jsonwebtoken'

// export const verifytoken = token =>{
//     return jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
//         if(error){
//             return false;
//         }else{
//             return decoded;
//         }
//     })
// }

import jwt from 'jsonwebtoken'

export const verifytoken = token => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        return decoded;
    } catch (error) {
        return false;
    }
}