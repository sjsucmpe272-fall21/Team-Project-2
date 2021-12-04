import axios from 'axios';
import { uploadFile } from 'react-s3';
import config from '../util';
import  {useState} from "react";

export default function Landing() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [resumeUrl, setResumeURL] = useState('');
    const [items, setItems] = useState([]);
    const [job, setJob] = useState('');

const handleChange = event => {
    this.setState({ name: event.target.value });
  }
const handleChange2 = event => {
    this.setState({ location: event.target.value });
    
  }

const  onFromSubmit = event => {
    event.preventDefault();

    const user = {
      name: name
    };
    console.log(user);
    axios.get(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
        // this.setState({ items: res.data });
          setItems(res.data)
        // console.log('-->',this.state.items);
      })
  }
    
    const uplaod = e =>{
    
  console.log(e.target.files[0]);
  uploadFile(e.target.files[0], config)
  .then((data)=>{
      console.log(data.location);
    //   this.setState({ resumeUrl: data.location });
      setResumeURL(data.location)
      
  })
  .catch((err)=>{
    alert('Inside this');
      alert(err);
  })
}
    
    return (
        <div>
            <div className="myDiv" >
                <form onSubmit={onFromSubmit}>
                    <label className="label_class">
                        Enter your current job:
                    </label>
                    <br />
                    <input className="input_class" type="text" name="name"
                        onChange={e=>setJob(e.target.value)} />

                    <label className="label_class">
                        Enter your current Location:
                    </label>
                    <br />
                    <input className="input_class" type="text" name="location" onChange={e=>setLocation(e.target.value)} />

                    <label className="label_class">
                        Upload your resume:
                    </label>
                    <input type="file" onChange={uplaod}></input>
               
                    <button className="button_class" type="submit">Search</button>
                </form>
            </div>

            <div className="result_class">
                {items.length > 0 &&
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