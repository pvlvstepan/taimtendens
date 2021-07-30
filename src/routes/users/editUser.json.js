import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();

  const { user_tp, first_name, last_name, role_id, email, password, profile_pic, intake_id, module_id } = req.body;

  db.query(`UPDATE user SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}', password = '${password}', profile_pic = '${profile_pic}', last_edited = CURRENT_TIMESTAMP WHERE user_tp = ${user_tp}`, (err) => {
    if (err) {
      console.log('[mysql]:', err.message);
      res.end(JSON.stringify({ error: 'Something went wrong...' }));
    } else {

      if (role_id === 0) {
        db.query(`UPDATE student SET intake_id = '${intake_id}' WHERE user_tp = ${user_tp}`, (err) => {
          if (err) {
            console.log('[mysql]:', err.message);
            res.end(JSON.stringify({ error: 'Something went wrong...' }));
          } else {
            res.end(JSON.stringify({ message: 'OK' }));
          }
        });
      } else if (role_id === 1) {
        db.query(`UPDATE lecturer SET module_id = '${module_id}' WHERE user_tp = ${user_tp}`, (err) => {
          if (err) {
            console.log('[mysql]:', err.message);
            res.end(JSON.stringify({ error: 'Something went wrong...' }));
          } else {
            res.end(JSON.stringify({ message: 'OK' }));
          }
        });
      } else {
        res.end(JSON.stringify({ message: 'OK' }));
      }
    }
  });
}