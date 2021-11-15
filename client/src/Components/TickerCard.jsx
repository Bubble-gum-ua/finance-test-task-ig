import {GoogleCharts} from 'google-charts';


export const TickerCard = (props) => {
    GoogleCharts.load(drawChart);

    function drawChart() {

        // Standard google charts functionality is available as GoogleCharts.api after load
        const data = GoogleCharts.api.visualization.arrayToDataTable([
            ['Chart thing', 'Chart amount'],
            ['Time', props.props.last_trade_time],
            ['Dolor sit', 22],
            ['Sit amet', 18]
        ]);
        const pie_1_chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('chart1'));
        pie_1_chart.draw(data);
    }
    const dateNew = () => {
        let date = new Date();
        let day = date.getDay();
        let month = date.getMonth()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let currentDate = date.getDate()
        let dayOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sun", "Sat"]
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return (
            <span>
               <span>{dayOfWeek[day]}, </span>
               <span>  {currentDate} {months[month]}, </span>
               <span>{hours}h : {minutes}m </span>
            </span>
        )
    }

    return (
        <div>
            <div> Ticker name: {props.props.ticker}</div>
            <div> Ticker change: {props.props.change}</div>
            <div> Ticker change_percent: {props.props.change_percent}</div>
            <div> Ticker dividend: {props.props.dividend}</div>
            <div> Ticker exchange: {props.props.exchange}</div>
            <div> Ticker last_trade_time: {dateNew(props.props.last_trade_time)}</div>
            <div> Ticker price: {props.props.price}</div>
            <div> Ticker yield: {props.props.yield}</div>
            <div id="chart1"></div>
        </div>
    )

}