import {NextRequest} from 'next/server'
import jwt from 'jsonwebtoken'


export const tokenData = (request) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        return decodedToken.id;
    } catch (error) {
        throw new Error(error);
    }

}