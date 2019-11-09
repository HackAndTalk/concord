import * as React from 'react';
import FixedFabPageContainer from '../../components/FixedFabPageContainer';
import PageTitle from '../../components/PageTitle';
import FixedFab from '../../components/FixedFab';
import CustomTextField from '../../components/CustomTextField';
import { GatheringContext } from '../active-gathering/gathering-api';

const JoinEvent: React.FC = props => {
    const [, { joinGathering }] = React.useContext(GatheringContext);

    const [name, setName] = React.useState('');
    const onChangeName = React.useCallback(e => setName(e.target.value), []);

    const onSubmit = React.useCallback(() => {
        joinGathering(name, false);
    }, [name])

    return (
        <FixedFabPageContainer>
            <PageTitle variant='h6'>
                How do you want to be called?
            </PageTitle>
            <CustomTextField
                fullWidth
                placeholder='Name'
                margin='normal'
                value={name}
                onChange={onChangeName}
            />
            <FixedFab
                variant='extended'
                color='primary'
                size='medium'
                onClick={onSubmit}
            >
                join event
            </FixedFab>
        </FixedFabPageContainer>
    )
}

export default JoinEvent;