import { Button, Grid, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface PageProps {
  label: string;
  mobileLabel?: string;
  navigate: NavigateFunction;
  children: any;
}

const useStyles = makeStyles({
  root: {
    margin: '0px'
  },
  content: {
    marginBottom: '16px'
  }
})

const Page = (props: PageProps) => {

  const { label, mobileLabel, navigate, children } = props;

  const styles = useStyles();

	//const navigate = useNavigate();
	const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <Grid item xs={12} classes={{ root: styles.root }}>
        <Grid item xs={12} xl={12} lg={12} classes={{ root: styles.content }}>
          { 
            isDesktop ? 
              <Grid style={{ display: 'flex' }}>
                <Button onClick={() => navigate(-1)} style={{ position: 'static' }} startIcon={<ArrowBack htmlColor="grey" />}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'grey' }}>VOLTAR</span>
                </Button>
                <Typography style={{ fontWeight: 'bold', color: 'grey', alignItems: 'center', justifyContent: 'center', display: 'flex', flex: '90%', fontSize: '18px' }}>
                    {label}
                </Typography>
              </Grid>
            :
              <Typography style={{ fontWeight: 'bold', color: '#a6193c' }}>
                {mobileLabel ? mobileLabel : label}
              </Typography>
          }
        </Grid>

        {children}
    </Grid>
  )
}

export default Page