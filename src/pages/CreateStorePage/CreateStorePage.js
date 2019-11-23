import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { shopActions } from '../../actions';
import Dialog from '../../components/Dialog';
import BusinessTime from './BusinessTime';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  addressWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  storeTypeContainer: {
    width: 500,
    display: 'flex',
    flexWrap: 'wrap',
    margin: 20,
    '& > div': {
      margin: 10,
    },
  },
  storeTypeName: {
    userSelect: 'none',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

const CreateStorePage = ({
  county,
  district,
  error,
  loading,
  storeType,
  getCountry,
  getDistrict,
  getStoreType,
  createStore,
}) => {
  const classes = useStyles();
  const [state, setState] = useState({
    storename: '',
    tel: '',
    businessTime: '',
    city: '',
    district: '',
    address: '',
    type: {},
  });
  const [open, setOpen] = useState(false);
  const [childrenType, setChildrenType] = useState([]);
  const [storeTypeCheck, setStoreTypeCheck] = useState({});
  useEffect(() => {
    getCountry();
    getStoreType();
  }, [getCountry, getStoreType]);

  useEffect(() => {
    if (state.city) {
      getDistrict(state.city.split('-')[0]);
    }
  }, [state.city, getDistrict]);

  // useEffect(() => {
  //   if (Object.keys(storeType).length !== 0) {
  //     console.log(storeType);
  //     const storeTypeObj = Object.keys(storeType)
  //       .map(key =>
  //         storeType[key].map(item => ({
  //           item: item,
  //           checked: false,
  //         }))
  //       )
  //       .flat()
  //       .reduce(
  //         (accu, curr) => ({
  //           ...accu,
  //           [curr.item]: curr.checked,
  //         }),
  //         {}
  //       );

  //     setStoreTypeCheck(storeTypeObj);
  //     setState(c => ({
  //       ...c,
  //       type: storeTypeObj,
  //     }));
  //   }
  // }, [storeType]);

  function handleChange(e) {
    const target = e.target;
    setState(c => ({
      ...c,
      [target.name]: target.value,
    }));
  }

  function hadnleSubmit(e) {
    e.preventDefault();
    const isTrueType = Object.entries(storeType)
      .map(([key, val]) => ({ [key]: val.filter(_ => storeTypeCheck[_]) }))
      .filter(_ => Object.values(_)[0].length !== 0)
      .reduce((accu, curr) => ({ ...accu, ...curr }), {});
    createStore({
      store_name: state.storename,
      city: state.city,
      district: state.district,
      address: state.address,
      tel: state.tel,
      business_time: state.businessTime,
      types: isTrueType,
    });
  }

  function updateChildren(parent) {
    setChildrenType(storeType[parent]);
  }

  function handleChangeParentType(e, parent) {
    const children = storeType[parent];
    const copyTypeChecked = { ...storeTypeCheck };
    for (const kid of children) {
      copyTypeChecked[kid] = e.target.checked;
    }

    setStoreTypeCheck(copyTypeChecked);
  }

  function handleChangeChildType(e, child) {
    const target = e.target;
    setStoreTypeCheck(c => ({
      ...c,
      [child]: target.checked,
    }));
  }

  function handleSubmitType() {
    setOpen(false);
    setState(c => ({
      ...c,
      type: storeTypeCheck,
    }));
  }

  function handleCancelType() {
    setStoreTypeCheck(state.type);
    setOpen(false);
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <BusinessTime />
      </Grid>
      <Grid item xs={12} sm={6}>
        <BusinessTime />
      </Grid>
    </Grid>
  );
  // return (
  //   <form
  //     className={classes.container}
  //     autoComplete="off"
  //     onSubmit={hadnleSubmit}
  //     noValidate
  //   >
  //     <Typography variant="h1">新增店家</Typography>
  //     <TextField
  //       id="filled-storename-input"
  //       label="店名"
  //       type="storename"
  //       className={classes.textField}
  //       value={state.storename}
  //       onChange={handleChange}
  //       name="storename"
  //       margin="normal"
  //       variant="filled"
  //       required
  //     />
  //     <FormControl variant="outlined" className={classes.formControl} disabled>
  //       <InputLabel htmlFor="select-store-type">店家類別</InputLabel>
  //       <Select
  //         id="demo-simple-select-disabled"
  //         onClick={() => setOpen(true)}
  //         value={Object.entries(state.type)
  //           .filter(([key, val]) => val)
  //           .map(_ => _[0])
  //           .join(',')}
  //         inputProps={{ name: 'type', id: 'select-store-type' }}
  //       >
  //         <MenuItem
  //           value={Object.entries(state.type)
  //             .filter(([key, val]) => val)
  //             .map(_ => _[0])
  //             .join(',')}
  //         >
  //           {Object.entries(state.type)
  //             .filter(([key, val]) => val)
  //             .map(_ => _[0])
  //             .join(',')}
  //         </MenuItem>
  //       </Select>
  //     </FormControl>
  //     <TextField
  //       id="filled-tel-input"
  //       label="店家電話"
  //       type="tel"
  //       className={classes.textField}
  //       value={state.tel}
  //       onChange={handleChange}
  //       name="tel"
  //       margin="normal"
  //       variant="filled"
  //       required
  //     />
  //     <TextField
  //       id="time"
  //       label="營業時間"
  //       type="time"
  //       onChange={handleChange}
  //       value={state.businessTime}
  //       className={classes.textField}
  //       // InputLabelProps={{
  //       //   shrink: true,
  //       // }}
  //       inputProps={{
  //         step: 1800, // 30 min
  //       }}
  //     />
  //     <div className={classes.addressWrap}>
  //       <FormControl variant="outlined" className={classes.formControl}>
  //         <InputLabel htmlFor="outlined-city-native-simple">縣市</InputLabel>
  //         <Select
  //           value={state.city}
  //           onChange={handleChange}
  //           inputProps={{ name: 'city', id: 'outlined-city-native-simple' }}
  //         >
  //           {county.map(({ countyname, countycode }) => (
  //             <MenuItem key={countycode} value={`${countycode}-${countyname}`}>
  //               {countyname}
  //             </MenuItem>
  //           ))}
  //         </Select>
  //       </FormControl>
  //       <FormControl
  //         variant="outlined"
  //         className={classes.formControl}
  //         disabled={district.length === 0}
  //       >
  //         <InputLabel htmlFor="outlined-district-native-simple">
  //           地區
  //         </InputLabel>
  //         <Select
  //           value={state.district}
  //           onChange={handleChange}
  //           inputProps={{
  //             name: 'district',
  //             id: 'outlined-district-native-simple',
  //           }}
  //         >
  //           {district.map(({ towncode, townname }) => (
  //             <MenuItem key={towncode} value={townname}>
  //               {townname}
  //             </MenuItem>
  //           ))}
  //         </Select>
  //       </FormControl>
  //       <TextField
  //         id="filled-address-input"
  //         label="地址"
  //         type="address"
  //         className={classes.textField}
  //         value={state.address}
  //         onChange={handleChange}
  //         name="address"
  //         variant="filled"
  //         disabled={!(state.city && state.district)}
  //         required
  //       />
  //     </div>
  //     {error && (
  //       <Typography variant="h6" color="error">
  //         {error}
  //       </Typography>
  //     )}
  //     <Box>
  //       {loading ? (
  //         <CircularProgress />
  //       ) : (
  //         <Button variant="contained" className={classes.button} type="submit">
  //           新增
  //         </Button>
  //       )}
  //     </Box>
  //     <Dialog
  //       title="類別種類"
  //       onCancel={handleCancelType}
  //       onSubmit={handleSubmitType}
  //       open={open}
  //     >
  //       <Typography variant="subtitle1">大類</Typography>
  //       <div className={classes.storeTypeContainer}>
  //         {Object.keys(storeType).map(key => (
  //           <div key={key.toString()}>
  //             <Checkbox
  //               color="primary"
  //               onChange={e => handleChangeParentType(e, key)}
  //               // checked={storeType[key].every(_ => storeTypeCheck[_])}
  //             />
  //             <Typography
  //               variant="body1"
  //               component="span"
  //               className={classes.storeTypeName}
  //               onClick={() => updateChildren(key)}
  //             >
  //               {key}
  //             </Typography>
  //           </div>
  //         ))}
  //       </div>
  //       <Divider />
  //       <Typography variant="subtitle1">細項</Typography>
  //       <div className={classes.storeTypeContainer}>
  //         {childrenType.map((child, idx) => (
  //           <div key={idx}>
  //             <FormControlLabel
  //               control={
  //                 <Checkbox
  //                   color="primary"
  //                   checked={storeTypeCheck[child]}
  //                   onChange={e => handleChangeChildType(e, child)}
  //                 />
  //               }
  //               label={child}
  //             />
  //           </div>
  //         ))}
  //       </div>
  //     </Dialog>
  //   </form>
  // );
};

function mapStateToProp(state) {
  return {
    ...state.county,
    storeType: state.storeType,
    loading: state.createStore.loading,
    error: state.createStore.error,
  };
}

const actionCreators = {
  getCountry: shopActions.getCountry,
  getDistrict: shopActions.getDistrict,
  getStoreType: shopActions.getStoreType,
  createStore: shopActions.createStore,
};

export default connect(mapStateToProp, actionCreators)(CreateStorePage);
