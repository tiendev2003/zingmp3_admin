import ReactApexCharts from "react-apexcharts";
import "./mixedchart.scss";

function MixedChart({ data }) {
 
  return (
    <div className="mixedchart">
      <div id="chart">
        <ReactApexCharts
          options={data.options}
          series={data.series}
          type="bar"
          height={data.height}
        />
      </div>
    </div>
  );
}

export default MixedChart;
