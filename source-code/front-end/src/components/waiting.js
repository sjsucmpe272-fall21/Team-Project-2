import { Button, Container, Typography } from "@material-ui/core";
import { typographyVariant } from "@mui/system";
import React, {useEffect} from "react";
import waiting from "./waiting.png";
import { useNavigate } from "react-router-dom";
const axios = require('axios');

export default function Waiting() {
        const navigate = useNavigate();

    const check = () => {
        let token = localStorage.getItem("token")
        console.log(token)
        axios.get(`http://ec2-3-16-156-49.us-east-2.compute.amazonaws.com:8080/api/jobs/get-jobs-by-token?token=${token}`).then(response => {
            console.log(response)
            let data = response.data;
            console.log(data)
            if (data.status === 'STARTED'|| data.status==="INPROGRESS") {
                alert("Processing")
            } else {
                navigate('/')
            }


        }).catch = (error) => {
            console.log(error)
        }
    }
    
    
    return (
        <Container
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection:"column",
            alignContent:"center"}}>
            <br/>
            <img alt="wait" src={waiting}
                style={{ height: "300px", width: "300px" }}></img>
            
            <Typography variant="h5">We are proccessing your results.</Typography>
            <Typography variant="h6"> Check in sometime!</Typography>

            <Button
                onClick={check}
                variant="contained">Check Now</Button>
        </Container>
    )
}