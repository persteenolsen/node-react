class Validate {
    
 // Validate the users input ( Person ) and using the modules in this Class
 // Returning TRUE if all input are valid !
 validateInputData(name, email, age){
    
    var allinputvalid = false;
    var vname = false;
    var vemail = false;
    var vage = false;
    

    if( name != "" ){
       
        vname = this.ValidateAllLetters(name);
        if(vname)
           vname = this.ValidateStringLength(name, 2, 30);
        console.log("Valid Name: " + vname);
       }
     if( email != "" ){
        
         vemail = this.ValidateEmail(email);
         if(vemail)
            vemail = this.ValidateStringLength(email, 8, 30);
         console.log("Valid email: " + vemail);
     }
     if( age != "" ){
         
         vage = this.ValidateAge(age, 18, 125);
         console.log("Valid age: " + vage);
      }

    if( vname == true && vemail == true && vage == true )
       allinputvalid = true;

    return allinputvalid;

 }

    
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