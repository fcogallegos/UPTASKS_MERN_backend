import User from '../models/User.js'
import generateId from '../helpers/generateId.js';
import generateJWT from '../helpers/generateJWT.js';
import { emailRegister, emailForgotPassword } from '../helpers/email.js';


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
        await user.save();

        //send confirmation email
        emailRegister({
            email: user.email,
            name: user.name,
            token: user.token
        });

        res.json( { msg: 'User created successfully, check your email to confirm the password' } );

        //console.log(user);
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
            email: user.email,
            token: generateJWT(user._id)
        })    
    } else {
        const error = new Error('The password is incorrect');
        return res.status(403).json({ msg: error.message });
    }

}

const confirm = async (req, res) => {
    
    const { token } = req.params;
    const userConfirm = await User.findOne({ token });

    if( !userConfirm ) {
        const error = new Error('Token is invalid');
        return res.status(403).json({ msg: error.message });
    }

    try {
        
        userConfirm.confirmed = true;
        userConfirm.token = '';
        await userConfirm.save();
        res.json({ msg: 'User confirmed successfull' });

        //console.log( userConfirm );
    } catch (error) {
        console.log(error);
    }
};

const forgetPassword = async (req, res) => {
    
    const { email } = req.body;
    const user = await User.findOne({ email });
    if( !user ) {
        const error = new Error('The user not exist');
        return res.status(404).json({ msg: error.message });
    }

    try {
        user.token = generateId();
        await user.save();

        //send email
        emailForgotPassword({
            email: user.email,
            name: user.name,
            token: user.token
        })

        res.json({ msg: 'We have sent an email with the instruccions' });
    } catch (error) {
        console.log(error);
    }
};

const checkToken = async (req, res) => {

    const { token } = req.params;

    const tokenValid = await User.findOne({ token });

    if( tokenValid ) {
        res.json({ msg: "Token valid and the user exist" });
    } else {
        const error = new Error('Token is invalid');
        return res.status(404).json({ msg: error.message });
    }
};

const newPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token });

    if( user ) {
        user.password = password;    
        user.token = "";
        try {
            await user.save();
            res.json({ msg: 'Password modified successfully' });
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error('Token is invalid');
        return res.status(404).json({ msg: error.message });
    }
};

const profile = async (req, res) => {

    const { user } = req;

    res.json({ user });
};

export {
    register,
    authenticate,
    confirm,
    forgetPassword,
    checkToken,
    newPassword,
    profile
}