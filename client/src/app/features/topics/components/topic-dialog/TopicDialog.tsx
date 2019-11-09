import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import CustomTextField from '../../../../components/CustomTextField';
import { GatheringContext } from '../../../../App';

const TopicDialog: React.FC<DialogProps> = (props) => {
  const [title, setTitle] = React.useState('');
  const onChangeTitle = React.useCallback(e => setTitle(e.target.value), []);

  const [description, setDescription] = React.useState('');
  const onChangeDescription = React.useCallback(e => setDescription(e.target.value), []);

  const [, { suggestTopic }] = React.useContext(GatheringContext);

  const onCancel = React.useCallback((e) => {
    props.onClose(e, 'backdropClick');
  }, [props.onClose]);

  const onSubmit = React.useCallback((e) => {
    suggestTopic({
      title,
      description
    })
    props.onClose(e, 'backdropClick');
  }, [props.onClose, title, description]);

  return (
    <Dialog
      fullWidth
      {...props}
    >
      <DialogTitle>Create Topic</DialogTitle>
      <DialogContent>
        <CustomTextField
          label='Title'
          placeholder='Life, the Universe and Everything'
          fullWidth
          value={title}
          onChange={onChangeTitle}
        />
        <CustomTextField
          label='Description'
          multiline
          rows={4}
          rowsMax={7}
          fullWidth
          value={description}
          onChange={onChangeDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          close
        </Button>
        <Button
          variant='contained'
          onClick={onSubmit}
          color='primary'
        >
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TopicDialog;