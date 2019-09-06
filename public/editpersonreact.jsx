
class EditPerson extends React.Component {

    constructor(props) {

      super(props);
      this.state = {id: '', name: '', email: '', age: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
    
    var urlParams = new URLSearchParams(location.search);
    var urlid = urlParams.get('id');   
    
   
    fetch('getperson/' + urlid)

   .then(response => {
     return response.json();
    }).then(result => {

    // console.log(result);
     this.setState({
      id:result.id,
      name:result.name,
      email:result.email,
      age:result.age
     });
    });

    }


    handleChange(event) {
     const state = this.state
     state[event.target.name] = event.target.value
     this.setState(state);
    }


    handleSubmit(event) {
     event.preventDefault();
     
     fetch('editperson/' + this.state.id, {
     method: 'PUT',
     body: JSON.stringify({
         id:this.state.id,
         name: this.state.name,
         email: this.state.email,
         age: this.state.age
     }),
     headers: {
         "Content-type": "application/json; charset=UTF-8"
     }
    }).then(response => {

      // If the New Person was create the server will responde with 200 or 202
      if(response.status == 200 || response.status == 202 ) {
        alert("The Person was updated successfully");
       
        // Note: The user is redirected to the admin list of Persons
        window.location.href = "/showpersons";
      }
      else
          alert("One or more values may be wrong and the Person was not updated!");
     });
    }
    
    render() {
      return (
     <div id="container">
                    
        <a href="/showpersons" target="_top">View the list of Persons</a>
         <br/> <br/>

        <form onSubmit={this.handleSubmit}>

           <table className="react-table-edit">
            
            <tr>
             <td colSpan="2">
                 <input type="hidden" name="id" value={this.state.id}/>
              </td>
            </tr>

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
             <input className="react-input-text" type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="xxx@yyy.com" />
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
      );
    }
  }

  

ReactDOM.render(
    <EditPerson />,
    document.getElementById('rootapi')
);
  
  