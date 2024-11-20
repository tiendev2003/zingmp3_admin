import "./barchart.scss";
import ReactApexCharts from 'react-apexcharts';

function BarChart({ data }) {

    return (
        <div id="chart">
            <ReactApexCharts options={data.options} series={data.series} type="bar" height={data.height} />
        </div>
    )
};
export default BarChart;



