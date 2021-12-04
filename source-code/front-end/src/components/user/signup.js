import React, {useEffect} from "react";
import  { Container, Drawer } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import  {makeStyles}  from '@material-ui/core/';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import  {useState} from "react";
import {Redirect} from 'react-router';
import { useNavigate } from "react-router-dom";



const useStyles= makeStyles({
    button1: {
        width:200,
        height:50,
        fontSize: 20
      }
})


export default function Signup() {
    const Classes = useStyles()
    const [name, setName]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError]= useState('');
    const [email, setEmail]= useState('')
    const navigate = useNavigate();
    

    let redirectvar =''

    function signup() {
        const email_val = /^\S+@\S+\.\S+$/
        if (!email_val.test(email)){
            console.log('email')
            alert('Invalid Email ID')
            return;
        }
        // fetch(`${backendurl}/user/signup`,{
        //     method:'POST',
        //     headers:{"Content-type": "application/json"},
        //     body: JSON.stringify({
        //         name:name,
        //         password:password,
        //         email: email
        //     })})
        //     .then(res =>
        //         // console.log(JSON.stringify(res))
        //         res.json())
        // .then(data => {
        //     // console.log(data)
        //     setError(data.message)})
        // history.push("/login")
        let data ={
            name:name,
            password:password,
            email: email
        }
        


    }


    return(
        <Container>
            {redirectvar}
        <div>
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
            <Grid item xs={3}>
            {/* <img src={UberEatsLogo} alt='' width="200" height="120" /> */}
            <br/>
            </Grid>  
            <Grid item xs={3}> 
            <Typography variant="h4">Let's get started.</Typography>
            <Typography color="red">{error}</Typography>
            </Grid>
            <Grid item xs={3}> 
            {/* <Typography variant="h6">Enter your phone number</Typography> */}
            </Grid>
            <Box sx={{width:500}} >
             <Grid item > 
             <TextField fullWidth id="outlined-basic" label="Name" 
             onChange={(e)=>{setName(e.target.value)}}
             variant="outlined" />
            <br/><br/>
            <TextField fullWidth id="outlined-basic" label="Email ID"
            onChange={(e)=>{setEmail(e.target.value)}}
             variant="outlined" />
            <br/><br/>
            <TextField fullWidth id="outlined-basic" 
            type="password" label="Password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            variant="outlined" />
            </Grid>
            </Box>
            <Grid item>
            <Button  onClick={signup}
            className={Classes.button1} variant="contained" color="success">
                Sign Up
            </Button>
            </Grid>
            <Link to='/login'>
            <Typography variant='overline'>
                Already a user? Sign in.
            </Typography>
            </Link>
            
        </Grid> 
                        
        </div>
        </Container>
    )
}