import React from 'react';
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        backgroundColor: "#333333"
    }
})

const Error404 = (props) => {
    const classes = useStyles();

    return (
        <Button color="secondary" variant="contained" className={classes.root}>
            Error404 - NotFound
        </Button>
    );
}

export default Error404;