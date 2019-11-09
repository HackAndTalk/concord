import * as React from 'react';
import FixedFabPageContainer from '../../components/FixedFabPageContainer';
import PageTitle from '../../components/PageTitle';

const schedule = []

const Schedule: React.FC = props => {
    return (
        <FixedFabPageContainer>
            <PageTitle variant='h6'>
                Schedule
            </PageTitle>
        </FixedFabPageContainer>
    )
}

export default Schedule;