import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();

  const { timetable_id, timeslot_id } = req.body;

  db.query(`DELETE FROM timetable_module WHERE timeslot_id = ${timeslot_id}`, err => {
    if (err) {
      console.log('[mysql]:', err.message);
      res.end(JSON.stringify({ error: 'Something went wrong...' }));
      db.end();
    } else {
      db.query(`DELETE FROM timetable WHERE timetable_id = ${timetable_id}`, err => {
        if (err) {
          console.log('[mysql]:', err.message);
          res.end(JSON.stringify({ error: 'Something went wrong...' }));
          db.end();
        } else {
          res.end(JSON.stringify({ message: 'OK' }));
          db.end();
        }
      });
    }

  });
}
