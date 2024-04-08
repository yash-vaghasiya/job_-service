const httpStatus = require("http-status");
const Job = require("../model/jobmodel");

const getAllJob = async (req, res) => {
  try {
    const jobs = await Job.getAllJob();
    if (!jobs || jobs.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "No jobs found" });
    }
    res.status(httpStatus.OK).json({ message: "All jobs retrieved successfully", jobs });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

const createJob = async (req, res) => {
  const { data } = req.body;
  try {
    const newJob = await Job.createjob(data);
    res.status(httpStatus.CREATED).json({ message: "Job created successfully", newJob });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Failed to create job");
  }
};

module.exports = {
  getAllJob,
  createJob,
};
