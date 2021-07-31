import {initDB} from '@lib/mysql';

export function post(req, res) {
  const {db} = initDB();

  const {
    first_name,
    last_name,
    role_id,
    email,
    password,
    profile_pic,
    intake_id,
    module_id
  } = req.body;

  db.query(
    `INSERT INTO user (user_tp, first_name, last_name, role_id, email, password, profile_pic, last_edited) VALUES (NULL, '${first_name}', '${last_name}', '${role_id}', '${email}', '${password}', '${profile_pic}', CURRENT_TIMESTAMP)`,
    err => {
      if (err) {
        console.log('[mysql]:', err.message);
        res.end(JSON.stringify({error: 'Something went wrong...'}));
      } else {
        db.query(
          `SELECT user_tp FROM user ORDER BY last_edited DESC LIMIT 1`,
          (err, results) => {
            if (err) {
              console.log('[mysql]:', err.message);
              res.end(JSON.stringify({error: 'Something went wrong...'}));
            } else {
              if (role_id === 0) {
                db.query(
                  `INSERT INTO student (user_tp, intake_id) VALUES (${JSON.stringify(
                    results[0]['user_tp']
                  )}, '${intake_id}')`,
                  err => {
                    if (err) {
                      console.log('[mysql]:', err.message);
                      res.end(
                        JSON.stringify({error: 'Something went wrong...'})
                      );
                    } else {
                      res.end(JSON.stringify({message: 'OK'}));
                    }
                  }
                );
              } else if (role_id === 1) {
                db.query(
                  `INSERT INTO lecturer (user_tp, module_id) VALUES (${JSON.stringify(
                    results[0]['user_tp']
                  )}, '${module_id}')`,
                  err => {
                    if (err) {
                      console.log('[mysql]:', err.message);
                      res.end(
                        JSON.stringify({error: 'Something went wrong...'})
                      );
                    } else {
                      res.end(JSON.stringify({message: 'OK'}));
                    }
                  }
                );
              } else {
                res.end(JSON.stringify({message: 'OK'}));
              }
            }
          }
        );
      }
    }
  );
}
