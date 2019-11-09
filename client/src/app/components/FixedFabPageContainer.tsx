import { styled } from "@material-ui/core";
import PageContainer from "./PageContainer";

const FixedFabPageContainer = styled(PageContainer)(({ theme }) => ({
    paddingBottom: theme.spacing(10)
}))

export default FixedFabPageContainer;