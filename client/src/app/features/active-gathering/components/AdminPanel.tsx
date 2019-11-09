import * as React from 'react';
import { Paper, styled, IconButton, Divider } from '@material-ui/core';

import BackIcon from '@material-ui/icons/ArrowBack';
import ForwardIcon from '@material-ui/icons/ArrowForward'
import { useUserId } from '../../../hooks';
import { GatheringContext } from '../gathering-api';

const Root = styled(Paper)(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  left: theme.spacing(3),
  bottom: theme.spacing(3)
}))

const AdminPanel: React.FC = () => {
  const userId = useUserId();
  const [gathering, { nextStage, prevStage }] = React.useContext(GatheringContext);

  const isAdmin = React.useMemo(() => {
    if (!gathering)
      return false;

    return gathering.participants.find(p => p.id === userId && p.isAdmin);
  }, [gathering, userId]);

  if (!isAdmin)
    return null;

  const isNextEnabled = gathering.stage < 3;
  const isPrevenabled = gathering.stage > 0;

  return (
    <Root>
      <IconButton
        size='small'
        disabled={!isPrevenabled}
        onClick={prevStage}
      >
        <BackIcon />
      </IconButton>
      <IconButton
        size='small'
        disabled={!isNextEnabled}
        onClick={nextStage}
      >
        <ForwardIcon />
      </IconButton>
    </Root>
  )
}

export default AdminPanel;