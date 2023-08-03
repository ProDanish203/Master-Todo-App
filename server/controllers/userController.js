import UserModel from "../models/userModel.js";

export const getProfile = async (req, res, next) => {
    try{
        const user = await UserModel.findById(req.user.userId);
        if(!user) return next("Authentication Error");

        user.password = undefined;
        res.status(200).send({
            success: true,
            user
        })
    }catch(error){
        next(error)
    }
}