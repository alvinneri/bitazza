import React, { useCallback, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { InstrumentsApi } from '../../../api/instruments';
import { setSelectedInstrument } from '../../../redux/Instruments/action';
import {useDispatch} from 'react-redux'
import InstrumentsTable from './Table';
import _ from 'underscore';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  formControlContainer: {
    borderBottom: '1px solid black',
    width: '100%'
  },
  digits: {
    fontSize: '2rem',
    fontWeight: 'bold'
  }
});

const InstrumentContainer = () => {
    const classes = useStyles();
    const {instruments, selectedInstrument, tickerHistories} = useSelector(state => state.instruments)
    const [selectedInstrumentId , setSelectedInstrumentId] = useState(instruments[0].InstrumentId)
    const dispatch = useDispatch();

    const getTicketHistory = useCallback(() => {

        let payload = {
            instrumentId: selectedInstrumentId,
            fromDate:  "2018-07-18",
            toDate: "2021-07-19"
        }

        InstrumentsApi.getTickerHistory(payload)
    },[selectedInstrumentId])

    const handleChange = (e) => {
      setSelectedInstrumentId(e.target.value)
    }

    const getChange = (id) => {
      const instrument = instruments.filter(item => item.InstrumentId === id )  
      if(instrument.length && !_.isUndefined(instrument[0].percentChange)){
          return instrument[0].percentChange.toFixed(2)
      }
      return 'N/A'
    }

    useEffect(() => {
        getTicketHistory()
        dispatch(setSelectedInstrument(selectedInstrumentId))
    },[selectedInstrumentId, dispatch])
    
  return (
    <div style={{ width: '80%', margin: '0 auto', background:"#efefef",}}>
        <div className={classes.formControlContainer}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Pairing</InputLabel>
            <Select
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
          </FormControl>
         </div>
         <div style={{display: 'flex', height: '700px',padding: '1em' }}>
            <div style={{width: '70%'}}>
              <InstrumentsTable />
            </div>
            <div style={{padding: '1em'}}>
              <label className={classes.digits}> {getChange(selectedInstrument[0]?.InstrumentId)}</label>
              <p>CHANGE</p>
              <label className={classes.digits}>{selectedInstrument[0]?.MinimumPrice}</label>
              <p>MINIMUM PRICE</p>
              <label className={classes.digits}>{selectedInstrument[0]?.MinimumQuantity}</label>
              <p>MINIMUM QUANTITY</p>
              <label className={classes.digits}>{selectedInstrument[0]?.PriceIncrement}</label>
              <p>PRICE INCREMENT</p>
              <label className={classes.digits}>{selectedInstrument[0]?.QuantityIncrement}</label>
              <p>QUANTITY INCREMENT</p>
            </div>
         </div>

    </div>
  );
}

export default InstrumentContainer