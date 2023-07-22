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
const todos = []
function createTodoElement(call,callback) {
const todoItem ={
    "id":todos.length+1,
    "todotext": call.request.todotext
}
todos.push(todoItem)
callback(null,todoItem)
}

function readTodoList(call,callback) {
callback(null,{"items":todos})
}