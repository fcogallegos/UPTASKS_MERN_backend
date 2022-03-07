import User from '../models/User.js'
import generateId from '../helpers/generateId.js';


const register = async (req, res) => {
    //console.log(req.body);

    //avoid duplicate records
    const { email } = req.body;
    const existUser = await User.findOne({ email });

    if( existUser ) {
        const error = new Error('already registered user');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        user.token = generateId();
        const storedUser = await user.save();
        res.json( storedUser );

        console.log(user);
    } catch (error) {
        console.log(error);
    }
    
};

const authenticate = async (req, res) => {
    
    const { email, password } = req.body;
    
    //check if the user exist
    const user = await User.findOne({ email });
    if( !user ) {
        const error = new Error('The user not exist');
        return res.status(404).json({ msg: error.message });
    }

    //check if the user is confirmed
    if( !user.confirmed ) {
        const error = new Error('Your account has not been confirmed');
        return res.status(403).json({ msg: error.message });
    }

    //check his password
    if( await user.checkPassword(password) ) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        })    
    } else {
        const error = new Error('The password is incorrect');
        return res.status(403).json({ msg: error.message });
    }

}

export {
    register,
    authenticate
}