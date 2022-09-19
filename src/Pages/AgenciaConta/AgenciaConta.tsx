import * as React from "react";
import { AppBar, Tab, Grid, Typography, Tabs } from "@material-ui/core";
import { TabPanel, TabContext } from "@material-ui/lab";
import useStyles from "./AgenciaConta.Style";
import { Link, useNavigate } from "react-router-dom";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import Header from "../../layouts/components/Header";
import TabFavorites from "./TabFavorites";
import TabPreviusTransfers from "./TabPreviusTransfers";

export function AgenciaConta() {
  let navigate = useNavigate();
  const classes = useStyles();
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const handleSelected = (index: string) => {
    return index === value ? classes.tab_custom_selected : classes.tab_custom;
  };

  return (
    <React.Fragment>
      <Header
        title='Pix - Pagar com Agência e Conta'
        titleMobile='Pagar com Agência e Conta'
      />
      <Grid container spacing={1} className={classes.main_header}>
        <Grid item xs={12} md={12} sm={12}>
          <Typography className={classes.title_transfer}>
            Para quem você quer transferir?
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} className={classes.main_header}>
        <Grid item xs={12} md={12} sm={12}>
          <Typography
            className={classes.title_new_transfer}
            onClick={() => navigate("/tranferencia-agencia-conta")}>
            <AddCircleOutlinedIcon className={classes.icon_margin} />
            Nova Trânsferencia
          </Typography>
        </Grid>
      </Grid>

      <TabContext value={value}>
        <AppBar position='static'>
          <Tabs
            value={value}
            onChange={handleChange}
            className={classes.tabs_container_custom}
            TabIndicatorProps={{ className: classes.indicator }}
            aria-label='volunteer dashboard tabs'>
            <Tab label='Favoritos' value='1' className={handleSelected("1")} />
            <Tab
              label='Transferências Anteriores'
              value='2'
              className={handleSelected("2")}
            />
          </Tabs>
        </AppBar>
        <TabPanel value='1' className={classes.tabsPanel_custom}>
          <TabFavorites />
        </TabPanel>
        <TabPanel value='2' className={classes.tabsPanel_custom}>
          <TabPreviusTransfers />
        </TabPanel>
      </TabContext>
    </React.Fragment>
  );
}
