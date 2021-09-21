import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { InstrumentsApi } from '../../../api/instruments';
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
});

const InstrumentsTable = () => {
  const classes = useStyles();
  const {instruments, tickerHistories} = useSelector(state => state.instruments)

  useEffect(() => {
    instruments.forEach((instruments) => {

    let payload = {
        instrumentId: instruments.InstrumentId,
        fromDate:  "2018-07-18",
        toDate: "2021-07-19"
    }
        InstrumentsApi.getTickerHistory(payload)
    })
  })

  const getChange = (id) => {
    const instrument = instruments.filter(item => item.InstrumentId === id )

    if(instrument.length && !_.isUndefined(instrument[0].percentChange)){
        return instrument[0].percentChange.toFixed(2)
    }
    return 'N/A'
  }




  return (
    <TableContainer component={Paper} style={{height: '700px', overflow: 'scroll' , width: '100%'}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Pairing</StyledTableCell>
            <StyledTableCell>%Change</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instruments.length && _.sortBy(instruments, 'percentChange' ).map((instrument) => (
            <StyledTableRow key={instrument.InstrumentId}>
              <StyledTableCell component="th" scope="row">
              {`${instrument.Product1Symbol}/${instrument.Product2Symbol}`}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
              {getChange(instrument.InstrumentId)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InstrumentsTable