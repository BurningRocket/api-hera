import jwt from 'jsonwebtoken';

export class AuthMiddleware {
    constructor() { }

    verifyToken(req: any, res: any, next: any) {

        //FIXME: Not receiving the token from authorization header
        let token = req.headers['Authorization'] || req.headers['authorization'];
        console.log(token)

        console.log(token)

        if (!token) {
            return res.status(403).send("Um token é nescessário para validar");
        }

        token = token.replace('Bearer ', '');

        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        } catch (err) {
            return res.status(401).send("Token inválido");
        }

        return next();
    }
}