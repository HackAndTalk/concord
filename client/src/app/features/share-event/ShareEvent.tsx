import * as React from 'react';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import QRCode from 'qrcode.react';
import { Typography, styled } from '@material-ui/core';

const ResponsiveQRCode = styled(QRCode)({
    width: '100% !important',
    height: 'auto !important'
});

const URL = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    wordBreak: 'break-all'
}))

const ShareEvent: React.FC = () => {
    const url = window.location.href

    return (
        <PageContainer>
            <PageTitle variant='h6'>
                This Event
            </PageTitle>
            <Typography variant='subtitle1' paragraph>
                Invite Participants to this Event
            </Typography>
            <ResponsiveQRCode value={url} />
            <URL variant='h5' paragraph>
                {url}
            </URL>
        </PageContainer>
    )
}

export default ShareEvent;