import './App.css';
import {io} from "socket.io-client";
import {TickerCard} from "./Components/TickerCard";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
 import store from "./Redux/redux-state";
import {useFormik} from "formik";
import {Button, Input, makeStyles} from "@material-ui/core";
import {addTicker} from "./Redux/TikersReducer";

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
    const dispatch = useDispatch()
    socket.emit('start');
    let tick = useSelector(store => store.tickers.tickers)
    const [tickerApi, setTicker] = useState()
    let tickerCard = tick.map(t => <TickerCard props={t}/>)
    useEffect(() => {
        socket.on('ticker', (response) => {
            const res = Array.isArray(response) ? response : [response];
            console.log("res",res)
            setTicker(res)
        })
        return () => {
            setTicker({}); // This worked for me
        };
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values) => {
            for (let i=0; i< tickerApi.length; i++){
                if(values.name === tickerApi[i].ticker){
                    console.log("asdSD",tickerApi[i])
                    dispatch(addTicker(tickerApi[i]))
                }
            }


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
