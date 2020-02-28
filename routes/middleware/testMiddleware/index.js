import ServiceJWT from '../../../services/jwt';

module.exports = (req, res, next) => {

    const create_token = new ServiceJWT().createToken({id: '1', user: 'test'});
    const decod_token = new ServiceJWT().verifyToken(create_token);

    res.json({
        index: 'test working',
        token: create_token,
        decod_token: decod_token,
        req: req.token_data
    })
}