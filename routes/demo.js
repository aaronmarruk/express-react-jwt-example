import express from 'express';

const router = express.Router();

/* GET some JSON. */
router.get('/', (req, res /* , next */) => {
  console.log('THISISCALLED');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ dataFromServer: 'Dummy data returned from server' }));
});

export default router;
