import { FormControlUnstyledComponentsPropsOverrides } from '@mui/core/FormControlUnstyled/FormControlUnstyledProps';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Props {
  title: string;
  children: React.ReactChild;
  open: boolean;
  setOpen: (visible: boolean) => void;
  onConfirm: () => void;
}

const ConfirmDialog = (props: Props) => {
  const { title, children, open, setOpen, onConfirm } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)} color="secondary">
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="primary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
