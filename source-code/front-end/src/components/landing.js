import axios from 'axios';
import { uploadFile } from 'react-s3';
import config from '../util';
import  {useState} from "react";
import Waiting from './waiting';
import {ProgressBar} from "react-progressbar-fancy";
import { AppBar, Button, Card, Container, Divider, Grid, List, ListItem, TextField, Typography } from '@material-ui/core';
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
const [search, setSearch] = useState(false);
const [skillsReq, setSkillsReq]=useState([]);
const [userSkills2, setUserSkills]=useState([]);

    const navigate = useNavigate();
const Classes = useStyles()
const handleChange = event => {
    this.setState({ name: event.target.value });
}
const handleChange2 = event => {
    this.setState({ location: event.target.value });

}




                
const diff = function difference(answer) {
    console.log(answer)
    let jobs = answer.jobPostingsList
    console.log(jobs)
    let reqSkills = [];
    for (let i = 0; i < jobs.length; i++){
        let skills = jobs[i].keywords.split(" ");
        for (let x = 0; x < skills.length; x++)
        reqSkills.push(skills[x])
    }
    console.log(reqSkills)
    
    const userSkills = answer.userskills.split(" ");
    console.log(userSkills)

    let result = [];
    const filteredArray = reqSkills.filter(value => !userSkills.includes(value))
    console.log(filteredArray)
    
    setSkillsReq(filteredArray.slice(0,5))


                }
    async function onFromSubmit() {
        let token1 = localStorage.getItem("token")
        if (token1) {
            
            let response = await axios.get(`https://2b85-18-222-191-210.ngrok.io/api/jobs/get-jobs-by-token?token=${token1}`)
            console.log(response)
            let data = await response.data;
            console.log(data)
            if (data.status === 'STARTED' || data.status === "INPROGRESS") {
                alert("Processing")
            } else {
                console.log(response.data);
                await setItems(response.data.jobPostingsList)
                let length1 = await response.data.jobPostingsList.length;
                let sum = 0;
                console.log(length1)
                for (let i = 0; i < length1; i++) {
                    sum = sum + response.data.jobPostingsList[i].simscore
                    console.log(sum)
                }
                let avg = sum / length1
                await setScore(avg)
                let dataskills = await response.data.userskills.split(" ")
                await setUserSkills(dataskills.slice(0, 5))
                console.log((dataskills))
                console.log(score)
                await diff(response.data)
                localStorage.clear()
            }


        
        }else{
        // event.preventDefault();
        const user = {
            "location": location,
            "roles": job,
            "filename": resumeUrl
        };
    
        console.log(user);

        let a = JSON.stringify(user)
        let res = await axios.post(`https://2b85-18-222-191-210.ngrok.io/api/jobs/get-jobs-by-allparams`, a, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //   .then(res => {
        await console.log(res.data);
        let token = await res.data.token
        console.log(token)
        if (token) {
            localStorage.setItem("token", res.data.token)
            navigate('/wait')
                    
        } else {
            console.log(res.data);
            await setItems(res.data.jobPostingsList)
            let length1 = await res.data.jobPostingsList.length;
            let sum = 0;
            console.log(length1)
            for (let i = 0; i < length1; i++) {
                sum = sum + res.data.jobPostingsList[i].simscore
                console.log(sum)
            }
            let avg = sum / length1
            await setScore(avg)
            let dataskills = await res.data.userskills.split(" ")
            await setUserSkills(dataskills.slice(0, 5))
            console.log((dataskills))
            console.log(score)
            await diff(res.data)
        }
    }
                


                await setSearch(true)
                console.log(items.length + "----" + search)
    
        //   })
        // navigate('/results')
        }




    const uplaod = e => {
console.log(e.target.files[0])

        console.log(e.target.files[0].name);
        let fileName = e.target.files[0].name;
        let str = fileName.substring(0, fileName.length - 4)
        console.log(str)
        setResumeURL(str)
        alert(process.env.REACT_APP_accessKeyId);
        alert(process.env.REACT_APP_secretAccessKey);

        if(process.env.REACT_APP_accessKeyId){
            config.accessKeyId=process.env.REACT_APP_secretAccessKey;
        } 
        if(process.env.REACT_APP_secretAccessKey){
            config.secretAccessKey=process.env.REACT_APP_secretAccessKey;
        } 
        console.log(config);
        uploadFile(e.target.files[0], config)
            .then((data) => {
                console.log(data.location);
                console.log(data);
                console.log(data.body);
                let url = data.location;
    
                //   this.setState({ resumeUrl: data.location });

                //   setResumeURL(data.location);
                console.log('-->', resumeUrl);
                
                // const diff = function difference(setA, setB) {
                //     let _difference = new Set(setA)
                //     for (let elem of setB) {
                //         _difference.delete(elem)
                //     }
                //     return _difference

                // }



console.log("&&**&&**&&**&&",diff);
    
})
.catch((err)=>{
alert('Inside this error222');
    alert(err);
    console.log(data.location);
                console.log(data);
                console.log(data.body);
                console.log(err.body);
                console.log(err);

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
        <div style={{ backgroundImage: `url(${bg_img})` }}>
            <Container style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                backgroundImage: bg_img
            }}>
                <br />
                <br />
                <Card style={{
                    width: 500,
                    alignItems: "center",
            
                }}
                >
                    <Container>
                        <br />
                        <Typography variant="h6">Enter your desired job</Typography>
                        <TextField fullWidth variant="outlined" type="text" name="name"
                            onChange={e => setJob(e.target.value)} />
                        <br /><br />
                        <Typography variant="h6" >
                            Enter Location:
                        </Typography>
                        <TextField fullWidth variant="outlined" type="text" name="location" onChange={e => setLocation(e.target.value)} />
                        <br /><br />
                        <Typography variant="h6">
                            Upload your resume
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
                <Container
                style={{
                                            width: "75%",
                                            display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            justifyContent:"center"
                                        }}>
                        
                            {/* <Cards items={items} /> */}
                        {items !== "" && items.length > 0 ?
                            <div><Card style={{
                        
                            alignItems: "center",
                            display: "flex",
                                flexDirection:"column",
                                alignContent:"center"
                
                    }}
                ><Typography variant="h6"> Your skills match:</Typography>
                                    <Container
                                        id="A"
                                        style={{
                                            width: "75%",
                                            display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            justifyContent:"center"
                                }}>
                                
                                    <ProgressBar
                                        
                                        progressColor={"purple"}
                                        
                                        score={Math.round(score)} />
                            </Container >
                            <br/>
                            <Grid container
                                style={{ justifyContent: "space-around" }}>
                                <Grid item>
                            <Typography variant="h6">Your skills:</Typography>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        
                                    {userSkills2.map(details => (
                <div>
                    <ListItem  disablePadding>
                        {details}
                    </ListItem>
                    <Divider component="li" />
                    </div>
                  
                    ))}
                                    </List>
                                    </Grid>
                                <Grid item>
                                    <Typography variant="h6"> Reskill with:</Typography>
<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        
                                    {skillsReq.map(details => (
                <div>
                    <ListItem  disablePadding>
                        {details}
                    </ListItem>
                    <Divider component="li" />
                    </div>
                  
                    ))}
                                    </List>
                                    </Grid>
                                    </Grid>
                    </Card>
                                {/* </Card> */}
                                <div
                                    style={{ display: "flex" }}>
                                <div >
                        
                                <Cards items={items} />
                                
                    
                                </div>
                                </div>
                            
                            
                            
                            </div>
                            : <div></div>
            }
                        
                            
                        
                    
                </Container>

        <div className="result_class">
            
        </div>

    
            </Container>
        </div>
    )
}
