import mongoose, { Schema } from "mongoose";

const caseSchema = new Schema(
  {
    court: {
      type: String,
      required: true,
      enum: ["District Court", "High Court", "Supreme Court"]
    },

    caseType: {
      type: String,
      required: true,
      enum: ["Civil", "Criminal", "Family", "Writ", "Other"]
    },

    shortCaseTitle: {
      type: String,
      required: true,
    },

    petitioner: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      contact: { type: String, required: true },
      aadhar: { type: String, required: true }
    },

    advocate: {
      name: { type: String, required: true },
      barRegNo: { type: String, required: true },
      contact: { type: String, required: true }
    },

    caseNumber: { 
      type: Number, 
      required: true, 
      unique: true 
    },

    cnrNumber: { 
      type: String, 
      required: true, 
      unique: true 
    },

    nextHearingDate: { 
      type: Date, 
      required: true 
    },

    status: { 
      type: String, 
      default: "Pending" 
    }
  },
  { timestamps: true }
);

export const Case = mongoose.model("Case", caseSchema);
