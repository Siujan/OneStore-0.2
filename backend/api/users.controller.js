import UsersDAO from "../dao/usersDAO.js"
import bcrypt from 'bcrypt'


export default class UsersController {

    static async apiInsertUser(req,res,next){
        try{
            const username = req.body.username;
            const password = bcrypt.hashSync(req.body.password,parseInt(process.env.SALT_ROUND))
            const email = req.body.email;
            const created_on = new Date();
            const UserResponse = await UsersDAO.insertUser(username,password,email,created_on);
            next(null, UserResponse.ops[0])
        }catch(e){
            console.log("Something wrong with inserting user into the database")
            res.status(500).json({error: e.message});
        }
    }

    static async apiGetUsernameAvailability(req,res){
        try{
            let username = req.params.username || {}
            let userRes = await UsersDAO.getUserNameAvailability(username);
            res.json({available: userRes == null})
        }catch(e){
            console.log("Something wrong with checking user name availability")
            res.status(500).json({error: e.message});
        }
    }

    static async apiGetEmailAvailability(req,res){
        try{
            let email = req.params.email || {}
            let emailRes = await UsersDAO.getEmailAvailability(email);
            res.json({available: emailRes == null})
        }catch(e){
            console.log("Something wrong with checking email availability")
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateUser(req,res,next){
        try{
            let id = req.user._id;
            let username = req.body.username || req.user.username || {};
            let fullname = req.body.fullname || req.user.fullname || {};
            let email = req.body.email || req.user.email || {};
            let phone = req.body.phone || req.user.phone || {};
            let updated_date = new Date();
            const userResponse = await UsersDAO.updateUser(id,username,fullname,email,phone,updated_date);
            
            var {error} = userResponse;
            if(error) res.status(400).json({error})

            if(userResponse.modifiedCount === 0) 
                throw new Error(
                    "Unable to update user"
                )
            
            res.json({ status: "success" })
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
}