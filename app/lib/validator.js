module.exports = {
  stringCheck: stringCheck,
  checkNameLength: checkNameLength,
  checkMessageLength: checkMessageLength
};

function stringCheck(req, res, next){
  if (typeof req.body.name === "string"){
    next();
  }else {
    res.status(422).send('Name is not a string');
  }
}

function checkNameLength(req, res, next){
  var regexObj = (/^\S+(?: \S+)*$/);
  var name = req.body.name;
  if (name.length > 3 && name.length < 12 && regexObj.test(name)){
    next();
  }else {
    res.status(422).send('name is invalid');
  }
}

function checkMessageLength(req, res, next){
  if (req.body.message.length > 12){
    next();
  }else {
    res.status(422).send('message is invalid');
  }
}