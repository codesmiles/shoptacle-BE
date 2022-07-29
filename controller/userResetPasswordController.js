module.exports.resetPassword = async (req, res) => {
    
    let token  = await req.params.token;
    let { password } = await req.body;
    
    // decrypt the token by bcrypt compareSync
    // compare with the token db
    // set a timer to deactivate the token after 1 hour
    // if match, update the password

    
    

    

    // const user = await User.findOne({ token });
    // if (user) {
    //     const passwordsMatch = bcrypt.compareSync(password, user.password);
    //     if (passwordsMatch) {
    //     user.password = password;
    //     user.token = null;
    //     await user.save();
    //     res.json({
    //         successful: true,
    //         message: `successfully changed password`,
    //     });
    //     } else {
    //     res.json({
    //         successful: false,
    //         message: `invalid token or password`,
    //     });
    //     }
    // } else {
    //     res.json({
    //     successful: false,
    //     message: `invalid token or password`,
    //     });
    // }
};