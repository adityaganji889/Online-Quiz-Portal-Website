const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require("../cloudinary")
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/tokenModel");

//user registration
const register = async(req,res) => {
   try{
     // check if user already exists
     const userExists = await User.findOne({email: req.body.email})
     if(userExists){
        res.status(200).send({
            message: "User already exists.",
            success: false
        })
     }
     else{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save()
        res.status(200).send({
            message: "User registered successfully.",
            success: true
        })
     }
   }
   catch(error){
      res.status(400).send({
        message: error.message,
        data: error,
        success: false
      })
   }
}

//user login
const login = async(req,res) => {
   try{
     //check if user exists
     const user = await User.findOne({email: req.body.email})
     if(user){
        const passwordsMatched = await bcrypt.compare(req.body.password,user.password)
        //check if passwords are valid
        if(passwordsMatched){
            const token = jwt.sign({
                userid: user._id
            },process.env.JWT_SECRET,{
                expiresIn: "1d"
            })
            res.send({
              message: "User logged in successfully",
              data: token,
              success: true,
            })
        }
        else{
            res.status(200).send({
                message: "Invalid Password",
                success: false
            })
        }
     }
     else{
        res.status(200).send({
            message: "User doesnot exist.",
            success: false
        })
     }     
   }
   catch(error){
    res.status(400).send({
        message: error.message,
        data: error,
        success: false
    })
   }
}

//get user info
const getUserInfo = async(req,res) => {
   try{
      const user = await User.findOne({_id: req.body.userid})
      if(user){
        res.status(200).send({
            message: "User Info fetched successfully",
            data: user,
            success: true
        })
      }
      else{
        res.status(200).send({
            message: "Failed to fetch user info",
            data: null,
            success: false
        })
      }
   }
   catch(error){
    res.status(400).send({
        message: error.message,
        data: error,
        success: false
    })
   }
}


const sendPasswordResetLink = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if(user){
        await sendEmail(user, "resetpassword");
        res.send({
        success: true,
        message: `Password reset link sent to your email : ${user.email} successfully.`,
        data: null
       });
      }
      else{
        res.send({
          success: false,
          message: `Account with email : ${req.body.email} does not exists.`,
          data: null
         });
      }
    } catch (error) {
      res.status(400).send({
          success: false,
          data: error,
          message: error.message
      });
    }
  };
  
  const resetPassword = async (req, res) => {
    try {
      const tokenData = await Token.findOne({ token: req.body.token });
      if (tokenData) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.pass, salt);
        const user = await User.findOne({ _id: tokenData.userid })
        user.password = hashedPassword;
        await user.save();
        await Token.findOneAndDelete({ token: req.body.token });
        res.status(200).send({
          data: null,
          success: true,
          message: `Account with email : ${user.email} Password Resetted Successfully.`
        });
      } else {
          res.status(400).send({
              data: null,
              success: false,
              message: `Expired or Invalid Link.`
          });
      }
    } catch (error) {
      res.status(400).send({
          success: false,
          data: error,
          message: error.message
      });
    }
  };
  
//update user profile info 
const updateProfile = async(req,res) => {
    try{
       const image = req.body.image;
       const user = await User.findOne({_id: req.body.userid})
       let uploadedImage;
       let uploadedImageSecureURL = user.profilePicture;
       if(user.profilePicture !== image){
        //upload image to cloudinary and get URL
       uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "Mern_Quiz_Profiles",
       })
        uploadedImageSecureURL = uploadedImage.secure_url
       }
       if(user){
        user.profilePicture = uploadedImageSecureURL;
        user.description = req.body.desc;
        await user.save();
        res.status(200).send({
            message: "User Profile Updated Successfully.",
            data: user,
            success: true
        })
       }
    }
    catch(error){
        res.status(400).send({
            message: error.message,
            data: error,
            success: false
        })
    }
  }

module.exports = { register, login, getUserInfo, sendPasswordResetLink, resetPassword, updateProfile }