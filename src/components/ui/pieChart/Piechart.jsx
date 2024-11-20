import "./piechart.scss";
import ReactApexChart from 'react-apexcharts';

function Piechart({ data }) {
    return (
        <div id="chart">
            <ReactApexChart options={data.options} series={data.series} type="donut" height={250} />
        </div>
    )
};

export default Piechart;
