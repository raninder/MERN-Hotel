import express, {Request, Response} from "express";
import User from "../models/user";
import jwt from 'jsonwebtoken';
import { check, validationResult } from "express-validator";

const router = express.Router();

// whenever this post request comoes /api/users/register 
// router.post("/register", 
router.post(
    "/register",
    [
      check("firstName", "First Name is required").isString(),
      check("lastName", "Last Name is required").isString(),
      check("email", "Email is required").isEmail(),
      check("password", "Password with 6 or more characters required").isLength({
        min: 6,
      }),
    ],
async ( req: Request, res: Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try{
        // check if user matches with user from db
        let user = await User.findOne({
            email: req.body.email,
        })

        //if user already exist
        if(user){
            return res.status(400).json({message:"user already exists"})
        }

        //user doesnt exist, create new one with email, passowrd, fname,lname
        user = new User(req.body)
        await user.save();

        const token = jwt.sign(
            { userId:user.id },
            process.env.JWT_SECRET_KEY as string, {
                expiresIn: "1d"
            }
        );

        // set httpCookie with token and options heeps in prodcution mode not development, maxge in millisecs(1d)
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })
        return res.sendStatus(200);
    }catch(error) {
        console.log(error)
        res.status(500).send({message: "something went wrong"})
    }
    }
)

export default router;