var Hapi = require('hapi');
var Mongoose = require('mongoose');

var server = Hapi.createServer(process.env.PORT || 8000 , { payload: {maxBytes:100000} });
Mongoose.connect('mongodb://localhost:27017/local');
var Schema = Mongoose.Schema;


var employeeSchema = new Schema({
        _id: String,
        name: String,
        empId: Number
    }
);

var listEmployees = function(request, reply) {

    var employeeModel = Mongoose.model('emp',employeeSchema);
    console.log(employeeModel)
    employeeModel.find({}, function(err, docs) {
        if(err){
            return reply(err);
        }
        return reply(docs)
    });

};


var getEmployee = function(request, reply) {

    var employeeModel = Mongoose.model('emp',employeeSchema);

    employeeModel.find({empId:request.params.id}, function(err, docs) {
        if(err){
            return reply(err);
        }
        return reply(docs)
    });

};


server.route([
    {
        path: '/employees',
        method: 'GET',
        config :{
            handler: listEmployees
        }
    },
    {
        path: '/employee/{id}',
        method: 'GET',
        config :{
            handler: getEmployee
        }
    }
]);



server.start(function(){
    console.log('Server started @'+server.info.uri);
});
