import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { setSelectedInstrument } from '../../../redux/Instruments/action';
import {useDispatch} from 'react-redux'
import InstrumentsTable from './Table';
import _ from 'underscore';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { theme } from '../../../theme';


const InstrumentContainer = () => {

    const classes = useStyles();
    const {instruments, selectedInstrument} = useSelector(state => state.instruments)
    const [selectedInstrumentId , setSelectedInstrumentId] = useState(instruments[0].InstrumentId)
    const dispatch = useDispatch();

    const [fromDate , setFromDate ] = useState(new Date().setDate(new Date().getDate() - 1));
    const [toDate , setToDate ] = useState(new Date());

    const handleChange = (e) => {
      setSelectedInstrumentId(e.target.value)
    }

    const getChange = (id) => {
      const instrument = instruments.filter(item => item.InstrumentId === id )  
      if(instrument.length && !_.isUndefined(instrument[0].percentChange)){
          return `${instrument[0].percentChange.toFixed(2)}%`
      }
      return 'N/A'
    }

    useEffect(() => {
        dispatch(setSelectedInstrument(selectedInstrumentId))
    },[selectedInstrumentId, dispatch])


    
  return (
    <div style={{ width: '80%', margin: '0 auto', background: theme.palette.primary.main,}}>
        <div className={classes.formControlContainer}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label" className={classes.label} >Pairing</InputLabel>
            <Select
            style={{color: theme.palette.common.white}}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={selectedInstrumentId}
            onChange={handleChange}
            >
            {instruments.map((item) => {
                return(
                    <MenuItem key={item.InstrumentId} value={item.InstrumentId}>{`${item.Product1Symbol}/${item.Product2Symbol}`}</MenuItem>
                )
            })}
            </Select>
            <div style={{display:'flex', flexDirection: 'row', padding: '1em'}} className={classes.label} >
              FROM: <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
            </div>
            <div style={{display:'flex', flexDirection: 'row',  padding: '1em'}} className={classes.label} >
            TO: <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
            </div>
         
          
          </FormControl>
         </div>
         <div style={{display: 'flex', height: '700px',padding: '1em' }}>
            <div style={{width: '70%'}}>
              <InstrumentsTable fromDate={fromDate} toDate={toDate} />
            </div>
            <div style={{padding: '1em'}}>
              <label className={classes.digits}> {getChange(selectedInstrument[0]?.InstrumentId)}</label>
              <p  className={classes.label}>CHANGE</p>
              <label className={classes.digits}>{selectedInstrument[0]?.MinimumPrice}</label>
              <p className={classes.label}>MINIMUM PRICE</p>
              <label className={classes.digits}>{selectedInstrument[0]?.MinimumQuantity}</label>
              <p className={classes.label}>MINIMUM QUANTITY</p>
              <label className={classes.digits}>{selectedInstrument[0]?.PriceIncrement}</label>
              <p className={classes.label}>PRICE INCREMENT</p>
              <label className={classes.digits}>{selectedInstrument[0]?.QuantityIncrement}</label>
              <p className={classes.label}>QUANTITY INCREMENT</p>
            </div>
         </div>

    </div>
  );
}


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  formControlContainer: {
    borderBottom: '1px solid black',
    width: '100%',
   
  },
  digits: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: theme.palette.common.white
  },
  formControl:{
    display: 'flex',
    flexDirection: 'row'
  },
  label:{
    color: theme.palette.common.white
  }
});


export default InstrumentContainer