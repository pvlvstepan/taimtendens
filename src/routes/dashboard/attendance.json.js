import {initDB} from '@lib/mysql';

export function post(req, res) {
  const {db} = initDB();
  db.query(
    `SELECT a.*, b.attended FROM (SELECT COUNT(*) as total_classes, tm.module_id, m.module_name, im.active FROM timetable_module tm INNER JOIN module m ON m.module_id = tm.module_id INNER JOIN intake_module im ON im.module_id = tm.module_id WHERE im.intake_id = '${req.body.intake_id}' AND tm.was_signed = 1 GROUP BY tm.module_id) a LEFT JOIN (SELECT COUNT(*) as attended, tm.module_id FROM attendance a INNER JOIN timetable_module tm ON tm.timeslot_id = a.timeslot_id WHERE a.user_tp = ${req.body.user_tp} AND tm.was_signed = 1 GROUP BY tm.module_id) b on a.module_id = b.module_id
  `,
    (err, results) => {
      if (err) throw err;
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(results));
    }
  );
}
