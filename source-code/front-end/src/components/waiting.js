import { Container, Typography } from "@material-ui/core";
import React, {useEffect} from "react";
import waiting from "./waiting.png"

export default function Waiting() {
    return (
        <Container
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent:"center",
            alignContent:"center"}}>
            <img alt="wait" src={waiting}
                style={{ height: "300px", width: "300px" }}></img>
            
            <Typography>We are proccessing your results. Kindly wait!</Typography>
        </Container>
    )
}