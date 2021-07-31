import {initDB} from '@lib/mysql';

export function post(req, res) {
  const {db} = initDB();
  db.query(
    `SELECT module.module_id, module.module_name FROM module INNER JOIN intake_module ON intake_module.module_id = module.module_id WHERE intake_module.intake_id = '${req.body.intake}' AND intake_module.active = ${req.body.active};`,
    (err, results) => {
      if (err) throw err;
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(results));
    }
  );
}
