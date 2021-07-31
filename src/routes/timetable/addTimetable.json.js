import {initDB} from '@lib/mysql';

export function post(req, res) {
  const {db} = initDB();
  db.query(
    `INSERT INTO timetable (intake_id, timetable_id, added) VALUES ('${req.body.intake_id}', NULL, CURRENT_TIMESTAMP)`,
    err => {
      if (err) {
        console.log('[mysql]:', err.message);
        res.end(JSON.stringify({error: 'Something went wrong...'}));
      } else {
        db.query(
          `SELECT timetable_id FROM timetable ORDER BY added DESC LIMIT 1`,
          (err, results) => {
            if (err) {
              console.log('[mysql]:', err.message);
              res.end(JSON.stringify({error: 'Something went wrong...'}));
            } else {
              db.query(
                `INSERT INTO timetable_module (module_id, timetable_id, time_start, time_end, date, timeslot_id, slot_is_open, location, was_signed) VALUES ('${
                  req.body.module_id
                }', '${JSON.stringify(results[0]['timetable_id'])}', '${
                  req.body.time_start
                }', '${req.body.time_end}', '${req.body.date}', NULL, 0, '${
                  req.body.location
                }', 0)`,
                err => {
                  if (err) {
                    console.log('[mysql]:', err.message);
                    res.end(JSON.stringify({error: 'Something went wrong...'}));
                  } else {
                    res.end(JSON.stringify({message: 'OK'}));
                  }
                }
              );
            }
          }
        );
      }
    }
  );
}
