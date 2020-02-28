import jwt from 'jsonwebtoken';

export default class ServiceJWT {

    createToken(data) {
        const token = jwt.sign({ data }, process.env.JWT_SECRET);

        return token;
    }

    decodeToken(token) {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        return decoded;
    }

    verifyToken(token) {
        try {

            var verify = jwt.verify(token, process.env.JWT_SECRET);

            return verify;

        } catch (err) {

            return false;

        }
    }

    verifyTokenPromise(token) {
        return new Promise((resolve, reject) => {

            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {

                if (err || !decodedToken) {
                    return reject(err)
                }

                resolve(decodedToken)

            })
            
        })
    }

}