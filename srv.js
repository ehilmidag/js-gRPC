const grpc = require("grpc");
const protoLoad = require("@grpc/proto-loader")

const packageDefination = protoLoad.loadSync("todolist.proto",{});
const grpcObj = grpc.loadPackageDefinition(packageDefination);

const todoListPackage = grpcObj.todoListPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

server.addService(todoListPackage.TodoList.service, {
"createTodoElement":createTodoElement,
"readTodoList":readTodoList
});

server.start();

function createTodoElement(call,callback) {
console.log(call)
}

function readTodoList(call,callback) {

}