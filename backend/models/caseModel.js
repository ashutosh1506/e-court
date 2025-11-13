import mongoose, { Schema } from "mongoose";

const caseSchema = new Schema(
  {
    court: {
      type: String,
      required: true,
      enum: ["District Court", "High Court", "Supreme Court"],
      
    },

    caseType: {
      type: String,
      required: true,
      enum: ["Civil", "Criminal", "Family", "Writ", "Other"],
    },

    shortCaseTitle: {
      type: String,
      required: true,
      trim: true,
    },

    // Petitioner Details
    petitioner: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/, // Indian mobile
      },
      aadhar: {
        type: String,
        required: true,
        match: /^\d{12}$/, // 12 digits
      },
    },

    // Advocate Details
    advocate: {
      name: {
        type: String,
        required: true,
      },
      barRegNo: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/, // Indian mobile
      },
    },

    // Auto-generated Case Number
    caseNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    // Auto-generated CNR Number
    cnrNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      match: /^[A-Za-z0-9]{16}$/,
    },

    // 🗓 Next hearing auto = +30 days
    nextHearingDate: {
      type: Date,
      required: true,
    },

    // Status
    status: {
      type: String,
      enum: ["Pending", "Ongoing", "Closed", "Disposed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Case = mongoose.model("Case", caseSchema);
