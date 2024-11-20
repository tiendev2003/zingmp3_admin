import "./radialchart.scss";
import ReactApexChart from 'react-apexcharts';

const data = {
    series: [2988],
    options: {
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 5,
                    size: '70%',
                    background: 'transparent',
                    image: undefined,
                    imageWidth: 150,
                    imageHeight: 150,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    imageClipped: true,
                    position: 'front',
                }, track: {
                    show: true,
                    startAngle: undefined,
                    endAngle: undefined,
                    background: '#f2f2f2',
                    strokeWidth: '10%',
                    opacity: 1,
                    margin: 5,
                },
            },
        },
        labels: ['Total'],
    },
};




function RadialChart() {
    return (
        <div>
            <div id="chart">
                <ReactApexChart options={data.options} series={data.series} type="radialBar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    )
};

export default RadialChart;
