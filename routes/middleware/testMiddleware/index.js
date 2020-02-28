import ServiceJWT from '../../../services/jwt';
import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = (req, res, next) => {

    const create_token = new ServiceJWT().createToken({id: '1', user: 'test'});
    const decod_token = new ServiceJWT().verifyToken(create_token);

    const session = {
        username: "Arwantys"
    }

    User.create(session, (err, session) => {

        if (err) throw err;
        
        if (session != null) {
            return res.json({ response: 'User ajouté', status: 'success'});
        } else {
            return res.json({ response: 'Oups, un problème est survenue', status: 'error' });
        }
        
    })
}