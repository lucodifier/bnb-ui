import * as React from "react";
import { Button, Card, Grid, Typography } from "@material-ui/core";

import {
  PayAgencyIcon,
  PayPixIcon,
  PayCopyPasteIcon,
  PayQRCodeIcon,
  ReceiveIcon,
} from "../../assets/icons/iconsSvg";
import useStyles from "./Home.styles";
import IconCard from "../layouts/components/IconCard";
import { Link } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { formatDocument } from "../../services/util.service";
import { storageService } from "../../services/storage.service";
import imgQrCode from '../../assets/img/QRCode.png';

export function Home() {
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [userDoc, setUserDoc] = React.useState("");

  const { userInfo } = React.useContext(LoginContext);

  React.useEffect(() => {
    if (userInfo && userInfo.login) {
      setUserName(userInfo.login);
      setUserDoc(formatDocument(userInfo.document));
    } else {
      var user = storageService.recover("x_access_token");
      if (user && user.documento) {
        setUserName(user.login);
        setUserDoc(formatDocument(user.documento));
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} sm={12}>
          <Card className={classes.cards_blocks}>
            <Grid item xs={3} md={3} sm={3}>
              <img
                src={imgQrCode}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6} md={6} sm={6}>
              <Typography className={classes.card_key_text}>
                {userName}
              </Typography>
              <Typography className={classes.card_key_sub_text}>
                Chave cadastrada
              </Typography>
              <Typography className={classes.card_key_sub_text}>
                {userDoc}
              </Typography>
              <Link to='/home' className={classes.button_text_actions}>
                compartilhar
              </Link>
              {/* <Button size='small' className={classes.button_text_actions}>
                COMPARTILHAR
              </Button> */}
            </Grid>
            <Grid item xs={4} md={4} sm={4}>
              <div className={classes.button_receber}>
                <div className={classes.icon_receber}>
                  <ReceiveIcon />
                  <Link to='/home' className={classes.text_receber}>
                    Receber
                  </Link>
                </div>
              </div>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={6} md={2} sm={6}>
          <Button
            classes={{ root: classes.card_link, label: classes.label }}
            variant='contained'
            color='primary'
            size='large'>
            <PayPixIcon />
            <span className={classes.text_button}>
              Pagar com <br /> Chave Pix
            </span>
          </Button>
        </Grid>
        <Grid item xs={6} md={2} sm={6}>
          <Button
            classes={{ root: classes.card_link, label: classes.label }}
            variant='contained'
            color='primary'
            size='large'>
            <PayQRCodeIcon />
            <span className={classes.text_button}>
              Pagar Com <br />
              QR Code
            </span>
          </Button>
        </Grid>
        <Grid item xs={6} md={2} sm={6}>
          <Button
            classes={{ root: classes.card_link, label: classes.label }}
            variant='contained'
            color='primary'
            size='large'>
            <PayCopyPasteIcon />
            <span className={classes.text_button}>
              Pagar com <br /> Copia e Cola
            </span>
          </Button>
        </Grid>
        <Grid item xs={6} md={2} sm={6}>
          <Button
            classes={{ root: classes.card_link, label: classes.label }}
            variant='contained'
            color='primary'
            size='large'>
            <PayAgencyIcon />
            <span className={classes.text_button}>
              Pagar com <br />
              agência e Conta
            </span>
          </Button>
        </Grid>
      </Grid>
      <section className={classes.section_grid}>
        <span className={classes.title_section}>Consultar</span>
        <Grid container spacing={1}>
          <Grid item xs={6} md={3} sm={6}>
            <IconCard
              icon='extrato'
              title='Extrato'
              itens={[
                { title: "Por dia", link: "/home" },
                { title: "Por período", link: "/home" },
              ]}
            />
          </Grid>
          <Grid item xs={6} md={3} sm={6}>
            <IconCard
              icon='comprovantes'
              title='Comprovantes'
              to='/home'
              itens={[
                { title: "7 dias", link: "/home" },
                { title: "15 dias", link: "/home" },
                { title: "No período", link: "/home" },
              ]}
            />
          </Grid>

          <Grid item xs={6} md={3} sm={6}>
            <IconCard icon='chaves' title='Chaves Pix' to='/home' />
          </Grid>

          <Grid item xs={6} md={3} sm={6}>
            <IconCard icon='qrcodes' title='Meus QR Codes' to='/home' />
          </Grid>
        </Grid>
      </section>
      <section className={classes.section_grid}>
        <span className={classes.title_section}>Outros Serviços</span>
        <Grid container spacing={1}>
          <Grid item xs={6} md={3} sm={6}>
            <IconCard icon='favoritos' title='Favoritos' to='/home' />
          </Grid>

          <Grid item xs={6} md={3} sm={6}>
            <IconCard icon='meuslimites' title='Meus Limites Pix' to='/home' />
          </Grid>

          <Grid item xs={6} md={3} sm={6}>
            <IconCard
              icon='locais'
              title='Locais Pix Saque e Pix Troco'
              to='/home'
            />
          </Grid>

          <Grid item xs={6} md={3} sm={6}>
            <IconCard icon='contestacao' title='Contestação' to='/home' />
          </Grid>

          <Grid item xs={6} md={3} sm={6}>
            <IconCard icon='reclame' title='Reclame Aqui' to='/home' />
          </Grid>
        </Grid>
      </section>
    </React.Fragment>
  );
}
