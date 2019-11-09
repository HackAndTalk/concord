import * as React from 'react';
import FixedFabPageContainer from '../../components/FixedFabPageContainer';
import PageTitle from '../../components/PageTitle';
import FixedFab from '../../components/FixedFab';
import CustomTextField from '../../components/CustomTextField';

const JoinEvent: React.FC = props => {
    return (
        <FixedFabPageContainer>
            <PageTitle variant='h6'>
                How do you want to be called?
            </PageTitle>
            <CustomTextField 
                fullWidth
                placeholder='Name'
                margin='normal'
            />
            <FixedFab
                variant='extended'
                color='primary'
                size='medium'
            >
                join event
            </FixedFab>
        </FixedFabPageContainer>
    )
}

export default JoinEvent;