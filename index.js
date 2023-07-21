const grpc = require("grpc");
const protoLoad = require("@grpc/proto-loader")

const packageDefination = protoLoad.loadSync("todolist.proto",{});
const grpcObj = grpc.loadPackageDefinition(packageDefination);

const todoListPackage = grpcObj.todoListPackage;

const index = new todoListPackage.TodoList("localhost:40000",grpc.credentials.createInsecure());

index.CreateTodoElement({
    "id": -1,
    "todotext": "Wash Dishes"
}, (err,response)=>{
    console.log("Received From Srv " + JSON.stringify(response))
    console.log(JSON.stringify(err))
})
