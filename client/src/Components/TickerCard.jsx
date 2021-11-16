import {Chart} from "react-google-charts";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import {useEffect, useRef} from "react";
import {dateFormatter} from "./Tools/DateFormatter";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "600px",
        height: "400px",
        textAlign: "center"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        marginTop: "15px",
        background: "linear-gradient(to right, #FFFFFF, #C5CED3)",
        maxWidth: "1000px",
        height: "200px",
    },
}));

export const TickerCard = (props) => {
    const classes = useStyles();
    let data = [['Price', 'Change']]

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    let price = Number(props.props.price)
    let change = Number(props.props.change)

    const prevAmount = usePrevious(price, change);

    let previousValue = [prevAmount, prevAmount]
    let currentValue = [price, change]

    if (price !== prevAmount) {
        data.push(previousValue)
        data.push(currentValue)
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <h4>  {props.props.ticker}</h4>
                        <div> Ticker change: {props.props.change}</div>
                        <div> Ticker change_percent: {props.props.change_percent}</div>
                        <div> Ticker dividend: {props.props.dividend}</div>
                        <div> Ticker exchange: {props.props.exchange}</div>
                        <div> Ticker last_trade_time: {dateFormatter(props.props.last_trade_time)}</div>
                        <div> Ticker price: {props.props.price}</div>
                        <div> Ticker yield: {props.props.yield}</div>
                    </Grid>
                    <Grid item xs={8}>
                        <Chart
                            width={"100%"}
                            height={"100%"}
                            chartType='ColumnChart'
                            data={data}
                            options={{
                                hAxis: {title: 'Ticker change:'},
                                vAxis: {title: 'Ticker price'},
                                legend: 'none',
                                title: "Price changing",
                                backgroundColor: 'transparent',
                                series: {
                                    0: {color: '#d7d120'},
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}