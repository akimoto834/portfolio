import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
    open: boolean;
    onToggleEpiAlert: () => void
    onUpdateUserNewEpi: () => void
}

export default function EpiAlert(props: Props) {
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onToggleEpiAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"自身の話数が更新されます"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            以前読んでた話より先の話に関する考察・感想が表示されます。<br/>
            いいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onToggleEpiAlert}>Disagree</Button>
          <Button onClick={props.onUpdateUserNewEpi} autoFocus> Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
