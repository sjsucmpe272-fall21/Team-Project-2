// import axios from 'axios'
 import './App.css';
// import React, { useState, useEffect }  from 'react';


// const App = () => {
//   const [job, serJob] = useState("");

//   const InputEvent= (event) =>{
//     serJob(event.target.value);
//   };


//   useEffect(()=>{
//     async function getData(){
//       const res = await axios.get();
//     }
//   }
//   );
//   return (
//   <div>
//     <h1>Hello {job}</h1>
//     <input  type='text' 
//             placeholder='Enter your Job' 
//             value={job} 
//             onChange={(event) =>{
//               serJob(event.target.value);
//             }}
//     />

//     <button onClick={onsubmit}> Submit </button>
//   </div>
//   )
// }

// export default App;


import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    name: '',
    location:'',
    items: []
  }

   ///myArray = [];
  handleChange = event => {
    this.setState({ name: event.target.value });
  }
  handleChange2 = event => {
    this.setState({ location: event.target.value });
    
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name
    };
    console.log(user);
    axios.get(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ items: res.data });
        console.log('-->',this.state.items);
      })
  }

  render() {
    return (
      <div>
        
        <div className="myDiv" >
        <form onSubmit={this.handleSubmit}>
          <label className="label_class">
            Enter your current job:
          </label>
          <br/>
          <input className="input_class" type="text" name="name" onChange={this.handleChange} />

          <label className="label_class">
            Enter your current Location:
          </label>
          <br/>
          <input className="input_class" type="text" name="location" onChange={this.handleChange2} />

          <label className="label_class">
           Upload your resume
          </label>
          <br/>
          <input className="input_class" type="text" name="location" />
          
          <button className="button_class"type="submit">Search</button>
        </form>
        </div>

        <div className="result_class">
          {this.state.items.length > 0 &&
            <div className="container">
            <div className="card__container">
              <div className="card">
                <div className="card__content">
                  <h3 className="card__header">Amazon</h3>
                  <h4 className="card__header2">Front End Developer</h4>
                  <p className="card__info">HTML, CSS JavaScript, react, Node</p>
                  <button className="card__button">Apply Now</button>
                </div>
              </div>
              <div className="card">
                <div className="card__content">
                  <h3 className="card__header">Microsoft</h3>
                  <h4 className="card__header2">Azure Developer</h4>
                  <p className="card__info">Java, Azure, Cloud, Python scripting</p>
                  <button className="card__button">Apply Now</button>
                </div>
              </div>
              <div className="card">
                <div className="card__content">
                  <h3 className="card__header">IBM</h3>
                  <h4 className="card__header2">data Scientist</h4>
                  <p className="card__info">Pyhton, R, Machine Learning, Ai</p>
                  <button className="card__button">Apply Now</button>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
       
        

      </div>
    )
  }
}