import { model, Schema } from "mongoose";
import { AllowedCategories } from "../constants/dictionary.constants.js";

const schema = new Schema(
  {
    category: {
      type: String,
      enum: AllowedCategories,
      required: true,
      uppercase: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Dictionary = model("Dictionary", schema);
export default Dictionary;
