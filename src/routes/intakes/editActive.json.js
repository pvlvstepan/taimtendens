import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();
  db.query(`UPDATE intake_module SET active = ${req.body.active} WHERE module_id = '${req.body.module_id}' AND intake_id = '${req.body.intake_id}'`, (err, results, fields) => {
    if (err) {
      console.log('[mysql]:', err.message);
      res.end(JSON.stringify({ error: 'Something went wrong...' }));
    } else {
      res.end(JSON.stringify({ message: 'OK' }));
    }
  });
}