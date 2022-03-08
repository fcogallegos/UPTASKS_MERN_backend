

const checkAuth = (req, res, next) => {
    console.log('from checkauth');

    next();
};

export default checkAuth;