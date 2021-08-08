import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();
  if (req.body.user_role === 0) {
    db.query(
      `SELECT a.*, b.active, c.attended, d.total_students FROM (SELECT COUNT(t.timetable_id) AS total_classes, t.intake_id, tm.module_id, m.module_name FROM timetable t INNER JOIN timetable_module tm ON t.timetable_id = tm.timetable_id INNER JOIN module m ON m.module_id = tm.module_id WHERE tm.was_signed = 1 AND t.intake_id = '${req.body.intake_id}' GROUP BY tm.module_id) a INNER JOIN (SELECT im.module_id, im.active FROM intake_module im WHERE im.intake_id = '${req.body.intake_id}') b ON a.module_id = b.module_id LEFT JOIN (SELECT COUNT(a.user_tp) as attended, tm.module_id FROM attendance a INNER JOIN timetable_module tm ON tm.timeslot_id = a.timeslot_id WHERE a.user_tp = ${req.body.user_tp} GROUP BY tm.module_id) c ON a.module_id = c.module_id LEFT JOIN (SELECT COUNT(s.user_tp) as total_students, s.intake_id FROM student s WHERE s.intake_id = '${req.body.intake_id}' GROUP BY s.intake_id) d on a.intake_id = d.intake_id`,
      (err, results) => {
        if (err) throw err;
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(results));
        db.end();
      }
    );
  } else if (req.body.user_role === 1) {
    db.query(
      `SELECT DISTINCT a.*, b.active, c.attended, d.total_students FROM (SELECT COUNT(t.timetable_id) AS total_classes, t.intake_id, tm.module_id, m.module_name FROM timetable t INNER JOIN timetable_module tm ON t.timetable_id = tm.timetable_id INNER JOIN module m ON m.module_id = tm.module_id WHERE tm.was_signed = 1 AND tm.module_id = '${req.body.module_id}' GROUP BY t.intake_id) a INNER JOIN (SELECT im.module_id, im.active FROM intake_module im) b ON a.module_id = b.module_id LEFT JOIN (SELECT COUNT(a.user_tp) as attended, tm.module_id FROM attendance a INNER JOIN timetable_module tm ON tm.timeslot_id = a.timeslot_id GROUP BY tm.module_id) c ON a.module_id = c.module_id LEFT JOIN (SELECT COUNT(s.user_tp) as total_students, s.intake_id FROM student s GROUP BY s.intake_id) d on a.intake_id = d.intake_id`,
      (err, results) => {
        if (err) throw err;
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(results));
        db.end();
      }
    );
  } else if (req.body.user_role === 2) {
    db.query(
      `SELECT a.*, b.active, c.attended, d.total_students FROM (SELECT COUNT(t.timetable_id) AS total_classes, t.intake_id, tm.module_id, m.module_name FROM timetable t INNER JOIN timetable_module tm ON t.timetable_id = tm.timetable_id INNER JOIN module m ON m.module_id = tm.module_id WHERE tm.was_signed = 1 AND t.intake_id = '${req.body.intake_id}' GROUP BY tm.module_id) a INNER JOIN (SELECT im.module_id, im.active FROM intake_module im WHERE im.intake_id = '${req.body.intake_id}') b ON a.module_id = b.module_id LEFT JOIN (SELECT COUNT(a.user_tp) as attended, tm.module_id FROM attendance a INNER JOIN timetable_module tm ON tm.timeslot_id = a.timeslot_id GROUP BY tm.module_id) c ON a.module_id = c.module_id LEFT JOIN (SELECT COUNT(s.user_tp) as total_students, s.intake_id FROM student s WHERE s.intake_id = '${req.body.intake_id}' GROUP BY s.intake_id) d on a.intake_id = d.intake_id`,
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
}
