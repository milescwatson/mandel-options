var fs = require('fs'),
    credentials = require('./include/credentials.json');

//TODO: Implement change password
var login = function(request, response){
  const password = credentials.password;
  const receivedPassword = request.body.password;
  console.log('rp, pw', password === receivedPassword);

  if(receivedPassword === password){
    request.session.loggedIn = true;
  }

  response.redirect('/?login')
}

var loginStatus = function(request, response){
  var send = {}
  if(request.session.loggedIn === true){
    send = {
      status: 1
    }
    response.send(JSON.stringify(send));
  }else{
    send = {
      status: 2
    }
    response.send(JSON.stringify(send));
  }
}


var logout = function(request, response){
  console.log('logout');
  request.session.destroy();
  response.send('{status: 0}');
}

var middleware = function(request, response, next){
  if(!request.session.loggedIn){
    request.session.loggedIn = {}
  }
  next();

}

exports.login = login;
exports.loginStatus = loginStatus;
exports.logout = logout;
exports.middleware = middleware;
