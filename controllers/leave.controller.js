// controllers/leave.controller.js
import Leave from "../models/leave.model.js";

export const LeaveGet = async (req, res) => {
  try {
    const {
      SearchTerm,
      LeaveType, // filter from dictionary
      PageNumber = 1,
      PageSize = 10,
      OrderBy = "createdAt",
    } = req.query;

    const page = Math.max(Number(PageNumber), 1);
    const limit = Math.max(Number(PageSize), 1);
    const skip = (page - 1) * limit;

    const filter = {};

    /* ---------------- FILTER BY LEAVE TYPE ---------------- */
    if (LeaveType) {
      filter.leaveType = LeaveType; // e.g. "CASUAL", "SICK"
    }

    /* ---------------- SEARCH ---------------- */
    if (SearchTerm) {
      filter.$or = [
        { leaveType: { $regex: SearchTerm, $options: "i" } },
        { leaveReason: { $regex: SearchTerm, $options: "i" } },
      ];
    }

    /* ---------------- QUERY ---------------- */
    const [items, totalCount] = await Promise.all([
      Leave.find(filter)
        .sort({ [OrderBy]: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Leave.countDocuments(filter),
    ]);

    /* ---------------- RESPONSE ---------------- */
    res.status(200).json({
      items,
      metaData: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        pageSize: limit,
        totalCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const LeaveGet = async (req, res) => {
//   try {
//     const leave = await Leave.find();
//     res.status(200).json(leave);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const LeaveCreate = async (req, res) => {
  const newLeave = new Leave({
    leaveType: req.body.leaveType,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    leaveReason: req.body.leaveReason,
  });
  try {
    const leave = await newLeave.save();
    res.status(200).json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const LeaveUpdate = async (req, res) => {
  try {
    const updateLeave = await Leave.findOneAndUpdate(
      { _id: req.params.id },
      {
        leaveType: req.body.leaveType,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        leaveReason: req.body.leaveReason,
      },
      { new: true }
    );
    res.status(200).json(updateLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const LeaveDelete = async (req, res) => {
  const leaveId = req.params.id;
  try {
    await Leave.deleteOne({ _id: leaveId });
    res.json({ message: "Leave Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
