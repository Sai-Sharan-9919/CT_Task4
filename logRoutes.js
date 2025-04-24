const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

router.post('/log', async (req, res) => {
  const { site, duration } = req.body;
  const log = new Log({ site, duration });
  await log.save();
  res.status(200).send('Logged');
});

router.get('/analytics', async (req, res) => {
  const logs = await Log.aggregate([
    {
      $group: {
        _id: "$site",
        totalTime: { $sum: "$duration" }
      }
    }
  ]);
  res.json(logs);
});

module.exports = router;
