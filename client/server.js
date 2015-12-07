var hapi = require('hapi');
var inert = require('inert');

var server = new hapi.Server();
server.connection({
    port: ~~process.env.PORT || 8001
});

server.register(inert, function(err){

	server.route(
      [{method: 'GET',
      path: '/{param*}',
      config: {
      handler: {
				directory: {
					path: ['app', 'bower_components']
				}
		   }
    }}]);

	server.start(function () {
	    console.log('Server running at:', server.info.uri);
	});
});
