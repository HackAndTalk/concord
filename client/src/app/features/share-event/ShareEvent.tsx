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
    marginBottom: theme.spacing(3)
}))

const ShareEvent: React.FC = () => {
    const baseUrl = 'example.url';
    const eventId = 'E6K5J';
    const joinUrl = `${baseUrl}/${eventId}`

    return (
        <PageContainer>
            <PageTitle variant='h6'>
                Join this Event
            </PageTitle>
            <ResponsiveQRCode value={joinUrl} />
            <URL variant='h5' align='center'>
                {joinUrl}
            </URL>
        </PageContainer>
    )
}

export default ShareEvent;