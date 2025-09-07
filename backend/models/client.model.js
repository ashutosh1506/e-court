import mongoose,{Schema} from 'mongoose';

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

export const Client = mongoose.model('Client',clientSchema);