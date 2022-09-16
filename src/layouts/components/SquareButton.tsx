import { Button, Grid, makeStyles, useMediaQuery } from '@material-ui/core'
import { CelularIcon, ChaveEvpIcon, CpfCnpjIcon, EmailIcon } from '../../../assets/icons/iconsSvg';

const useStyles = makeStyles({
	squareButton: {
		color: "#6e6e6e",
		'&:hover': {
			background: '#e3e3e3' 
		},
		backgroundColor: '#FFF',
		border: '0.1em solid #e3e3e3',
		borderRadius: 3,
		textAlign: "center",
		height: "9em",
		width: '9em',
		padding: "20px 0px",
		wordBreak: 'break-word',
		marginRight: "0.5em",
		//fontWeight: 'bold',
		textTransform: 'none',
		"@media (max-width:600px)": {
			height: "6em",
		}
	}, 
	selectedStyle: {
		color: '#FFF',
		backgroundColor: '#a6193c',
		border: '0',
	},
});

interface SquareButtonProps {
	label: string;
	icon: "cpfCnpj" | "celular" | "email" | "evp";
	color?: "primary" | "secondary" | "default";
	selected?: boolean | false;
	style?: any;
	customOnClick?: any;
}



const SquareButton = (props: SquareButtonProps) => {
	const classes = useStyles();

	const { label, icon, color, selected, style, customOnClick } = props;

	const selectedStyle = {
		color: '#FFF',
		backgroundColor: '#a6193c',
		border: '0',
	}

	const isDesktop = useMediaQuery('(min-width:600px)');

	const size = isDesktop ? "normal" : "small"

	const getIcon = () => {
		switch(icon){
			case 'cpfCnpj': return <CpfCnpjIcon color={selected ? 'white' : 'grey'} size={size} />
			case 'celular': return <CelularIcon color={selected ? 'white' : 'grey'} size={size} />
			case 'email': return <EmailIcon color={selected ? 'white' : 'grey'} size={size} />
			case 'evp': return <ChaveEvpIcon color={selected ? 'white' : 'grey'} size={size} />
		}
	}

	return (
		<>
			<Button
				onClick={customOnClick}
				className={classes.squareButton}
				variant='contained'
				color={color || "primary"}
				style={selected ? { ...selectedStyle, ...style } : style}
			>
				<Grid container justifyContent='center' style={{ marginTop: '15%' }}>
					<Grid item xs={12}>
						{ getIcon() }
					</Grid>
					<Grid item xs={12} style={{ lineHeight: 1, paddingBottom: '12px'}}>
						{label}
					</Grid>
				</Grid>
			</Button>
		</>
	)
}

export default SquareButton