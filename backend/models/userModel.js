const mongoose = require("mongoose")
const Report = require("./reportModel")

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true,
    unique: true
   },
   password: {
    type: String,
    required: true
   },
   isAdmin: {
    type: Boolean,
    required: true,
    default: false
   },
   profilePicture: {
    type: String,
    default:
      "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=612x612&w=0&h=8J3VgOZab_OiYoIuZfiMIvucFYB8vWYlKnSjKuKeYQM=",
   },
   description: {
    type: String,
    default: "Student Description",
   },
},{
    timestamps: true
})

// Delete reports of the user when a user is deleted
userSchema.post('remove',async function(res, next){
    await Report.deleteMany({user: this._id});
    next();
})

const userModel = mongoose.model("users",userSchema)
module.exports = userModel