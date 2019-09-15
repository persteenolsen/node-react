
var port = process.env.PORT || 8080;

var http = require('http');
var fs = require('fs');
var path = require('path');

const url = require('url');

http.createServer(function (request, response) {
    
    //console.log('request is starting...');
       
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './views/index.html';
    if (filePath == './about')
        filePath = './views/about.html';
    
    if (filePath == './showpersons')
        filePath = './views/showpersons.html';
    
    var pathurl = url.parse(request.url).pathname;
    var extname = path.extname(filePath);
    
    // Note: If we type a wrong url like: /xxxx content-type need to be text/html to display error404.html
    var contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
         case '.ico':
            contentType = 'image/x-icon';
            break;
     }

     
    if( pathurl === "/persons" ){

        var mysql = require('mysql');
        
        // Note: Here you need to type the database connection information!!!
        var con = mysql.createConnection({
            host: "yourdbhost",
            user: "yourdbusername",
            password: "yourpassword",
            database: "yourdbname"
         }); 

        con.connect(function(err) {
        if (err) 
            throw err;
        else
            con.query("SELECT * FROM node_crud ORDER BY id DESC", function (err, result, fields) {
        if (err) 
            throw err;
        else{
              console.log(result);
              response.writeHead(200, {"Content-Type": "application/json"});
              response.end(JSON.stringify(result));
              }
          });
       });
   
       // var persons = [ { "id": 8, "name": "Ole", "email": "ole@test.dk", "age": "46" }, { "id": 10, "name": "Lars", "email": "lars@test.dk", "age": "33" }] ;
       // response.writeHead(200, {"Content-Type": "application/json"});
       // response.end(JSON.stringify(persons));
    }
    else if( ( filePath.indexOf('.html') != -1 || pathurl.indexOf('/public/') != -1 ) ){

            fs.readFile(filePath, function(error, content) {
        
            if (error) {
                fs.readFile('./views/error404.html', function(error, content) {
                response.writeHead(404, { 'Content-Type': contentType });
                 response.end(content, 'utf-8');
                });
              }
             else {
                   response.writeHead(200, { 'Content-Type': contentType });
                   response.end(content, 'utf-8');
                 }
           });
        }

    else{
         
         fs.readFile(__dirname + '/views/error404.html', function (err, data) {
         if (err){
            response.writeHead(404);
            response.write('file not found');
            }
        else{
             response.writeHead(200, {'Content-Type': 'text/html'});
             response.write(data);
             }
         response.end();
       });
    }



}).listen(port);
console.log('Server running at 8080');