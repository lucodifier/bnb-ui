import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

interface SimpleDialogProps {
	title: string;
	confirmLabel?: string;
	cancelLabel?: string;
	open: boolean | false;
	handleClose: any;
	handleConfirm?: any;
	children: any;
}

const SimpleDialog = ( props: SimpleDialogProps ) => {

	const { 
		title, 
		confirmLabel = 'Continuar', 
		cancelLabel = 'Cancelar', 
		children, 
		open, 
		handleClose,
		handleConfirm } = props;

	return (
		<Dialog
			maxWidth={"xs"}
			fullWidth
			open={open}
			onClose={handleClose}
		>
			<DialogTitle>
				{ title }
			</DialogTitle>

			<DialogContent>
				{ children }
			</DialogContent>

			<DialogActions>
				<Button color="secondary" onClick={handleClose}>{cancelLabel}</Button>
				<Button color="secondary" onClick={handleConfirm}>{confirmLabel}</Button>
			</DialogActions>

		</Dialog>
	)
}

export default SimpleDialog