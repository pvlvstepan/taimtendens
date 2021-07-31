import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();
  db.query(
    `SELECT module.module_id, module.module_name, timetable_module.location, timetable_module.time_start, timetable_module.time_end FROM timetable_module INNER JOIN module ON module.module_id = timetable_module.module_id INNER JOIN timetable ON timetable.timetable_id = timetable_module.timetable_id INNER JOIN intake_module ON intake_module.module_id = timetable_module.module_id WHERE timetable.intake_id = '${req.body.intake}' AND timetable_module.date = '${req.body.date}'  AND intake_module.active = 1;`,
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
