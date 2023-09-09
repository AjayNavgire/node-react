const Job = require('../models/jobModel');

exports.addJob = async (req, res) => {

  try {
    const { name, complexity } = req.body;
    const job = new Job({ name, complexity });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit job' });
  }
};

exports.getJob = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: 1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}

const jobQueue = [];
let isProcessing = false;

async function processJobQueue() {
  if (isProcessing) return;
  isProcessing = true;

  while (jobQueue.length > 0) {
    const job = jobQueue[0];
    try {
      // Simulate job execution
      console.log(`Processing job: ${job.name}`);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated job execution time
      console.log(`Completed job: ${job.name}`);

      // Update job status in MongoDB
      await Job.findByIdAndUpdate(job._id, { status: 'completed' });

      jobQueue.shift(); // Remove the processed job from the queue
    } catch (err) {
      console.error(`Failed to process job: ${job.name}`);
      jobQueue.shift(); // Remove the failed job from the queue
    }
  }

  isProcessing = false;
}

setInterval(processJobQueue, 1000); // Check for new jobs every second