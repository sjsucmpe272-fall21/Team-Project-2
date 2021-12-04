import { Button, Container, Typography } from "@material-ui/core";
import { typographyVariant } from "@mui/system";
import React, {useEffect} from "react";
import waiting from "./waiting.png"

export default function Waiting() {
    
    
    
    return (
        <Container
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection:"column",
            alignContent:"center"}}>
            
            <img alt="wait" src={waiting}
                style={{ height: "300px", width: "300px" }}></img>
            
            <Typography variant="h5">We are proccessing your results. Kindly wait!</Typography>
            <Typography variant="h6"> Check in sometime!</Typography>

            <Button variant="contained">Check Now</Button>
        </Container>
    )
}