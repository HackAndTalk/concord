import * as React from 'react';
import { styled, IconButton } from '@material-ui/core';

const ContainedIconButton = styled(IconButton)(({ theme }) => ({
    // position: 'relative',
    // // backgroundColor: theme.palette.action.selected,
    // width: theme.spacing(4),
    // height: theme.spacing(4),

    // '&>::before': {
    //     display: 'block',
    //     position: 'absolute',
    //     left: 0,
    //     top: 0,
    //     width: '100%',
    //     height: '100%',
    //     borderRadius: theme.spacing(2),
    //     backgroundColor: 'red',
    //     content: ''
    // }
}));

export default ContainedIconButton;