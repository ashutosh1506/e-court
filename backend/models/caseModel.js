import mongoose, { Schema } from "mongoose";
 

const caseSchema = new Schema({

    caseType :{
        type: String,
        required: true,

    },

    caseNumber :{
        type: Number,
        required: true,
        unique: true,
    },

    cnrNumber :{
        type: String,
        required: true,
        unique: true,
    },

    nextHearingDate :{
        type: Date,
        required: true,
    },
    
    status :{
        type: String,
    },

    court :{
        type: String
    }

},
{
    timestamps: true
})


export const Case = mongoose.model("Case", caseSchema);