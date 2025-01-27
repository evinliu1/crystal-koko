import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// User Login Route
const loginUser = async (req,res) => {

    try {

        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({email});

        // If user does not exist
        if (!user) {
            return res.json({success:false, message:"User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            
            const token = createToken(user._id);
            res.json({success:true, token});

        } else {
            res.json({success:false, message:"Invalid credentials"});
        }

    } catch (error) {
    
        console.log(error);
        res.json({success:false, message:error.message});

    }

}

// User Register Route
const registerUser = async (req,res) => {

    try {

        const { name, email, password } = req.body;

        // Check if user/email exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"User already exists"});
        }

        // Validating email and password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter valid email"});
        }

        if (password.length < 8) {
            return res.json({success:false, message:"Your password is less than 8 characters"});
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        // Saving user
        const user = await newUser.save();

        const token = createToken(user._id)

        res.json({success:true, token})


    } catch (error) {

        console.log(error);
        res.json({success:false, message:error.message});

    }

}

// Admin Route
const adminLogin = async (req,res) => {

    try {

        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})

        } else {

            res.json({success:false,message:"Invalid Credentials"})

        }

    } catch (error) {

        console.log(error);
        res.json({success:false, message:error.message});

    }

}

export { loginUser, registerUser, adminLogin };