import axios from 'axios';
import { uploadFile } from 'react-s3';
import config from '../util';
import  {useState} from "react";
import Cards from './cards';
import '../App.css';
const answer=
    {
        "userskills": " c c++   php python pytorch r reactjs tableau test test2",
        "jobPostingsList": [
            {
                "id": 448,
                "desc": null,
                "company": "AvalonBay Communities",
                "link": "https://www.indeed.com/company/AvalonBay-Communities/jobs/Operation-Analyst-At-Avalonbay-2d8cfcd815d1939a?fccid=ea274bc155efcba8&vjs=3",
                "salary": "From $90,000 a year - Full-time",
                "role": "Business Analyst",
                "title": "Hiring Now!* Operations Analyst Needed at AvalonBay in San jose",
                "keywords": "angular c c++ excel ",
                "location": "San Jose,CA",
                "simscore": 20.85144140570747700
            }
        ]
    };
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
      setResumeURL(data.location);
      console.log('-->', setResumeURL);
      const setA = answer.jobPostingsList.keywords.split(" ");
      const setB = answer.userskills.split(" ");
      const diff = function difference(setA, setB) {
        let _difference = new Set(setA)
        for (let elem of setB) {
            _difference.delete(elem)
        }
        return _difference

    }
    
    console.log("&&**&&**&&**&&",diff);
      
  })
  .catch((err)=>{
    alert('Inside this');
      alert(err);


      const setA = answer.jobPostingsList[0].keywords.split(" ");
      const setB = answer.userskills.split(" ");
      function difference(setB, setA){
        let _difference = new Set(setA)
        for (let elem of setB) {
            _difference.delete(elem)
        }
        return _difference

        }
        const diff = difference(setA,setB);
      
    
    console.log("&&**&&**&&**&&",diff);
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
                        
                           <Cards/>
                        
                    </div>
                }
            </div>
       
        </div>
    )
}