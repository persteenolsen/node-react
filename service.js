// The module validate containing the Validate Class and funtionality for validate user input (validate.js)
var Validate = require('./validate');


class Service {


   doGetAllPersons(response, con) {

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

   doGetPerson(request, response, con, id) {
    
       var v = new Validate();
       var isnumber = v.ValidateIsNumber(id, 0, 10000);

       console.log("Id is a number: " + isnumber );  
    
       if(isnumber == true ){

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

   
   // Perform the functionality for Update the selected person
   doEditPerson(request, response, con, id) {
           
      var body = "";

      var inputdatavalid = false;

        request.on('data', function (chunk) {
             body += chunk;
          });
    
        request.on('end', function () {
    
            var postBody = JSON.parse(body);

            // An instance of the Validate Class
            var v = new Validate();
            
            // Check users input data (Person) by this function call using the module in Class Validate / validate.js
            inputdatavalid = v.validateInputData(postBody.name, postBody.email, postBody.age);
                        
            var isnumber = v.ValidateIsNumber(id, 0, 10000);
        
            console.log("Id is a number: " + isnumber ); 
          
            // If all user data are valid add the Persons
            if( inputdatavalid == true && isnumber == true ){
           
                             
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



    doCreatePerson(request, response, con ) {

       var body = "";

       var inputdatavalid = false;

       request.on('data', function (chunk) {
            body += chunk;
         });
   
       request.on('end', function () {
   
           var postBody = JSON.parse(body);
           
           // An instance of the Validate Class
           var v = new Validate();
           
           // Check users input data (Person) by this function call using the module in Class Validate / validate.js
           inputdatavalid = v.validateInputData(postBody.name, postBody.email, postBody.age);

           // If all user data are valid add the Persons
           if( inputdatavalid == true ){
          
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

    
   doDeletePerson(response, con, id) {
      
       console.log("Id to be deleted: " + id ); 

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





}

module.exports = Service;