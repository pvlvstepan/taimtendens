import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();
  if (req.body.present === true) {
    db.query(
      `DELETE FROM attendance WHERE user_tp = ${req.body.user_tp} and timeslot_id = ${req.body.timeslot_id}`,
      (err) => {
        if (err) {
          console.log('[mysql]:', err.message);
          res.end(JSON.stringify({ error: 'Something went wrong...' }));
          db.end();
        } else {
          db.query(
            `INSERT INTO attendance (user_tp, attendance_id, timeslot_id) VALUES (${req.body.user_tp}, NULL, ${req.body.timeslot_id})`,
            (err) => {
              if (err) {
                console.log('[mysql]:', err.message);
                res.end(JSON.stringify({ error: 'Something went wrong...' }));
                db.end();
              } else {
                db.query(
                  `UPDATE timetable_module SET was_signed = 1 WHERE timeslot_id = ${req.body.timeslot_id}`,
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
          );
        }
      }
    );
  } else {
    db.query(
      `DELETE FROM attendance WHERE user_tp = ${req.body.user_tp} and timeslot_id = ${req.body.timeslot_id}`,
      (err) => {
        if (err) {
          console.log('[mysql]:', err.message);
          res.end(JSON.stringify({ error: 'Something went wrong...' }));
          db.end();
        } else {
          db.query(
            `UPDATE timetable_module SET was_signed = 1 WHERE timeslot_id = ${req.body.timeslot_id}`,
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
    );
  }

}