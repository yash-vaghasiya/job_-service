  const express = require('express');
  const router = express.Router();
  const jobController = require('../controller/jobcontroler');

  // Get all jobs
  router.get('/getall', jobController.getAllJob);


  router.post('/add', jobController.createJob);

  module.exports = router;
