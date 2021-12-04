import React, {useEffect} from "react";
import  { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import  {makeStyles}  from '@material-ui/core/';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';
import  {useState} from "react";
import {Redirect} from 'react-router';
import axios from "axios";



const useStyles= makeStyles({
    button1: {
        width:200,
        height:50,
        fontSize: 20
      }
})

export default function Login() {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [error, setError]= useState('');
    const history = useHistory();
    
    
    useEffect(() => {
        
        
    // }, [isPassed, isError, dispatch])
    },[])

    const loginUser= async()=>{
        //dispatch(clear());
        const email_val = /^\S+@\S+\.\S+$/
        if (!email_val.test(email)){
            alert('Enter valid email')
            
            return
        }
        if (password.length === 0){
            alert('Enter Password')
            return
        }
        let data = {
            email: email,
            password: password
        }
        console.log(data)
        
        axios.defaults.withCredentials = true;
        }

    const Classes = useStyles()
    let redirectVar = null;
    
        
    return(


        <Container>
            <div>{redirectVar}</div>
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
            {/* <img src={} alt='' width="200" height="120" /> */}
            <br/>
            </Grid>  
            <Grid item xs={3}> 
            <Typography variant="h4">Welcome back</Typography>
            </Grid>
            <Grid item xs={3}> 
            <Typography>Sign in with your Email</Typography>
            <Typography color="red">{error}</Typography>
            </Grid>
            <Box sx={{width:500}} >
            <Grid item > 
            
            <TextField fullWidth id="outlined-basic" label="Email ID" 
            onChange={(e)=>{setEmail(e.target.value)}}
            variant="outlined" />
            <br/><br/>
            <TextField type="password"
             fullWidth id="outlined-basic" label="Password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            variant="outlined" />
            </Grid>
            </Box>
            <Grid item>
            <Button onClick={loginUser} className={Classes.button1} variant="contained" style={{backgroundColor:"black"}}>
                Login
            </Button>
            </Grid>
            <Link to='/signup'>
            <Typography variant='overline'>
                New here? Create an account.
            </Typography>
            </Link>
        </Grid> 
                        
        </div>
        </Container>
    )
}