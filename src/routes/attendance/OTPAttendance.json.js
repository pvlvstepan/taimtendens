import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();

  if (req.body.open == true) {
    db.query(
      `UPDATE timetable_module SET slot_is_open = 1, OTP = '${req.body.OTP}' WHERE timeslot_id = ${req.body.timeslot_id}`,
      (err) => {
        if (err) {
          console.log('[mysql]:', err.message);
          res.end(JSON.stringify({ error: 'Something went wrong...' }));
          db.end();
        } else {
          res.end(JSON.stringify({ message: 'OK' }));
          db.end();
        }
      }
    );
  } else {
    db.query(
      `UPDATE timetable_module SET slot_is_open = 0, OTP = NULL WHERE timeslot_id = ${req.body.timeslot_id}`,
      (err) => {
        if (err) {
          console.log('[mysql]:', err.message);
          res.end(JSON.stringify({ error: 'Something went wrong...' }));
          db.end();
        } else {
          res.end(JSON.stringify({ message: 'OK' }));
          db.end();
        }
      }
    );
  }

}