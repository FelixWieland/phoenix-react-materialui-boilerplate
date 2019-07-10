import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Container } from '@material-ui/core';

const useStyles = makeStyles({
    root: {

    }
})

const Home = (props) => {
    const classes = useStyles();

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    Home
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;