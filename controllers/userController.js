import User from '../models/User.js'

const register = async (req, res) => {
    //console.log(req.body);

    try {
        const user = new User(req.body);
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