import { Avatar, Divider, Grid, Icon, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { PaymentVoucherIcon, SetaIcon } from '../../../assets/icons/iconsSvg';
import * as React from 'react';

const useStyles = makeStyles({
	userCard: {
		height: '6em',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginBottom: '1.5em',
		cursor: 'pointer',
		"@media (max-width:600px)": {
			height: 'auto',
			padding: '4px 0em'
		}
	},
	cardAvatar: {
		justifyContent: 'center',
		marginLeft: '1.5em',
		alignItems: 'center',
		"@media (max-width:600px)": {
			marginLeft: '0em',
		}
	},
	cardContent: {
		display: 'flex',
		justifyContent: 'center', alignItems: 'center',
		flex: '70%',
		marginLeft: '1.5em',
		"@media (max-width:600px)": {
			flex: '60%',
			marginLeft: '1em',
		}
	},
	cardTitle: {
		color: '#a6193c',
		marginBottom: '-4px',
		fontWeight: 400
	},
	cardBody: {
		color: '#6e6e6e',
		marginTop: '4px',
		fontSize: '12px'
	},
	avatarStyle: {
		color: '#6e6e6e',
		backgroundColor: '#cccaca',
		width: '2.5em',
		height: '2.5em'
	},
	avatarStyleSmall: {
		color: '#6e6e6e',
		backgroundColor: '#cccaca',
		width: '1.5em',
		height: '1.5em'
	},
	actionIcon: {
		width: '1.2em',
		height: '1.2em',
		marginRight: '.5em',
		"@media (max-width:600px)": {
			marginRight: '0'
		}
	},
	additionalInfoPrimary: {
		fontWeight: 800,
		color: '#4e4e4e',
		fontSize: '14px',
		"@media (max-width:600px)": {
			fontWeight: 500,
			fontSize: '14px',
		}
	},
	additionalInfoSecondary: {
		color: '#4e4e4e',
		fontSize: '14px',
		"@media (max-width:600px)": {
			fontSize: '13px'
		}
	},

});

interface CustomUserCardProps {
	nomeRecebedor: string;
	apelidoRecebedor?: string;
	bancoRecebedor: string;
	chaveRecebedor: string;
	elevation?: boolean | false;
	onClick?: any;
	style?: any;
	icon?: React.ReactElement;
	iconSize?: 'small' | 'normal';
	actionIcon?: React.ReactElement;
	additionalInfoPrimary?: string;
	additionalInfoSecondary?: string;
	divider?: boolean | false;
}

const CustomUserCard = (props: CustomUserCardProps) => {

	const { nomeRecebedor,
		apelidoRecebedor,
		bancoRecebedor,
		chaveRecebedor,
		elevation,
		onClick,
		style,
		icon,
		iconSize = 'normal',
		actionIcon,
		additionalInfoPrimary,
		additionalInfoSecondary,
		divider
	} = props;

	const classes = useStyles();

	const retornarApelido = () => {
		return apelidoRecebedor ? `(${apelidoRecebedor})` : '';
	}

	const iconPx = iconSize === 'normal' ? '24px' : '16px';

	const marginRight = iconSize === 'normal' ? '0em' : '.3em';

	return (

		<Grid>
			<Paper onClick={onClick} classes={{ root: classes.userCard }} style={{ backgroundColor: elevation ? '#ffffff' : '#fafafa', ...style  }} elevation={elevation ? 2 : 0}>
				<div className={classes.cardAvatar} style={elevation ? { marginLeft: '10px' } : {}}>
					<Avatar 
						variant="circular" 
						classes={{ root: (iconSize === 'normal') ? classes.avatarStyle : classes.avatarStyleSmall }}>
							{ icon ? 
								<Grid item style={{ width: iconPx, marginRight: marginRight }}>
									{ icon }
								</Grid>
								:	
								<Typography style={{ fontSize: '32px' }}>
									{nomeRecebedor && nomeRecebedor.charAt(0)}
								</Typography> 
							}
					</Avatar>
				</div>

				<div className={classes.cardContent}>
					<div style={{ flex: '50%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
						<Typography classes={{ root: classes.cardTitle }}>
							{`${nomeRecebedor} ${retornarApelido()}`}
						</Typography>
						<Typography classes={{ root: classes.cardBody }}>
							{bancoRecebedor}
						</Typography>
						<Typography classes={{ root: classes.cardBody }}>
							{chaveRecebedor}
						</Typography>
					</div>
					
					{ (additionalInfoPrimary || additionalInfoSecondary) && 
						<div style={{ flex: '50%', textAlign: 'right', marginRight: '12px', justifyContent: 'center', alignItems: 'center' }}>
							<Typography classes={{ root: classes.additionalInfoPrimary }}>
								{ additionalInfoPrimary }
							</Typography>
							<Typography classes={{ root: classes.additionalInfoSecondary }}>
								{ additionalInfoSecondary }
							</Typography>
						</div> }

				</div>


				{onClick && <IconButton>
					{	actionIcon ? 
							<Grid item className={classes.actionIcon}>
								{ actionIcon }
							</Grid>
							: 
							<SetaIcon />
					}
				</IconButton>}
				
			</Paper>
			{ divider && <Divider style={{ marginTop: '-1em', marginBottom: '-1em' }} /> }
		</Grid>
	)
}

export default CustomUserCard;