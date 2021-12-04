import axios from 'axios';
import { uploadFile } from 'react-s3';
import config from '../util';
import  {useState} from "react";

import {ProgressBar} from "react-progressbar-fancy";
import { AppBar, Button, Card, Container, TextField, Typography } from '@material-ui/core';
import  {makeStyles}  from '@material-ui/core/';
import bg_img from './bgimg.jpg'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import Cards from './cards';
import '../App.css';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  
};

const useStyles= makeStyles({
    button1: {
        width:200,
        height:50,
        fontSize: 20
      }
})



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
    const [score, setScore] = useState(25);
    const navigate = useNavigate();

    const Classes = useStyles()
    const handleChange = event => {
        this.setState({ name: event.target.value });
    }
    const handleChange2 = event => {
        this.setState({ location: event.target.value });
    
    }


  

    const onFromSubmit = event => {
        event.preventDefault();

        const user = {
     
            "location": location,
            "roles": job,
            "filename": resumeUrl

        };
        //     const user={
        //     "location":"San Jose,CA",
        //     "roles":"Business Analyst",
        //     "filename":"Devansh Alok Resume"
        // }
        console.log(user);
    
        let a= JSON.stringify(user)
            axios.post(`http://ec2-3-16-156-49.us-east-2.compute.amazonaws.com:8080/api/jobs/get-jobs-by-allparams`, a, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
              .then(res => {
                  console.log(res.token);
                  if (res.token) {
                      localStorage.setItem("token", res.token)
                      navigate('/wait')
                      
                  } else {
                      console.log(res);
                      setItems(res.data)
                      let sum = 0;
                      for (let i = 0; i < res.data.length; i++) {
                          sum = sum + res.data.simscore
                          console.log(res.data[i])
                      }
                      let avg = sum / res.data.length
                      setScore(avg)
                  }
              })
            // navigate('/results')
          }
    


//     const uploadImage = () => {
//         const formData = new FormData();
//         formData.append( 
//         "file", 
//         this.state.selectedFile, 
//             this.state.selectedFile.name,
    
//         ).append("location":location, );
//         axios.post("api/uploadfile", formData); 
// }




        const uplaod = e => {
    console.log(e.target.files[0])

            console.log(e.target.files[0].name);
            let fileName = e.target.files[0].name;
            let str = fileName.substring(0, fileName.length - 4)
            console.log(str)
            setResumeURL(str)
            uploadFile(e.target.files[0], config)
                .then((data) => {
                    console.log(data.location);
                    let url = data.location;
      
                    //   this.setState({ resumeUrl: data.location });

                    //   setResumeURL(data.location);
                    console.log('-->', resumeUrl);
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
      
    
    
                    console.log("&&**&&**&&**&&", diff);

      
                })
                .catch((err) => {
                    // alert('Inside this');
                    alert(err);


                    const setA = answer.jobPostingsList[0].keywords.split(" ");
                    const setB = answer.userskills.split(" ");
                    function difference(setB, setA) {
                        let _difference = new Set(setA)
                        for (let elem of setB) {
                            _difference.delete(elem)
                        }
                        return _difference

                    }
                    const diff = difference(setA, setB);
      
    
                    console.log("&&**&&**&&**&&", diff);
                })


  

    
    

        }
    
        return (
            // <div style={{ backgroundColor: "black" }}>
            <div style={{ backgroundImage: `url(${bg_img})` }}>
                {/* <div style={{ backgroundImage: bg_img}> */}
        
                <Container style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    backgroundImage: bg_img
                }}>
                    {/* <AppBar style={{ backgroundColor:"black" , alignItems:"flex-end", marginRight:"20px", marginTop:"10px"}}>
                <LogoutIcon fontSize="large"/>
            </AppBar> */}
                    <br />
                    <br />
                
                    <Card style={{
                        width: 500,
                        alignItems: "center",
                
                    }}
                    >
                        <Container>
                            {/* <form onSubmit={onFromSubmit}> */}
                            <br />
                            <Typography variant="h6">Enter your desired job:</Typography>
                        
                            <TextField fullWidth variant="outlined" type="text" name="name"
                                onChange={e => setJob(e.target.value)} />
                            <br /><br />
                            <Typography variant="h6" >
                                Enter Location:
                            </Typography>
                    
                            <TextField fullWidth variant="outlined" type="text" name="location" onChange={e => setLocation(e.target.value)} />
                            <br /><br />
                            <Typography variant="h6">
                                Upload your resume:
                            </Typography><br />
                            <input type="file" onChange={uplaod}></input>
                            <br /><br />
                            <Button variant="contained"
                                onClick={onFromSubmit}
                                className={Classes.button1} type="submit">Search</Button>
                            {/* </form> */}<br /><br />
                            <br />
                        </Container>
                    </Card>

                        
                    <br />
                    <Container>
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
                                    <br />
                                    <Container style={{ width: "75%" }}>
                                        <ProgressBar
                                            progressColor={"purple"}
                                            darkTheme
                                            score={score} />
                                    </Container >

                        
                                    <Cards />
                        


                                </div>
                            }
                        </div>
                    </Container>

            <div className="result_class">
                {items.length > 0 &&
                    <div className="container">
                        
                           <Cards/>
                        
                    </div>
                }
            </div>

       
                </Container>
            </div>
        )
    }
