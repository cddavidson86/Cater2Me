module.exports = function(req, res, next){
  
  if(req.user.vendorid){
    return next();
  }
  
  return res.redirect("/");
};
  