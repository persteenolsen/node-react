
var port = process.env.PORT || 8080;

var http = require('http');
var fs = require('fs');
var path = require('path');

const url = require('url');
var mysql = require('mysql');
 

// Returning the DB connection
function getDBConnection(){
    
 
 // Note: Here you need to type the database connection information!!!
 var con = mysql.createConnection({
    host: "yourdbhost",
    user: "yourdbusername",
    password: "yourdbpassword",
    database: "yourdbname"
    });

    return con;
  }


   
// The module validate containing the Validate Class and funtionality for validate user input (validate.js)
 var Validate = require('./validate');

 // The module mimetypes containing the MimeTypes Class and funtionality for getting mime content-type
 var MimeTypes = require('./mimetypes');


// The Server 
http.createServer(function (request, response) {
           
    var filePath = '.' + request.url;

    // Routing - mapping the URL clicked by user to the matching HTML-file
    if (filePath == './')
        filePath = './views/index.html';
    if (filePath == './about')
        filePath = './views/about.html';
    if (filePath == './showpersons')
        filePath = './views/showpersons.html';
    if( filePath == './showformcreateperson' )
        filePath = './views/createperson.html';

    
    // Note: The URL could be: ""./editperson.html?id=56"
    if( filePath.indexOf('./showformeditperson?') != -1  )
        filePath = './views/editperson.html';

    var pathurl = url.parse(request.url).pathname;
    var extname = path.extname(filePath);
    
    // Try to get the Mime Content-type based from the current file exteention
    var getmime = new MimeTypes();
    var contentType = getmime.getContentType(extname);
    

    // Here goes the routing / what kind of HTTP request the server get from link user click or
    // files includes in the HTML-files
    if( pathurl === "/persons" ){
        
        // Get the DB Connection
        var con = getDBConnection();

        con.connect(function(err) {
        if (err) 
            throw err;
        else
            con.query("SELECT * FROM node_crud ORDER BY id DESC", function (err, result, fields) {
        if (err) 
            throw err;
        else{
              response.writeHead(200, {"Content-Type": "application/json"});
              response.end(JSON.stringify(result));
              }
          });
       });
   
    }
    else if (pathurl.indexOf('/getperson/') != -1 ){

        var urlid = pathurl.split("/");
        id = urlid[2];

        var v = new Validate();
        var isnumber = v.ValidateIsNumber(id, 0, 10000);
    
        console.log("Id is a number: " + isnumber );  
        
        if(isnumber == true ){

            // Get the DB Connection
            var con = getDBConnection();

            con.connect(function(err) {

            if (err) throw err;
              else
                 con.query("SELECT * FROM node_crud WHERE Id=" + id, function (err, result, fields) {
            if (err) throw err;
            else{
            
            var newresult = JSON.stringify(result); 
           
            newresult = newresult.substring(1,(newresult.length-1));

            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(newresult);

            // response.writeHead(200, {"Content-Type": "application/json"});
             //response.end(JSON.stringify(result));
            
             // This format is given by SQL but fetch in React cant handle that
             // [ RowDataPacket { id: 56, name: 'Lars', age: 81, email: 'lars@test.dk' } ]

             // Fetch in React can handle these:
             // var obj = { id: 1, name: "Per", age: 45,email: "per@test.fo" };
             //  { id: 1, name: "Per", age: 45,email: "per@test.fo" };
             // response.end(JSON.stringify(obj));
                       
              }
          });

        });

      }
      
    }

    else if (pathurl.indexOf('/editperson/') != -1 ){

        var urlid = pathurl.split("/");
        id = urlid[2];

        var body = "";

        var inputdatavalid = false;
 
        request.on('data', function (chunk) {
             body += chunk;
          });
    
        request.on('end', function () {
    
            postBody = JSON.parse(body);

            // An instance of the Validate Class
            var v = new Validate();
            
            // Check users input data (Person) by this function call using the module in Class Validate / validate.js
            inputdatavalid = v.validateInputData(postBody.name, postBody.email, postBody.age);
                        
            var isnumber = v.ValidateIsNumber(id, 0, 10000);
        
            console.log("Id is a number: " + isnumber ); 
          
            // If all user data are valid add the Persons
            if( inputdatavalid == true && isnumber == true ){
           
               // Get the DB Connection
               var con = getDBConnection();
               
               con.connect(function(err) {
                  if (err) throw err;
                  else
                      con.query("UPDATE node_crud SET name='" + postBody.name + "', email='" + postBody.email + "', age=" + postBody.age + " WHERE Id=" + id, function (err, results, fields) {
                   if(err) throw err;
                   else{
                       response.writeHead(200, {"Content-Type": "application/json"});
                       response.end(JSON.stringify(results));
                       }
                   });
               });
             }
             else{
                  response.writeHead(404, {"Content-Type": "application/json"});
                  response.end();
                 }
         });

    }

    else if (pathurl.indexOf('/deleteperson/') != -1 ){

        var urlid = pathurl.split("/");
        id = urlid[2];
        
        console.log("Id to be deleted: " + id ); 

        // Get the DB Connection
        var con = getDBConnection();

        con.connect(function(err) {
        if (err) throw err;
        else
            con.query("DELETE FROM node_crud WHERE Id=" + id, function (err, result, fields) {
        if (err) throw err;
        else{
              response.writeHead(200, {"Content-Type": "application/json"});
              response.end(JSON.stringify(result));
              }
          });
       });
    }
    else if( pathurl === "/createperson" ){

       var body = "";

       var inputdatavalid = false;

       request.on('data', function (chunk) {
            body += chunk;
         });
   
       request.on('end', function () {
   
           postBody = JSON.parse(body);
           
           // An instance of the Validate Class
           var v = new Validate();
           
           // Check users input data (Person) by this function call using the module in Class Validate / validate.js
           inputdatavalid = v.validateInputData(postBody.name, postBody.email, postBody.age);

           // If all user data are valid add the Persons
           if( inputdatavalid == true ){
          
              // Get the DB Connection
              var con = getDBConnection();
              
              con.connect(function(err) {
                 if (err) throw err;
                 else
                     con.query("INSERT INTO node_crud (name,email,age) values('" + postBody.name + "','" + postBody.email + "'," + postBody.age + ")", function (err, results, fields) {
                     if(err) throw err;
                  else{
                      response.writeHead(200, {"Content-Type": "application/json"});
                      response.end(JSON.stringify(results));
                      }
                  });
              });
            }
            else{
                 response.writeHead(404, {"Content-Type": "application/json"});
                 response.end();
                }
        });
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

