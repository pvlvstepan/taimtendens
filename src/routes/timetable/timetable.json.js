import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();
  db.query(
    `SELECT DISTINCT m.module_id, m.module_name, im.intake_id, tm.location, tm.timeslot_id, tm.timetable_id, tm.date, tm.was_signed, tm.time_start, tm.time_end FROM timetable_module tm INNER JOIN module m ON m.module_ID = tm.module_id INNER JOIN timetable t ON t.timetable_id = tm.timetable_id INNER JOIN intake_module im ON im.intake_id = t.intake_id WHERE t.intake_id = '${req.body.intake
    }' AND im.active = 1 AND ${req.body.nextWeek === false
      ? 'yearweek(DATE(tm.date), 1) = yearweek(curdate(), 1)'
      : 'yearweek(DATE(tm.date), 1) = yearweek(DATE_ADD(curdate(), INTERVAL 7 DAY), 1)'
    }`,
    (err, results) => {
      if (err) throw err;
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(results));
      db.end();
    }
  );

}
