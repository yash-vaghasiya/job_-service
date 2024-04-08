const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      "submitted",
      "in_progress",
      "completed",
      "active",
      "closed",
      "finished",
      "canceled",
      "failed",
    ],
    default: "submitted",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
