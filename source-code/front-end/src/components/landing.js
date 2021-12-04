import axios from 'axios';
import { uploadFile } from 'react-s3';
import config from '../util';
import  {useState} from "react";
import {ProgressBar} from "react-progressbar-fancy";
import { AppBar, Button, Card, Container, TextField, Typography } from '@material-ui/core';
import  {makeStyles}  from '@material-ui/core/';
import bg_img from './bgimg.jpg'
import LogoutIcon from '@mui/icons-material/Logout';
import { width } from '@mui/system';
// import { useNavigate } from "react-router-dom";

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
export default function Landing() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [resumeUrl, setResumeURL] = useState('');
    const [items, setItems] = useState([]);
    const [job, setJob] = useState('');
    const [score, setScore] = useState(25);
    // const navigate = useNavigate();

const Classes = useStyles()
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
        console.log(res.data.length);
          setItems(res.data)
          let sum = 0;
          for (let i = 0; i < res.data.length; i++){
              sum = sum + res.data.simscore
              console.log(res.data[i])
          }
          let avg = sum / res.data.length
          setScore(avg)
      })
    // navigate('/results')
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
    // alert('Inside this');
      alert(err);
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
                height:"100%",
            backgroundImage:bg_img
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
                <br/>
                    <Typography variant="h6">Enter your current job:</Typography>
                        
                    <TextField fullWidth variant="outlined" type="text" name="name"
                        onChange={e=>setJob(e.target.value)} />
<br/><br/>
                    <Typography variant="h6" >
                        Enter your current Location:
                    </Typography>
                    
                    <TextField fullWidth variant="outlined"  type="text" name="location" onChange={e=>setLocation(e.target.value)} />
<br/><br/>
                    <Typography variant="h6">
                        Upload your resume:
                    </Typography><br/>
                    <input type="file" onChange={uplaod}></input>
               <br/><br/>
                        <Button variant="contained"
                            onClick={onFromSubmit}
                            className={Classes.button1} type="submit">Search</Button>
                    {/* </form> */}<br/><br/>
                    <br/>
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
                            <br/>
                            <Container style={{ width:"75%" }}>
            <ProgressBar
                progressColor={"purple"}
                darkTheme
                score={score} />
                </Container >
                    </div>
                }
            </div>
            </Container>
       
            </Container>
            </div>
    )
}