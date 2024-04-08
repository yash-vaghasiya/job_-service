const Jobs = require("./jobschema");

const getAllJob = async function () {
  try {
    const jobs = await Jobs.find().exec();
    return jobs;
  } catch (error) {
    throw error;
  }
};

const createjob = async function (newJob){ 
  try {
    const createdJob = await Jobs.create(newJob);
    return createdJob;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllJob,
  createjob,
};
