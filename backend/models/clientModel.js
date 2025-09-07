import mongoose,{Schema} from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';
const clientSchema = new Schema({
  
     fullName:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    },

},{
    timestamps:true
})

clientSchema.pre('save',async function(next){

   if(!this.isModified("password")){
       return next();
    }
    this.password=bcrypt.hash(this.password,10)
    next()
})

clientSchema.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password)
}

 clientSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,

        
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

clientSchema.methods.generateRefreshToken = function(){
     
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const Client = mongoose.model('Client',clientSchema);
 