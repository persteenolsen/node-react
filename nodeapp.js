
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

  
 // The module mimetypes containing the MimeTypes Class and funtionality for getting mime content-type
 var MimeTypes = require('./mimetypes');

 var Service = require('./service');



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
       
        var con = getDBConnection();

        var s = new Service();

        s.doGetAllPersons(response, con);

    }

    else if (pathurl.indexOf('/getperson/') != -1 ){

        var urlid = pathurl.split("/");
        id = urlid[2];
        
        var con = getDBConnection();

        var s = new Service();

        s.doGetPerson(request, response, con, id);
      
    }

    else if (pathurl.indexOf('/editperson/') != -1 ){

         var urlid = pathurl.split("/");
         id = urlid[2];

         var con = getDBConnection();

         var s = new Service();

         s.doEditPerson(request, response, con, id);

    }
    
    else if( pathurl === "/createperson" ){

        var con = getDBConnection();

         var s = new Service();

         s.doCreatePerson(request, response, con);

    } 

    else if (pathurl.indexOf('/deleteperson/') != -1 ){

        var urlid = pathurl.split("/");
        id = urlid[2];
        
        var con = getDBConnection();
        
        var s = new Service();

        s.doDeletePerson(response, con, id);
        
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

    else {
         
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

