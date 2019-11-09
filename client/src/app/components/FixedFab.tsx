import { styled, Fab } from "@material-ui/core";

const FixedFab = styled(Fab)(({ theme }) => ({
    display: 'block',
    position: 'fixed',
    left: theme.spacing(3),
    right: theme.spacing(3),
    bottom: theme.spacing(3),

    width: `calc(100% - ${theme.spacing(3) * 2}px) !important`
}));

export default FixedFab;