export const homeBarData = {
    series: [{
        data: [480, 690, 1100, 1200, 1380]
    }],
    options: {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
            },
            events: {
                mounted: (chart) => {
                    chart.windowResizeHandler();
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '70%',
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Medium', 'Instagram', 'LinkedIn', 'Twitter (X)', 'Facebook',],
            lines: {
                show: false,
            },
            labels: {
                style: {
                    colors: ['#64748b'],
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: ['#64748b'],
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        grid: {
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        tooltip: {
            y: {
                show: false,
                formatter: undefined,
                title: {
                    formatter: (seriesName) => !seriesName,
                },
            },
        }
    },
    height: 450,
};
export const homePieData = {
    series: [70, 30,],
    options: {
        chart: {
            width: '100%',
            type: 'donut',
            events: {
                mounted: (chart) => {
                    chart.windowResizeHandler();
                }
            }
        },
        labels: ['Items', 'Revenue',],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    labels: {
                        show: false,
                        name: {
                            show: false
                        },
                        value: {
                            show: false
                        }
                    }
                }
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
            z: {
                show: false
            },
            marker: {
                show: false,
            },
        },
        stroke: {
            width: 0,
        },
    },
};
export const crmBarData = {
    series: [{
        data: [400, 430, 470, 540, 600, 800]
    }],
    options: {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
            },
            events: {
                mounted: (chart) => {
                    chart.windowResizeHandler();
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '70%',
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Marketing', 'Digital', 'Web', 'Advertisement', 'Employee  Referal', "Other"],
            lines: {
                show: false,
            },
            labels: {
                style: {
                    colors: ['#64748b'],
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: ['#64748b'],
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        grid: {
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        tooltip: {
            y: {
                show: false,
                formatter: undefined,
                title: {
                    formatter: (seriesName) => !seriesName,
                },
            },
        }
    },
};
export const eMixedData = {
    series: [{
        name: 'Orders',
        type: 'column',
        data: [60, 52, 57, 69, 54, 65, 80, 68, 50, 69, 57, 46,]
    }, {
        name: 'Sales',
        type: 'line',
        data: [60, 59, 77, 66, 64, 75, 80, 78, 69, 57, 76, 64]
    }],
    options: {
        chart: {
            type: 'line',
            stacked: false,
            toolbar: {
                show: false,
            },
            events: {
                mounted: (chart) => {
                    chart.windowResizeHandler();
                }
            }
        },
        colors: ['#5A66F1', '#CBD5E1'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '35%',
                borderRadius: 7,
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1, 1, 4]
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ]
        },
        yaxis: [
            {
                axisTicks: {
                    show: false,
                },
                tooltip: {
                    enabled: false
                }
            },
        ],
        tooltip: {
            fixed: {
                enabled: false,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                // offsetY: 30,
                // offsetX: 60
            },
        },
        legend: {
            horizontalAlign: 'center',
            position: "top",
            offsetX: 40,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 600,
        }
    },
};
export const jobMixedData = {
    series: [{
        name: 'Candidates',
        type: 'column',
        data: [60, 52, 57, 69, 54, 65, 80, 68, 50, 69, 57, 46,]
    }, {
        name: 'Applications',
        type: 'area',
        data: [60, 59, 77, 66, 64, 75, 80, 78, 69, 57, 76, 64]
    },
    {
        name: 'Shortlisted',
        type: 'line',
        data: [60, 59, 77, 66, 64, 75, 80, 78, 69, 57, 76, 64]
    }],
    options: {
        chart: {
            type: 'line',
            stacked: false,
            toolbar: {
                show: false,
            },
            events: {
                mounted: (chart) => {
                    chart.windowResizeHandler();
                }
            }
        },
        colors: ['#5A66F1', '#CBD5E1'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '35%',
                borderRadius: 7,
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1, 1, 4]
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ]
        },
        yaxis: [
            {
                axisTicks: {
                    show: false,
                },
                tooltip: {
                    enabled: false
                }
            },
        ],
        tooltip: {
            fixed: {
                enabled: false,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                // offsetY: 30,
                // offsetX: 60
            },
        },
        legend: {
            horizontalAlign: 'center',
            position: "top",
            // offsetX: 40,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 600,
        }
    },
    height: 300
};
export const jobPieData = {
    series: [1505, 1214],
    options: {
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    labels: {
                        show: false,
                        name: {
                            show: false
                        },
                        value: {
                            show: false
                        }
                    }
                }
            }
        },
        labels: ['Acceptance', 'Rejected'],
        chart: {
            type: 'donut',
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        tooltip: {
            enabled: true,
            onDatasetHover: {
                highlightDataSeries: false,
            },
            x: {
                show: false
            },
            z: {
                show: false
            },
            marker: {
                show: false,
            },
        },
        stroke: {
            width: 0
        }
    },
};
export const stocksMixedData = {
    series: [{
        name: 'Students',
        type: 'column',
        data: [60, 52, 57, 69, 54, 65, 80, 68, 50, 69, 57, 46,]
    }, {
        name: 'Earning',
        type: 'area',
        data: [60, 59, 77, 66, 64, 75, 80, 78, 69, 57, 76, 64]
    }],
    options: {
        chart: {
            type: 'line',
            stacked: false,
            toolbar: {
                show: false,
            },
            events: {
                mounted: (chart) => {
                    chart.windowResizeHandler();
                }
            }
        },
        colors: ['#5A66F1', '#CBD5E1'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '35%',
                borderRadius: 7,
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1, 1, 4]
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ]
        },
        yaxis: [
            {
                axisTicks: {
                    show: false,
                },
                tooltip: {
                    enabled: false
                }
            },
        ],
        tooltip: {
            fixed: {
                enabled: false,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                // offsetY: 30,
                // offsetX: 60
            },
        },
        legend: {
            horizontalAlign: 'center',
            position: "top",
            // offsetX: 40,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 600,
        }
    },
    height: 350
};
export const courseMixedData = {
    series: [{
        name: 'Students',
        type: 'column',
        data: [60, 52, 57, 69, 54, 65, 80, 68, 50, 69, 57, 46,]
    }, {
        name: 'Earning',
        type: 'line',
        data: [60, 59, 77, 66, 64, 75, 80, 78, 69, 57, 76, 64]
    }],
    options: {
        chart: {
            type: 'line',
            stacked: false,
            toolbar: {
                show: false,
            },
            events: {
                mounted: (chart) => {
                    chart.windowResizeHandler();
                }
            }
        },
        colors: ['#5A66F1', '#CBD5E1'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '35%',
                borderRadius: 7,
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1, 1, 4]
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ]
        },
        yaxis: [
            {
                axisTicks: {
                    show: false,
                },
                tooltip: {
                    enabled: false
                }
            },
        ],
        tooltip: {
            fixed: {
                enabled: false,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                // offsetY: 30,
                // offsetX: 60
            },
        },
        legend: {
            horizontalAlign: 'center',
            position: "top",
            // offsetX: 40,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 600,
        }
    },
    height: 400
};


export const personalData = {
    series: [{
        name: 'Income',
        data: [54, 27, 65, 56, 81, 58, 45, 81, 70, 56, 87, 75]
    }, {
        name: 'Expanses',
        data: [45, 36, 41, 86, 45, 68, 52, 53, 91, 55, 60, 48]
    }],
    options: {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
            },
            events: {
                mounted: (chart) => {
                    chart.windowResizeHandler();
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                columnHeight: '100%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 3,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val
                }
            }
        },
        colors: ['#5a66f1', '#cbd5e1'],
        legend: {
            show: true,
            position: 'top',
        }
    },
    height: 265,
}

