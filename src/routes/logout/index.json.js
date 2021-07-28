export function post(req, res) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        req.session = null;
        return res.redirect('/');
      }
    });
  }
}