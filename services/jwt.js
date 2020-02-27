import jwt from 'jsonwebtoken';

export default class ServiceJWT {

    createToken(data) {
        const token = jwt.sign({data}, __config.jwt_token);

        return token;
    }

    decodeToken(token) {
        var decoded = jwt.verify(token, __config.jwt_token);

        return decoded;
    }

    verifyToken(token) {
        try {

            var verify = jwt.verify(token, __config.jwt_token);

            return verify;

          } catch(err) {

            return false;

          }
    }

}