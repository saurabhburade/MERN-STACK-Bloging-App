import React, { Component } from 'react';
import "./loader.css"
class loader extends Component{
    
  constructor(props){
    super(props);
    this.state = {
      load:1
    };
  }
    componentWillMount(){
     this.setState({
       load:1
     })
        
    }
    componentDidMount(){
        console.log("did mount ");
       
         setTimeout(() => {
           this.setState({
             load:0
           });
         }, 2000);
        
    }
    render() {
        console.log("render");
       if (this.state.load===1) {
          return (
            <div className="loaderdiv">
              <div className="loader"></div>
              <br />
              <h3>Loading.....</h3>
            </div>
            
          );
       }
       else{
         return(
          null
         )
       }
    }
  
}
export default loader