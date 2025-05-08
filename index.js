const http = require("http");
const fs = require("fs");
const path = require("path");

//create a server object:
http
  .createServer(function (req, res) {
    const login = fs.readFileSync(path.join(__dirname, "login.html"));
    if (req.url === "/users") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ users: ["bob", "alice"] }));
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "text/html" }); //write a response to the client
      res.end(login, "utf-8"); //end the response
    }
  })
  .listen(8080); //the server object listens on port 8080
