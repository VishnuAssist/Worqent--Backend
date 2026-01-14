// models/Leave.js
import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    leaveType: {
      type: String,
      required: true,
      index: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    leaveReason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.index({ leaveType: 1 });
schema.index({ startDate: 1, endDate: 1 });

const Leave = model("Leave", schema);
export default Leave;
