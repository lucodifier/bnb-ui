import { Box, Chip, CircularProgress, createTheme, Divider, Grid, makeStyles, Paper, PropTypes, TextField, ThemeProvider, Typography, useMediaQuery } from '@material-ui/core'
import { ArrowUpward, BuildOutlined, Event, Filter, Today } from '@material-ui/icons';
import { useState } from 'react';
import { CpfCnpjIcon, PaymentVoucherIcon } from '../../../assets/icons/iconsSvg';
import { storageService } from '../../../services/storage.service';
import { obterComprovantesTransacao } from '../../../services/comprovante.service';
import CustomUserCard from '../../layouts/components/CustomUserCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleDialog from '../../layouts/components/SimpleDialog';
import { KeyboardDatePicker, MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import brLocale from "date-fns/locale/pt-BR";
import { ComprovanteModel } from '../../models/Comprovante.model';
import Page from '../../layouts/components/Page';
import ComprovantePix from '../ComprovantePix';

const useStyles = makeStyles({
	filterOptions: {
		fontWeight: 800,
	},
	chipStyle: {
		marginRight: '12px'
	},
	selectedStyle: {
		backgroundColor: '#a6193c'
	},
	dateDivider: {
		backgroundColor: '#E7EBE6',
		border: '1px solid #C7CED1',
		padding: '6px 12px',
		color: '#a6193c',
		fontWeight: 'bolder',
		fontSize: '16px',
		borderRadius: '5px',
		marginBottom: '-1em'
	},
})

const enum FilterType {
	ULTIMAS = 1,
	SETE_DIAS = 2,
	DATA = 3
}

const DateDivider = (props: any) => {

	const { data } = props;

	const classes = useStyles();

	return (
		<Box className={classes.dateDivider}>
			{data}
		</Box>
	);
}

const retornarDataLabel = (data: string) => {
	const date = new Date(data);
	const dia = date.getDate();
	const mes = date.toLocaleDateString('pt-BR', { month: 'long' });
	const ano = date.getFullYear();

	return `${dia} ${mes} ${ano}`;
}

const ListaComprovante = (props: any) => {

	const { comprovante, isDesktop, navigate, setIdTransacao } = props;

	const retornarIcon = (tipoTransacao: number, dataTransacao: string) => {
		const dataTransacaoDate = new Date(dataTransacao).toISOString().split('T')[0];
		const dadosTipoTransacao = { 
			label: 'Pix - Pagamento', 
			icon: <ArrowUpward color='primary' />
		};

		console.log('tipo: ' + tipoTransacao)

		if(tipoTransacao == 3 || tipoTransacao == 4 ) {
			dadosTipoTransacao.label = 'Pix - Devolução';
		}

		if(dataTransacaoDate > new Date().toISOString().split('T')[0]){
			dadosTipoTransacao.label = 'Pix - Agendamento';
			dadosTipoTransacao.icon = <Today color='primary' />
		}

		return dadosTipoTransacao;

	}

	return <>
		<Grid item xs={12}>
			<DateDivider data={retornarDataLabel(comprovante.data)} />
		</Grid>
		{ comprovante.comprovantes.map((comp: ComprovanteModel) => {
			const { label, icon } = retornarIcon(comp.tipoIniPagamento, comp.dataTransacao);

			return <Grid key={comp.codigoTransacao} item xs={12} >
				<CustomUserCard 
					nomeRecebedor={label} 
					bancoRecebedor={ comp.nomeRecebedor }
					chaveRecebedor='' 
					additionalInfoPrimary={ comp.valorTransacao.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}).replace(/[\s-]/, "") }
					additionalInfoSecondary={ new Date(comp.dataTransacao).toLocaleDateString() }
					elevation={isDesktop}
					icon={ icon }
					actionIcon={<PaymentVoucherIcon />}
					iconSize={isDesktop ? 'normal' : 'small'}
					onClick={() => {
						navigate(true);
						setIdTransacao(comp.codigoTransacao)
					}}
					divider/>
					
			</Grid>
		}) }
	</>
}

const ConsultaComprovante = () => {
	const classes = useStyles();



	const [ selectedFilter, setSelectedFilter ] = useState(FilterType.ULTIMAS);
	const [ comprovanteList, setComprovanteList ] = useState(Array<ComprovanteList>);
	const [open, setOpen] = useState(false);

	const handleDialogClose = () => {
    setOpen(false);
  }

	const navigate = useNavigate();

	const handleFilterChange = (filter: FilterType) => {
		setSelectedFilter(filter);
		if(filter == FilterType.DATA) {
			setOpen(true);
			return;
		}
		consultarComprovantes(filter);
	}

	const isSelectedChip = (chip: FilterType): boolean=> {
		return chip === selectedFilter;
	}

	const isDesktop = useMediaQuery('(min-width:600px)');

	const dadosConta = storageService.recover("conta_no_asp");
  const dadosSessao = storageService.recover("x_access_token");

	interface ComprovanteList {
		data: string;
		comprovantes: Array<ComprovanteModel>;
	}

	const groupBy = (c: Array<ComprovanteModel>) => {
		const comprovantesAr: Array<ComprovanteList> = [];

		c.forEach((item: ComprovanteModel) => {
			let comprovante = comprovantesAr.find((comprov: ComprovanteList) => comprov.data == item.dataTransacao);

			if(comprovante){
				comprovante.comprovantes.push(item);
			} else {
				comprovantesAr.push({
					data: item.dataTransacao,
					comprovantes: [ item ]
				})
			}
		});

		return comprovantesAr;
	}

	// Repassar essa logica para um service
	const consultarComprovantes = (tipo: FilterType) => {

		setLoading(true);

		let retorno = [];

		if(tipo == FilterType.ULTIMAS){
			obterComprovantesTransacao(
				new Date().toISOString().split('T')[0],
				new Date().toISOString().split('T')[0],
				dadosConta.agencia,
				dadosConta.conta,
				dadosConta.digito,
				dadosConta.tipoConta
			).then((response: any) => {
				console.log('response', response);
				retorno = response.data.result;

				const comprovantes = groupBy(retorno);
				console.log('comprovantes', comprovantes);

				setComprovanteList(comprovantes);
				setLoading(false);
			}).catch((error: any) => {
				console.log('error', error)
			})
		}

		if(tipo == FilterType.SETE_DIAS){
			let dataInicial = new Date();
			dataInicial.setDate(dataInicial.getDate() - 7);
			const dataInicialStr = dataInicial.toISOString().split('T')[0];
			let dataFinal = new Date().toISOString().split('T')[0];

			obterComprovantesTransacao(
				dataInicialStr,
				dataFinal,
				dadosConta.agencia,
				dadosConta.conta,
				dadosConta.digito,
				dadosConta.tipoConta
			).then((response: any) => {
				console.log('response', response);
				retorno = response.data.result;

				const comprovantes = groupBy(retorno);
				console.log('comprovantes', comprovantes);
				
				setComprovanteList(comprovantes);
				setLoading(false);
			}).catch((error: any) => {
				console.error('error', error)
			})
		}

		if(tipo == FilterType.DATA){
			obterComprovantesTransacao(
				data.toISOString().split('T')[0],
				data.toISOString().split('T')[0],
				dadosConta.agencia,
				dadosConta.conta,
				dadosConta.digito,
				dadosConta.tipoConta
			).then((response: any) => {
				console.log('response', response);
				retorno = response.data.result;

				const comprovantes = groupBy(retorno);
				console.log('comprovantes', comprovantes);
				
				setComprovanteList(comprovantes);
				setLoading(false);
			}).catch((error: any) => {
				console.log('error', error)
			})
		}
	}

	const handleConfirmAction = (value: any) => {
		consultarComprovantes(FilterType.DATA);
		setOpen(false);
	}
	
  useEffect(() => {
		consultarComprovantes(FilterType.ULTIMAS);

		setExibirComprovante(false);

    console.log('Dados: ', dadosConta, dadosSessao);
  }, []);

	const [ data, setData ] = useState(new Date() as any);

	const [ loading, setLoading] = useState(false);

	const[ exibirComprovante, setExibirComprovante] = useState(false);

	const [ idTransacao, setIdTransacao ] = useState(0);

	const TelaConsulta = () => {
		return <>
			<Grid item classes={{ root: classes.filterOptions }}>
				<Chip 
					label="Últimas" 
					classes={{ root: classes.chipStyle }} 
					color={ isSelectedChip(FilterType.ULTIMAS) ? 'primary' : 'default' } 
					onClick={() => handleFilterChange(FilterType.ULTIMAS) } />

				<Chip 
					label="7 dias" 
					classes={{ root: classes.chipStyle }} 
					color={ isSelectedChip(FilterType.SETE_DIAS) ? 'primary' : 'default' } 
					onClick={() => handleFilterChange(FilterType.SETE_DIAS) } />

				<Chip 
					label="Data" 
					classes={{ root: classes.chipStyle }} 
					color={ isSelectedChip(FilterType.DATA) ? 'primary' : 'default' } 
					onClick={() => handleFilterChange(FilterType.DATA) } />
		
			</Grid>

			{
				loading ?
					<Grid item xl={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
						<CircularProgress />
					</Grid>
				:
					comprovanteList.length > 0 ? comprovanteList.map((comprovante) => {
						return <ListaComprovante comprovante={comprovante} isDesktop={isDesktop} navigate={setExibirComprovante} setIdTransacao={setIdTransacao} />
							
					}) : <Grid item xs={12}><Typography>Nenhum resultado encontrado</Typography></Grid>
			}
		

			<SimpleDialog open={open} title="Escolha a data" handleConfirm={handleConfirmAction} handleClose={() => handleDialogClose()} >
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale} >
					<KeyboardDatePicker 
						inputVariant='outlined'
						keyboardIcon={<Today />}
						fullWidth
						label="Data:"
						format="dd/MM/yyyy"
						variant="dialog"
						cancelLabel="Cancelar"onChange={(value) => setData(value)} value={data} />
				</MuiPickersUtilsProvider>
			</SimpleDialog> 
		</>
	}

  return (
		<>
			<Page label="Pix - Comprovantes" navigate={navigate} >
				<Grid container spacing={3}>

					{ !exibirComprovante && <TelaConsulta />}

					{ exibirComprovante && <Grid container justifyContent='center' >
							<Grid item xs={isDesktop && 3}><ComprovantePix transacaoId={String(idTransacao)} /></Grid>
						</Grid>}

				</Grid>
			</Page>
		</>
  )
}

export default ConsultaComprovante