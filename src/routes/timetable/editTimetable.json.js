import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();
  db.query(`UPDATE timetable_module SET module_id = '${req.body.module_id}', date = '${req.body.date}', time_start = '${req.body.time_start}', time_end = '${req.body.time_end}', location = '${req.body.location}' WHERE timeslot_id = '${req.body.timeslot_id}'`, (err, results, fields) => {
    if (err) {
      console.log('[mysql]:', err.message);
      res.end(JSON.stringify({ error: 'Something went wrong...' }));
    } else {
      res.end(JSON.stringify({ message: 'OK' }));
    }
  });
}