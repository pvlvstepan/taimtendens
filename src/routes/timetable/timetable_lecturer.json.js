import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();
  db.query(
    `SELECT DISTINCT im.intake_id, m.module_name, tm.location, tm.date, tm.time_start, tm.time_end FROM timetable_module tm INNER JOIN module m ON m.module_ID = tm.module_id INNER JOIN timetable t ON t.timetable_id = tm.timetable_id INNER JOIN intake_module im ON im.intake_id = t.intake_id WHERE tm.module_id = '${req.body.module_id}' AND im.active = 1 AND ${req.body.nextWeek === false ? 'yearweek(DATE(tm.date), 1) = yearweek(curdate(), 1)' : 'yearweek(DATE(tm.date), 1) = yearweek(DATE_ADD(curdate(), INTERVAL 7 DAY), 1)'}`,
    (err, results) => {
      if (err) throw err;
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(results));
    }
  );
  db.end();
}
