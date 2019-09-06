
class CreatePerson extends React.Component {

    constructor(props) {

      super(props);
      this.state = {name: '', email:'', age: '' };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

     const state = this.state
     state[event.target.name] = event.target.value
     this.setState(state);

    }
    handleSubmit(event) {

     event.preventDefault();

     fetch('createperson', {
     method: 'POST',
     body: JSON.stringify({
         name: this.state.name,
         email: this.state.email,
         age: this.state.age
     }),
     headers: {
         "Content-type": "application/json; charset=UTF-8"
     }

    }).then(response => {

      //alert("Status: " + response.status);

      // If the New Person was create the server will responde with 201
      if( response.status == 200 || response.status == 201 ) {
      
        alert("The Person was created successfully");
        
        // Note: The user is redirected to the admin list of Persons
        window.location.href = "/showpersons";
       }
       else
           alert("One or more values may be wrong and the Person was not created!");
     });
    }


    render() {
      return (
         <div id="container">
                       
          <a href="/showpersons" target="_top">View the list of Persons</a>
             <br/> <br/>  
              
          <form onSubmit={this.handleSubmit}>

            <table className="react-table-create">
            
            <tr>
              <td>
                 <label>Name:</label>
             </td>
            
             <td>
               <input className="react-input-text" type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Length 2 to 30 letters" />
             </td>
           </tr>

           <tr>
              <td>
             <label>Email:</label>
             </td>
             
             <td>
             <input className="react-input-text" type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="xxx@yyy.com - 8 to 30 letters" />
             </td>
           </tr>
            
           <tr>
              <td>
              <label>Age:</label>
              </td>
             
             <td>
             <input className="react-input-text" type="text" name="age" value={this.state.age} onChange={this.handleChange} placeholder="Number from 18 to 125" />
             </td>
           </tr>

           <tr>
              <td colSpan="2">
             <input style={{width: '75pt', backgroundColor: '#337ab7', color: 'white' }} type="submit" value="Submit" />
             </td>
           </tr>
          </table>

           </form>
     
        </div>
      )
    }
  }

  

ReactDOM.render(
    <CreatePerson />,
    document.getElementById('rootapi')
);
  