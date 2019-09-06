
class GetPersonsList extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            persons: []

        };

    }

    componentDidMount() {
       
        this.getPersons();
    }

   
    getPersons(){
      
        fetch('persons')
        .then(response => response.json())
        .then(data => { this.setState({ persons: data }) })

    }
    
 editPerson(idedit){
        
     // Note: The user is redirected to the admin list of Persons
     window.location.href = "/showformeditperson?id=" + idedit;
}

deletePerson(id)  {

  if(window.confirm("Are you sure want to delete the Person?")) {
      
      fetch('deleteperson/' + id, {
          method : 'DELETE'
      }).then(response => { 
              
              // On Success the server will most likely return 204 because no content to return
              if( response.status == 200  || response.status == 204 ) {
                  alert("The Person was deleted successfully");
                  
                 // NOTE: Reload / update the cached version (false) of the page !!
                 // window.location.reload(false);
               
                 // Getting the Persons and update the state / GUI
                 this.getPersons();
                
              } 
       })
    }
      
  }


    render() {
        
      return(

        <div>
                
        <a href="/showformcreateperson" target="_top">Create a new Person</a>
         <br/> <br/>

         <table id="persons" className="table table-striped">
          <thead>
           
          <tr><td><b>Name</b></td><td><b>Email</b></td><td><b>Age</b></td><td></td></tr>
                                    
          </thead>
          <tbody>
            {
              this.state.persons.map(function(persons,index) {
                 return <tr key={index} >
                         
                                          
                  <td>{persons.name}</td>
                  <td>{persons.email}</td>
                  <td>{persons.age}</td>

            
                  <td>
                         
                  <button className="react-button-edit" onClick={this.editPerson.bind(this, persons.id)}>Edit</button>
                  <button className="react-button-delete" onClick={this.deletePerson.bind(this, persons.id)}>Delete</button>
                  
                  
                 </td>
                 

               </tr>

              }.bind(this))

            }
            
          </tbody>
        </table>
        </div>
      )
    } 

    

}





ReactDOM.render(
    <GetPersonsList />,
    document.getElementById('rootapi')
);
