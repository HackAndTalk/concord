import { styled, Typography } from "@material-ui/core";

const PageTitle = styled(Typography)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2)
}));

export default PageTitle;