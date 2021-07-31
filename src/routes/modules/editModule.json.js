import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();
  db.query(
    `UPDATE module SET module_name = '${req.body.module_name}' WHERE module_id = '${req.body.module_id}'`,
    err => {
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
