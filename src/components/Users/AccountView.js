import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    background: `url(${require(`../../assets/images/login.jpg`)}) center center / cover`,
    height: '100%',
    '& button': {
      '& > span': {
        color: theme.palette.primary.main,
        fontWeight: 550,
        fontSize: '1.6rem',
        [theme.breakpoints.down('sm')]: {
          fontSize: '1.2rem',
        },
      },
    },
  },
  form: {
    padding: `${theme.spacing(3)}px ${theme.spacing(7)}px`,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    background: 'rgba(50, 50, 50, .55)  0% 0% no-repeat padding-box',
    '& > p:first-child': {
      fontWeight: 'bold',
    },
    '& > div': {
      marginBottom: theme.spacing(3),
    },
  },
}));

const AccountView = ({ handleSubmit, children }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Container
        component="form"
        maxWidth="sm"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={classes.form}
      >
        {children}
      </Container>
    </Grid>
  );
};

AccountView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AccountView;
