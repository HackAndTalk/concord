import { styled } from '@material-ui/core';

const PageContainer = styled('div')(({ theme }) => ({
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
}));

export default PageContainer;