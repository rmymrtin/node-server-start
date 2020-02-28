import jwt from 'jsonwebtoken';

export default class ServiceJWT {

    createToken(data) {
        const token = jwt.sign({data}, process.env.JWT_TOKEN);

        return token;
    }

    decodeToken(token) {
        var decoded = jwt.verify(token, process.env.JWT_TOKEN);

        return decoded;
    }

    verifyToken(token) {
        try {

            var verify = jwt.verify(token, process.env.JWT_TOKEN);

            return verify;

          } catch(err) {

            return false;

          }
    }

}