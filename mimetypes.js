class MimeTypes {

    
 // Get the Mime Content-Type based on the file extention
  getContentType(fileext){
    
    // Default contentType need to be text/html to display the error404.html if we type wrong URL 
    var contentType = 'text/html';

    switch (fileext) {
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
      return contentType;
   }

}


module.exports = MimeTypes;
