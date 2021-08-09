import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();

  db.query(
    `SELECT tm.timeslot_id FROM student s INNER JOIN intake_module im ON s.intake_id = im.intake_id INNER JOIN timetable_module tm ON tm.module_id = im.module_id WHERE tm.slot_is_open = 1 AND tm.OTP = '${req.body.OTP}' AND s.user_tp = ${req.body.user_tp}`,
    (err, results) => {
      if (err) {
        console.log('[mysql]:', err.message);
        res.end(JSON.stringify({ error: 'Something went wrong...' }));
        db.end();
      } else {
        res.end(JSON.stringify(results));
        db.end();
      }
    }
  );
}