const grpc = require("grpc");
const protoLoad = require("@grpc/proto-loader")

const packageDefination = protoLoad.loadSync("todolist.proto",{});
const grpcObj = grpc.loadPackageDefinition(packageDefination);

const todoListPackage = grpcObj.todoListPackage;
const text = process.argv[2];

const index = new todoListPackage.TodoList("localhost:40000",grpc.credentials.createInsecure());

index.CreateTodoElement({
    "id": -1,
    "todotext": text
}, (err,response)=>{
    console.log("Received From Srv " + JSON.stringify(response))
})

index.readTodoList({}, (err,response)=>{
    response.items.forEach(i => {
        console.log(i.todotext)
    });
})