import './App.css';
import {io} from "socket.io-client";
import {TickerCard} from "./Components/TickerCard";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import store from "./Redux/redux-state";
import {useFormik} from "formik";
import {Button, Input, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        background: "linear-gradient(115deg, #C5CED3 30%, #83CBCB)",
        color: "white"
    },
    input: {
        color: "black"
    }
}));

function App() {
    const classes = useStyles();
    const socket = io('ws://localhost:4000')
    socket.emit('start');
    let tick = useSelector(store => store.tickers.tickers)
    console.log("tick", tick)

    let tickerCard = tick.map(t => <TickerCard props={t}/>)
    useEffect(() => {
        let tickers;
        socket.on('ticker', (response) => {
            const res = Array.isArray(response) ? response : [response];
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values) => {
            console.log("asd", values)
        }
    })
    return (
        <div className="App">
            <form onSubmit={formik.handleSubmit}>
                <Input
                    className={classes.input}
                    placeholder='Type here the city name' {...formik.getFieldProps('name')}
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
