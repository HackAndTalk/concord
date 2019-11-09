import * as React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        borderRadius: 0
    }
});

const CustomTextField: React.FC<React.ComponentProps<typeof TextField>> = props => {
    const classes = useStyles(props);

    return (
        <TextField
            variant='outlined'
            margin='normal'
            {...props}
            InputProps={{
                classes,
                ...props.InputProps
            }}
        />
    )
}

export default CustomTextField;