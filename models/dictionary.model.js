import { model, Schema } from "mongoose";

const schema = new Schema({
  category: String,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  isActive: Boolean,
});


const Dictionary = model("Dictionary", schema);

export default Dictionary;