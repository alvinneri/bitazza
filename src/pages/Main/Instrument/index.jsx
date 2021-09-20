import React, { useCallback, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { InstrumentsApi } from '../../../api/instruments';
import { setSelectedInstrument } from '../../../redux/Instruments/action';
import {useDispatch} from 'react-redux'


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
    const {instruments, selectedInstrument} = useSelector(state => state.instruments)
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

    useEffect(() => {
        getTicketHistory()
        dispatch(setSelectedInstrument(selectedInstrumentId))
    },[selectedInstrumentId, dispatch])

    console.log(selectedInstrument)

    
  return (
    <div style={{ width: '50%', margin: '0 auto', background:"#efefef",}}>
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
                    <MenuItem value={item.InstrumentId}>{`${item.Product1Symbol}/${item.Product2Symbol}`}</MenuItem>
                )
            })}
            </Select>
          </FormControl>
         </div>
         <div style={{display: 'flex', height: '700px',padding: '1em' }}>
            <div style={{width: '60%', borderRight: '1px solid black'}}>
              GRAPH
            </div>
            <div style={{padding: '1em'}}>
              <p className={classes.digits}>{selectedInstrument[0]?.MinimumPrice}</p>
              <p>MINIMUM PRICE</p>
              <p className={classes.digits}>{selectedInstrument[0]?.MinimumQuantity}</p>
              <p>MINIMUM QUANTITY</p>
              <p className={classes.digits}>{selectedInstrument[0]?.PriceIncrement}</p>
              <p>PRICE INCREMENT</p>
              <p className={classes.digits}>{selectedInstrument[0]?.QuantityIncrement}</p>
              <p>QUANTITY INCREMENT</p>
            </div>
         </div>

    </div>
  );
}

export default InstrumentContainer