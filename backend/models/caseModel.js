import mongoose, { Schema } from "mongoose";

const caseSchema = new Schema(
  {
    
    caseTitle: {
      type: String,
      required: [true, "Case title is required"],
      trim: true,
    },

    caseType: {
      type: String,
      required: [true, "Case type is required"],
      enum: ["Civil", "Criminal", "Family", "Writ", "Other"],
    },

    caseNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    cnrNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      match: /^[A-Za-z0-9]{16}$/,
    },

    court: {
      type: String,
      required: true,
      enum: ["District Court", "High Court", "Supreme Court"],
    },

    nextHearingDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Ongoing", "Closed", "Disposed"],
      default: "Pending",
    },

    // 👥 Party Details
    petitioner: {
      fullName: {
        type: String,
        required: [true, "Petitioner's name is required"],
        trim: true,
      },
      address: {
        type: String,
        required: [true, "Petitioner's address is required"],
      },
      contactNumber: {
        type: String,
        required: [true, "Petitioner's contact number is required"],
        match: /^[6-9]\d{9}$/,  
      },
      aadharNumber: {
        type: String,
        required: [true, "Petitioner's Aadhar number is required"],
        match: /^\d{12}$/,  
      },
    },

    advocate: {
      name: {
        type: String,
        required: [true, "Advocate name is required"],
      },
      barCouncilRegNo: {
        type: String,
        required: [true, "Bar Council registration number is required"],
      },
      contactNumber: {
        type: String,
        required: [true, "Advocate contact number is required"],
        match: /^[6-9]\d{9}$/,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Case = mongoose.model("Case", caseSchema);
