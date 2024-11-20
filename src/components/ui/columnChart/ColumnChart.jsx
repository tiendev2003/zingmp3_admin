import "./columnChart.scss";
import ReactApexCharts from 'react-apexcharts';

function ColumnChart({ data }) {

    return (
        <div id="chart" width={"100%"}>
            <ReactApexCharts options={data.options} series={data.series} type="bar" height={data.height} />
        </div>)
};
export default ColumnChart;



