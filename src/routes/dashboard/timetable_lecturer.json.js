import {initDB} from '@lib/mysql';

export function post(req, res) {
  const {db} = initDB();
  db.query(
    `SELECT intake_module.intake_id, intake_module.module_id, timetable_module.location, timetable_module.time_start, timetable_module.time_end FROM timetable_module INNER JOIN module ON module.module_id = timetable_module.module_id INNER JOIN timetable ON timetable.timetable_id = timetable_module.timetable_id INNER JOIN intake_module ON intake_module.module_id = timetable_module.module_id WHERE timetable_module.module_id = '${req.body.module_id}' AND intake_module.active = 1 AND timetable_module.date = '${req.body.date}'  AND intake_module.active = 1;`,
    (err, results) => {
      if (err) throw err;
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(results));
    }
  );
}
