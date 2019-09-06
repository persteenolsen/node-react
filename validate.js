class Validate {
    

    
 ValidateEmail(inputText) {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if( inputText.match(mailformat) )
        return true;
    else
        return false;
   }
 
 
 
     ValidateAge(inputtxt, minlength, maxlength){ 
      
      var field = inputtxt; 
      var mnlen = minlength;
      var mxlen = maxlength;
      
      // Note: "inputtxt" NEEDS to be a String !!!!!
      inputtxt =  inputtxt + "";
     
      //console.log("Age validate: " + inputtxt );
           
      var numbers = /^[0-9]+$/;
       if( inputtxt.match(numbers) ){
         if( field >= minlength && field <= maxlength )
           return true;
         else
           return false;
       }
       else
          return false;
    } 
      
 
 
  ValidateStringLength(inputtxt, minlength, maxlength)
   { 
     var field = inputtxt; 
     var mnlen = minlength;
     var mxlen = maxlength;
 
    if( field.length < mnlen || field.length > mxlen )
       return false;
    else
       return true;
 
    }
 
    ValidateAllLetters(inputtxt)
       { 
         
        inputtxt = inputtxt.replace(/\s+/g,'');
       
       var letters = /^[A-Za-z]+$/;
       if( inputtxt.match(letters) )
          return true;
        else
           return false;
       }

     
       ValidateIsNumber(inputtxt, minlength, maxlength)
        { 
      
         var field = inputtxt; 
         var mnlen = minlength;
         var mxlen = maxlength;
         
         // Note: "inputtxt" NEEDS to be a String !!!!!
         inputtxt =  inputtxt + "";
        
         //console.log("Age validate: " + inputtxt );
              
         var numbers = /^[0-9]+$/;
          if( inputtxt.match(numbers) ){
            if( field >= minlength && field <= maxlength )
              return true;
            else
              return false;
          }
          else
             return false;
       } 
         
    
   

}

module.exports = Validate;