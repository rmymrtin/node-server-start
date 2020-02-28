import ServiceJWT from '../services/jwt';

export function verifyJWT_MW(req, res, next) {

    let token = req.headers.authorization;

    new ServiceJWT().verifyTokenPromise(token)
        .then((decodedToken) => {
            req.token_data = decodedToken.data
            next()
        })
        .catch((err) => {
            res.status(400)
                .json({ message: "Token invalide", status: 'error', statusCode: 400 })
        })
}