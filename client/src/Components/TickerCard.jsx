export const TickerCard = (props) => {
    console.log("props",props)
    return (
        <div>
            <div> Ticker name: {props.props.ticker}</div>
            <div> Ticker change: {props.props.change}</div>
            <div> Ticker change_percent: {props.props.change_percent}</div>
            <div> Ticker dividend: {props.props.dividend}</div>
            <div> Ticker exchange: {props.props.exchange}</div>
            <div> Ticker last_trade_time: {props.props.last_trade_time}</div>
            <div> Ticker price: {props.props.price}</div>
            <div> Ticker yield: {props.props.yield}</div>
        </div>
    )

}