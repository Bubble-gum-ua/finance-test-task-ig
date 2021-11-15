import './App.css';
import {TickerCard} from "./Components/TickerCard";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {Button, Grid, Input, makeStyles, Paper} from "@material-ui/core";
import {subscribeToTicker} from "./Redux/TikersReducer";

const useStyles = makeStyles((theme) => ({
    button: {
        background: "linear-gradient(115deg, #C5CED3 30%, #83CBCB)",
        color: "white"
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        marginTop: "15px",
        background: "linear-gradient(to right, #FFFFFF, #C5CED3)",
        maxWidth: "300px",
        height: "200px",
    },
    input: {
        color: "black"
    }
}));

function App() {
    const classes = useStyles();
    const dispatch = useDispatch()

    let tick = useSelector(store => store.tickers.tickers)
    let tickerCard = tick.map(t =>
        <Paper className={classes.paper}>
            <Grid container spacing={3}>
                <Grid item xs={8} ><TickerCard props={t}/></Grid>
            </Grid>
        </Paper>)


    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values) => {
            dispatch(subscribeToTicker(values.name, 'ADD_TICKER'))
            formik.resetForm()
        }
    })
    return (
        <div className="App">
            <form onSubmit={formik.handleSubmit}>
                <Input
                    className={classes.input}
                    placeholder='Type here the ticker name' {...formik.getFieldProps('name')}
                    onChange={formik.handleChange} value={formik.values.name}
                />
                <Button type='submit'
                        variant='contained' className={classes.button}> Add City</Button>
            </form>

            {tickerCard}

        </div>
    );
}

export default App;
