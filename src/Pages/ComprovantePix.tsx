import React,{ useEffect, useState }  from "react";
import { Fab, IconButton,SvgIcon } from "@material-ui/core";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { transactionService } from "../../services/transaction.service";
import { toDate,  toTime, toCurrency} from "../../services/util.service";
import { storageService } from "../../services/storage.service";
import api from "../../services/api";
import { maskPartialCpfCnpj } from "../../services/mask";
import {BnblogoIcone} from "../../assets/icons/iconsSvg"; 
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const outerTheme = createTheme({
  palette: {
    primary: {
      main: '#a6193c',
    },
  },
});

type Comprovanteprops = {
    transacaoId : string;
};

const initialForm = {
    codigoTransacao: 0,
    codigoitem: 0,
    idfimafim: "",
    idTransacaoOrigem: "",
    valortransacao: 0,
    valorRecebedor: 0,
    dataCadastro: "",
    dataCadastroDevolucao: "",
    descricao: "",
    motivoDevolucao: "",
    instituicaoPagador: "",
    nomePagador: "",
    cpfCnpjPagador: 0,
    codigoBancoDestino:0,
    instituicaoRecebedor: "",
    nomeRecebedor: "",
    cpfCNPJRecebedor: 0,
    codigoAgenciaDestino:0,
    codigoContaDestino:0,
    digitoContaDestino:0,
    tipoContaDestino:"",
    tipoIniciacaoPagamento: 0,
    StatusTransacao:0,
    codigoAutenticacao: "",
    identificacaoDevolucao: "",
    tipoPix: "",
    cdFinalidadeTransacao: "",
    valorSaqueTroco: 0,
    valorTrocoSaqueTroco: 0,
    valorOriginal: 0,
    valorDesconto: 0,
    valorJuros: 0,
    valorMulta: 0,
    valorAbatimento: 0,
    nomeDevedor: "",
    tituloCpfCnpjDevedor: "",
    dataTransacao: "",
    dataEfetivacao: "",
    dataHoraEnvioSistema: ""
}

const ComprovantePix = (props: Comprovanteprops) => {
    const [comprovante,setcomprovante] = useState(initialForm);
    const [favorito,setfavorito] = useState<boolean>(false);
    const [dateTransaction, setDateTransaction] = useState("");
    const [timeTransaction, setTimeTransaction] = useState("");
    const [loading, setLoading] = useState(true);
    const [Agendamento, setAgendamento] = useState(true);
    const [linknovopix, setlinknovopix] = useState("");

    const getComprovante = async (transacaoId:string) => {
        if (transacaoId != "") {
            try {
              var response = await transactionService.get(transacaoId);             
      
              if (response) {
                setDateTransaction(
                  toDate(response.dataTransacao.replace("+00:00", ""))
                );
                if (toDate(response.dataTransacao.replace("+00:00", "")) === toDate(new Date())){
                  setTimeTransaction(
                    toTime(response.dataTransacao.replace("+00:00", ""))
                  );
                }
                setcomprovante(response);

                if (response.tipoIniciacaoPagamento == 5 ){
                    setlinknovopix("#/pix-manual");
                }

                if (response.tipoIniciacaoPagamento == 1) {
                    setlinknovopix("#/pix-com-chave");
                }

                const session = storageService.recover("x_access_token");

                console.log(JSON.stringify(response));

                setfavorito(await verificaDestinatarioFavorito(session.documento,comprovante?.tipoContaDestino,comprovante?.codigoAgenciaDestino,comprovante?.codigoContaDestino,comprovante.digitoContaDestino,comprovante.codigoBancoDestino,"",0));
              }
            } catch (error) {
              console.log(error);
              setLoading(false);
            } finally {
              setLoading(false);
            }
        }       
    }

    async function verificaDestinatarioFavorito(CodigoCliente:number,TipoConta:string,agencia:number,conta:number,digito:number,codigobanco:number,ispb:string,op:number) {
            var urlTransacoes = "Contatos/verificar-favorito-conta?CodigoCliente="+CodigoCliente;
            urlTransacoes = urlTransacoes+"&TipoConta="+TipoConta;
            urlTransacoes = urlTransacoes+"&CodigoAgencia="+agencia;
            urlTransacoes = urlTransacoes+"&CodigoConta="+conta;
            urlTransacoes = urlTransacoes+"&DVConta="+digito;
            urlTransacoes = urlTransacoes+"&CodigoBanco="+codigobanco;
            if (ispb != ""){
                urlTransacoes = urlTransacoes+"&ISPB="+ispb;    
            }
            
            urlTransacoes = urlTransacoes+"&Op="+op;
            var response = await api.get(urlTransacoes);
            
            const responseFavorito = response.data.result;  
            console.log(JSON.stringify(responseFavorito));
            return responseFavorito.success;
    } 

    const favoritar = async () => {
        const session = storageService.recover("user_session");

        var urlfavorito = "Contatos/adicionar-favorito-conta?CodigoCliente="+session.codigoCliente;
        urlfavorito = urlfavorito+"&CpfCnpjCliente="+comprovante.cpfCnpjPagador;
        urlfavorito = urlfavorito+"&CpfCnpjDestinatario="+comprovante.cpfCNPJRecebedor;
        urlfavorito = urlfavorito+"&NomeDestinatario="+comprovante.nomeRecebedor;

        if(comprovante.cpfCnpjPagador === comprovante.cpfCNPJRecebedor){
            var destinatariodiferente = false;
        }else{
            var destinatariodiferente  = true;
        };

        const payload = {
            tipoConta: comprovante.tipoContaDestino,
            codigoAgencia: comprovante.codigoAgenciaDestino,
            codigoConta: comprovante.codigoContaDestino,
            digitoVerificadorConta: comprovante.digitoContaDestino,           
            isDestinatarioDiferente: destinatariodiferente,                
            codigoBanco: comprovante.codigoBancoDestino,
            ispb:comprovante.instituicaoRecebedor,
            isTed: false,
            isDoc: false,
            isTransferenciaBNB: false,
            isPixManual: true
        };
      
        console.log(payload);
          
        var response = await api.post(urlfavorito, payload);        
      
        var retornoFavoritar = response.data.result;

        if (retornoFavoritar.success){
            setfavorito(true);
            alert(retornoFavoritar.message);          
        }else {
            alert(retornoFavoritar.message); 
        }                               
    } 

    const desfavoritar = async () => {

        var IdFavoritoConta = 0;

        var urlfavorito = "/api/v1/Contatos/deletar-favorito-conta?IdFavoritoConta="+IdFavoritoConta+"&Op=0";

        var response = await api.get(urlfavorito);
        const responseFavorito = response.data.result;  
            
        if (responseFavorito.success){
            setfavorito(false);
            alert(responseFavorito.message);          
        }else {
            alert(responseFavorito.message); 
        }  
    } 

    const downloadPdf = async () => {
        const input = document.getElementById("printPDF");
        if (input) {
          html2canvas(input, {
            width: 1200,
            height: 1200,
            useCORS: true,
            allowTaint: true,
            scrollY: -window.scrollY,
          }).then((canvas) => {
            const image = canvas.toDataURL("image/jpeg", 1.0);
            const doc = new jsPDF("p", "px", "a4");
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
    
            const widthRatio = pageWidth / canvas.width;
            const heightRatio = pageHeight / canvas.height;
            const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
    
            const canvasWidth = canvas.width * ratio;
            const canvasHeight = canvas.height * ratio;
    
            doc.addImage(image, "JPEG", 150, 20, canvasWidth, canvasHeight);
    
            doc.save("comprovante.pdf");
          });
        }
      };
    
      const sharePdfLink = () => {
        if (comprovante) {
          const shareData = {
            title: "Comprovante BNB",
            text: "Clique para ver o comprovante",
            url: '${process.env.VITE_ORIGINS_URLS}/#/comprovante/${comprovante.transacaoId}',
          };
            try {
            navigator.share(shareData); 
            } catch (error) {
            downloadPdf();
            }
         
        } else {
          downloadPdf();
        }
      };

    const downloadOrSharePdf = () => {
        const user = storageService.recover("user_session");
        if (user.dispositivo.toLowerCase() === "mobile") sharePdfLink();
        else downloadPdf();
      };

      function tituloComprovante() {

        const tipopagamento = comprovante?.tipoIniciacaoPagamento;
                
            if(tipopagamento == 2 || tipopagamento == 3 || tipopagamento == 8){
                return "Pix - Pagar com QR Code";    
            }
            else if (tipopagamento == 4 ||tipopagamento == 7 || tipopagamento == 9){
                return "Pix - Pagar com Copia e Cola";
            }
            else if (tipopagamento == 5 ){
                return "Pix - Pagar com Agência e Conta";
            }
            else if (tipopagamento == 6){
                return "Pix - Devolu��o";
            } else {
                return "Pix - Pagar com Chave Pix";
            }
      }

    useEffect(() => {  
        const initialize = async () => {
          await getComprovante(props.transacaoId);
        }
        initialize();
    
      }, [props.transacaoId]);

    return (
        <div style={{fontFamily:"Lato, sans-serif",fontSize:"14px",color: "#9a9a9a"}}>
            <h3 style={{display:"flex",justifyContent: "center",alignItems: "center",color:"#9a9a9a"}}>{tituloComprovante()}</h3>           
                <div style={{display:"flex",justifyContent: "center",alignItems: "center",margin:"12px"}}>
                    {favorito ?                   
                        <IconButton aria-label="desfavoritar">
                            <SvgIcon viewBox="0 0 27 27" onClick={() => desfavoritar()}>
                                <path d="M12.593 0.95296C12.9514 0.181228 14.0486 0.181231 14.407 0.952963L17.657 7.95124C17.8027 8.26499 18.1002 8.48115 18.4437 8.52277L26.1037 9.45116C26.9484 9.55354 27.2875 10.597 26.6643 11.1763L21.0128 16.4299C20.7595 16.6654 20.6458 17.0152 20.7124 17.3546L22.1965 24.9267C22.3602 25.7617 21.4726 26.4066 20.729 25.9929L13.9862 22.2415C13.6839 22.0733 13.3161 22.0733 13.0138 22.2415L6.271 25.9929C5.52744 26.4066 4.63984 25.7617 4.8035 24.9267L6.28765 17.3546C6.35418 17.0152 6.24054 16.6654 5.98717 16.4299L0.335733 11.1763C-0.287477 10.597 0.0515592 9.55354 0.896271 9.45116L8.55634 8.52277C8.89977 8.48115 9.19728 8.26499 9.34299 7.95124L12.593 0.95296Z" fill="#565656"/>
                            </SvgIcon>
                        </IconButton>
                        :
                        <IconButton aria-label="favoritar">
                            <SvgIcon viewBox="0 0 27 27" fill="none" onClick={() => favoritar()}>
                                <path d="M13.5 1.37416L16.75 8.37244C17.0415 8.99995 17.6365 9.43226 18.3233 9.51551L25.9834 10.4439L20.332 15.6975C19.8252 16.1685 19.5979 16.868 19.731 17.547L21.2152 25.119L14.4724 21.3676C13.8678 21.0313 13.1322 21.0313 12.5276 21.3676L5.78483 25.119L7.26897 17.547C7.40205 16.868 7.17477 16.1685 6.66803 15.6975L1.01659 10.4439L8.67666 9.51551C9.36351 9.43226 9.95854 8.99994 10.25 8.37244L13.5 1.37416Z" stroke="#565656" stroke-width="2" color="#FFFFFF"/>
                            </SvgIcon>
                        </IconButton> 
                        }            
                    <IconButton aria-label="agendamento recorrente">
                        <SvgIcon viewBox="0 0 23 27">
                            <path d="M20.5357 3.33871H18.0714V0.626008C18.0714 0.313004 17.7634 0 17.4554 0H15.4018C15.0424 0 14.7857 0.313004 14.7857 0.626008V3.33871H8.21429V0.626008C8.21429 0.313004 7.90625 0 7.59821 0H5.54464C5.18527 0 4.92857 0.313004 4.92857 0.626008V3.33871H2.46429C1.07813 3.33871 0 4.48639 0 5.84274V24.2056C0 25.6142 1.07813 26.7097 2.46429 26.7097H20.5357C21.8705 26.7097 23 25.6142 23 24.2056V5.84274C23 4.48639 21.8705 3.33871 20.5357 3.33871ZM20.2277 24.2056H2.77232C2.56696 24.2056 2.46429 24.1013 2.46429 23.8926V8.34677H20.5357V23.8926C20.5357 24.1013 20.3817 24.2056 20.2277 24.2056Z" fill="#565656"/>
                            <path d="M11.0001 10.7095C7.68561 10.7095 4.97597 13.4192 5.00016 16.7337C5.00016 20.024 7.68561 22.7095 11.0001 22.7095C12.5243 22.7095 13.9517 22.1288 15.0162 21.1853C15.1371 21.0643 15.1371 20.8708 15.0162 20.7498L14.0484 19.7821C13.9517 19.6853 13.7823 19.6853 13.6613 19.7821C12.9113 20.4353 11.992 20.774 11.0001 20.774C8.72592 20.774 6.93562 18.9595 6.93562 16.7579C6.91143 14.4353 8.7985 12.645 11.0243 12.6692C12.0404 12.6692 13.0081 13.0562 13.7581 13.7579L12.742 14.774C12.3791 15.1369 12.6452 15.7417 13.1533 15.7417H16.4194C16.7339 15.7417 17 15.4998 17 15.1611V11.9192C17 11.4111 16.371 11.145 16.0081 11.5079L15.1371 12.3788C14.0484 11.3627 12.5968 10.7337 11.0001 10.7095Z" fill="#565656"/>
                        </SvgIcon>
                    </IconButton>
                    <IconButton aria-label="salvar" onClick={() => downloadOrSharePdf()}>
                        <SvgIcon viewBox="0 0 25 25">
                            <path d="M24.1629 5.46875L19.5312 0.837054C19.029 0.334821 18.3594 0 17.6339 0H2.67857C1.17187 0 0 1.22768 0 2.67857V22.3214C0 23.8281 1.17187 25 2.67857 25H22.3214C23.7723 25 25 23.8281 25 22.3214V7.36607C25 6.64062 24.6652 5.97098 24.1629 5.46875ZM15.1786 2.67857V7.14286H8.03571V2.67857H15.1786ZM21.9866 22.3214H3.01339C2.79018 22.3214 2.67857 22.2098 2.67857 21.9866V3.01339C2.67857 2.84598 2.79018 2.67857 3.01339 2.67857H5.35714V8.48214C5.35714 9.26339 5.91518 9.82143 6.69643 9.82143H16.5179C17.2433 9.82143 17.8571 9.26339 17.8571 8.48214V2.90179L22.2098 7.31027C22.2656 7.36607 22.3214 7.42187 22.3214 7.53348V21.9866C22.3214 22.2098 22.154 22.3214 21.9866 22.3214ZM12.5 11.1607C9.76562 11.1607 7.58929 13.3929 7.58929 16.0714C7.58929 18.8058 9.76562 20.9821 12.5 20.9821C15.1786 20.9821 17.4107 18.8058 17.4107 16.0714C17.4107 13.3929 15.1786 11.1607 12.5 11.1607ZM12.5 18.3036C11.2165 18.3036 10.2679 17.3549 10.2679 16.0714C10.2679 14.8437 11.2165 13.8393 12.5 13.8393C13.7277 13.8393 14.7321 14.8437 14.7321 16.0714C14.7321 17.3549 13.7277 18.3036 12.5 18.3036Z" fill="#565656"/>
                        </SvgIcon>
                    </IconButton>
                </div>
                {Agendamento ? <strong style={{padding:"8px", color:"#000000",fontSize:"15px"}}>Comprovante de Agendamento</strong>
                : <strong style={{padding:"8px", color:"#000000",fontSize:"15px"}}>Comprovante de Pagamento</strong>
                }
                <div style={{padding:"8px"}}>{dateTransaction+" - "+timeTransaction}</div>
                {!Agendamento && comprovante?.StatusTransacao != 102 ?            
                <div style={{display:"flex",justifyContent: "center",alignItems: "center", border:"1px solid",verticalAlign:"middle", padding:"8px",borderRadius: "5px",fontSize:"12px",margin:"5px"}}>
                 <SvgIcon>
                    <path d="M11.3333 13.8125C11.3333 14.0117 11.1784 14.1667 10.9792 14.1667H6.02083C5.82161 14.1667 5.66667 14.0117 5.66667 13.8125V12.0417C5.66667 11.8424 5.82161 11.6875 6.02083 11.6875H7.08333V8.14583H6.02083C5.82161 8.14583 5.66667 7.99089 5.66667 7.79167V6.02083C5.66667 5.82161 5.82161 5.66667 6.02083 5.66667H9.5625C9.76172 5.66667 9.91667 5.82161 9.91667 6.02083V11.6875H10.9792C11.1784 11.6875 11.3333 11.8424 11.3333 12.0417V13.8125ZM9.91667 3.89583C9.91667 4.09505 9.76172 4.25 9.5625 4.25H7.4375C7.23828 4.25 7.08333 4.09505 7.08333 3.89583V2.125C7.08333 1.92578 7.23828 1.77083 7.4375 1.77083H9.5625C9.76172 1.77083 9.91667 1.92578 9.91667 2.125V3.89583ZM17 8.5C17 3.80729 13.1927 0 8.5 0C3.80729 0 0 3.80729 0 8.5C0 13.1927 3.80729 17 8.5 17C13.1927 17 17 13.1927 17 8.5Z" fill="#565656"/>
                 </SvgIcon>
                 Autorização realizada. Aguardando demais autorizações
                 </div>
                 : ""
                 }
                 <table style={{width:"100%"}}>  
                    <tr >
                        <td style={{width:"30%", textAlign: "left"}}><div>Valor</div></td>
                        <td style={{width:"70%", textAlign: "right"}}><div>{toCurrency(comprovante?.valorRecebedor)}</div></td>
                    </tr>
                    <tr >
                        <td style={{width:"30%", textAlign: "left"}}><div>Tarifa</div></td>
                        <td style={{width:"70%", textAlign: "right"}}><div>Tarifa Zerada</div></td>    
                    </tr> 
                    <tr >
                        <td style={{textAlign: "left"}}><div>Descrição</div></td>
                    </tr>
                 </table>
                 <div style={{backgroundColor:"#f0f0f0",verticalAlign:"middle", padding:"8px",borderRadius: "5px"}}>{comprovante?.descricao}</div>
                <div style={{marginTop:"10px",borderBottom: "1px solid #bbb"}}></div>
                <div style={{display:"flex",padding:"8px",verticalAlign:"middle"}}>
                <SvgIcon viewBox="0 0 16 18">
                    <path d="M8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928933 6.65685C0.538408 7.04738 0.538408 7.68054 0.928933 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1L7 1L7 18L9 18Z" fill="#565656"/>
                 </SvgIcon>
                 <strong style={{marginLeft:"8px"}}>Recebedor</strong>
                </div>	
                <table style={{width:"100%"}}>  
                    <tbody>
                        <tr>
                            <td style={{width:"30%", textAlign: "left"}}><div>Nome</div></td>
                            <td style={{width:"70%", textAlign: "right"}}>
                            <div>
                                {favorito ?
                                (<SvgIcon width="17" height="16" viewBox="0 0 17 16" fill="none" style={{marginRight:"4px"}}>
                                    <path d="M7.59303 0.952964C7.95143 0.181232 9.04857 0.181231 9.40697 0.952963L10.9571 4.29092C11.1028 4.60467 11.4004 4.82083 11.7438 4.86245L15.3974 5.30526C16.2421 5.40764 16.5811 6.45108 15.9579 7.03041L13.2624 9.53619C13.009 9.77172 12.8954 10.1215 12.9619 10.461L13.6698 14.0726C13.8335 14.9076 12.9458 15.5525 12.2023 15.1388L8.98618 13.3495C8.68388 13.1813 8.31612 13.1813 8.01382 13.3495L4.79772 15.1388C4.05415 15.5525 3.16655 14.9076 3.33021 14.0726L4.0381 10.461C4.10464 10.1215 3.991 9.77172 3.73763 9.53619L1.04207 7.03042C0.418864 6.45108 0.757898 5.40764 1.60261 5.30526L5.25622 4.86245C5.59964 4.82083 5.89716 4.60467 6.04287 4.29092L7.59303 0.952964Z" fill="#A7A7A7"/>
                                </SvgIcon>) : ("")
                                }
                                {comprovante?.nomeRecebedor}</div>
                            </td>
                        </tr>
                        <tr >
                            <td style={{width:"30%", textAlign: "left"}}><div>CPF</div></td>
                            <td style={{width:"70%", textAlign: "right"}}><div>{maskPartialCpfCnpj(comprovante?.cpfCNPJRecebedor.toString())}</div></td>    
                        </tr> 
                        <tr >
                            <td style={{width:"30%", textAlign: "left"}}><div>Instituição</div></td>
                            <td style={{width:"70%", textAlign: "right"}}><div>{comprovante?.instituicaoRecebedor}</div></td>   
                        </tr>
                    </tbody>
                </table>
                <div style={{marginTop:"10px",borderBottom: "1px solid #bbb"}}></div>
                <div style={{display:"flex",padding:"8px",verticalAlign:"middle"}}>
                    <SvgIcon viewBox="0 0 16 18">
                        <circle cx="7" cy="7" r="7" fill="#565656"/>
                    </SvgIcon>
                 <strong style={{marginLeft:"8px"}}>Pagador</strong>
                </div>	
                <table style={{width:"100%"}}>  
                    <tbody>
                        <tr>
                            <td style={{width:"30%", textAlign: "left"}}><div>Nome</div></td>
                            <td style={{width:"70%", textAlign: "right"}}><div>{comprovante?.nomePagador}</div></td>
                        </tr>
                        <tr >
                            <td style={{width:"30%", textAlign: "left"}}><div>CPF</div></td>
                            <td style={{width:"70%", textAlign: "right"}}><div>{maskPartialCpfCnpj(comprovante?.cpfCnpjPagador.toString())}</div></td>    
                        </tr> 
                        <tr >
                            <td style={{width:"30%", textAlign: "left"}}><div>Instituição</div></td>
                            <td style={{width:"70%", textAlign: "right"}}><div>{comprovante?.instituicaoPagador}</div></td>   
                        </tr>
                    </tbody>
                </table>
                <div style={{display:"flex",backgroundColor:"#f0f0f0",justifyContent: "center",alignItems: "center",padding:'8px'}}>
                    <BnblogoIcone />                
                </div>
                {Agendamento ? (""):(
                <div style={{display:"flex",backgroundColor:"#f0f0f0",justifyContent: "center",alignItems: "center",borderTop:"1px solid",padding:"8px"}}>
                    ID/Transação<br/>
                {comprovante?.idfimafim}
                </div> 
                )} 
                {Agendamento ? (""):(
                <div style={{backgroundColor:"#f0f0f0",borderTop:"1px solid",padding:"8px",textAlign:"center"}}>
                    Código de Autenticação<br/>   
                    <div style={{wordBreak:"break-all"}}>{comprovante?.codigoAutenticacao}</div>
                </div> 
                )}                
                <div style={{display:"flex",justifyContent: "center",alignItems: "center", marginTop:"20px"}}>
                    <MuiThemeProvider theme={outerTheme}>
                    <Fab color="primary" aria-label="Novo Pix" href={linknovopix}>
                    <SvgIcon width="25" height="26" viewBox="0 0 25 26" fill="none" >
                        <path d="M19.6337 19.2653C18.6761 19.2653 17.7785 18.897 17.1006 18.219L13.449 14.5674C13.198 14.3164 12.7424 14.3164 12.4914 14.5674L8.82475 18.234C8.1468 18.912 7.24924 19.2803 6.29166 19.2803H5.57007L10.2093 23.9195C11.6525 25.3627 14.0082 25.3627 15.4514 23.9195L20.1043 19.2666L19.6337 19.2653Z" fill="white"/>
                        <path d="M6.27664 6.33523C7.23422 6.33523 8.13178 6.70353 8.80972 7.38147L12.4764 11.0481C12.741 11.3127 13.1679 11.3127 13.4339 11.0481L17.1006 7.39648C17.7785 6.71853 18.6761 6.35023 19.6336 6.35023H20.0756L15.4227 1.69738C13.9796 0.254193 11.6238 0.254193 10.1806 1.69738L5.54004 6.33523H6.27664Z" fill="white"/>
                        <path d="M23.9179 10.1942L21.1052 7.38146C21.0465 7.41147 20.9729 7.42511 20.8992 7.42511H19.6183C18.9554 7.42511 18.3075 7.68974 17.8519 8.16171L14.1989 11.8133C13.8606 12.1516 13.4036 12.329 12.9617 12.329C12.5047 12.329 12.0627 12.1516 11.7244 11.8133L8.05781 8.14671C7.5872 7.6761 6.93927 7.41011 6.29134 7.41011H4.71583C4.64217 7.41011 4.58352 7.3951 4.52486 7.36646L1.69714 10.1942C0.253949 11.6374 0.253949 13.9931 1.69714 15.4363L4.50986 18.249C4.56851 18.219 4.62717 18.2054 4.70083 18.2054H6.27633C6.93927 18.2054 7.5872 17.9408 8.04281 17.4688L11.7094 13.8022C12.3724 13.1392 13.5359 13.1392 14.1975 13.8022L17.8491 17.4538C18.3197 17.9244 18.9677 18.1904 19.6156 18.1904H20.8965C20.9701 18.1904 21.0288 18.2054 21.1024 18.234L23.9152 15.4213C25.3611 13.9781 25.3611 11.6374 23.9179 10.1942Z" fill="white"/>    
                    </SvgIcon>
                    </Fab>
                    </MuiThemeProvider>
                </div>
        </div>     
    );   
}

export default ComprovantePix;