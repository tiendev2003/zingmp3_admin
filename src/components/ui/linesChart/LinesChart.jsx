import ReactApexChart from 'react-apexcharts';

function LinesChart() {

    const linesData = {
        series: [{
            data: [34, 54, 41, 67, 22, 43, 21,]
        }],
        options: {
            chart: {
                type: 'line',
                toolbar: false
            },
            grid: {
                show: false,
            },
            stroke: {
                curve: 'smooth',
                show: true,
                // curve: 'straight',
                // lineCap: 'butt',
                // colors: undefined,
                width: 1,
                // dashArray: 0,
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: false
                },
                labels: {
                    show: false,
                },
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: {
                labels: {
                    show: false,
                }
            },
            tooltip: {
                enabled: true,
                onDatasetHover: {
                    highlightDataSeries: false,
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: (seriesName) => !seriesName,
                    },
                },
                z: {
                    show: false
                },
                marker: {
                    show: false,
                },
            }
        },
    };

    return (
        <>
            <ReactApexChart options={linesData.options} series={linesData.series} type="line" height={60} width={100} />
        </>
    );
};

export default LinesChart;
