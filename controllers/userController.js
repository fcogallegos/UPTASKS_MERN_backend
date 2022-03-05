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


export {
    register
}