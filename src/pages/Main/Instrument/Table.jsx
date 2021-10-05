import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import { InstrumentsApi } from "../../../api/instruments";
import _ from "underscore";
import moment from "moment";

const InstrumentsTable = ({ toDate, fromDate }) => {
  const classes = useStyles();
  const { instruments } = useSelector((state) => state.instruments);

  useEffect(() => {
    instruments.forEach((instruments) => {
      let payload = {
        instrumentId: instruments.InstrumentId,
        fromDate: moment(fromDate).format("YYYY-MM-DD"),
        toDate: moment(toDate).format("YYYY-MM-DD"),
      };
      InstrumentsApi.getTickerHistory(payload);
    });
  }, [toDate, fromDate, instruments]);

  const getChange = (id) => {
    const instrument = instruments.filter((item) => item.InstrumentId === id);

    if (instrument.length && !_.isUndefined(instrument[0].percentChange)) {
      return `${instrument[0].percentChange.toFixed(2)}%`;
    }
    return "N/A";
  };

  return (
    <TableContainer
      component={Paper}
      style={{ height: "700px", overflow: "scroll", width: "100%" }}
    >
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Pairing</StyledTableCell>
            <StyledTableCell>%Change</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instruments.length &&
            _.sortBy(instruments, "percentChange")
              .reverse()
              .map((instrument) => (
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
};

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default InstrumentsTable;
