export const plugin = [{
    id: 'insideLabelsPlugin',
    afterDatasetsDraw(chart) {
        const {
            ctx,
            data: {
                datasets,
            },
            chartArea: {
                width, height,
            },
        } = chart;

        const chartData = chart.getDatasetMeta(0).data;

        chartData.forEach((datapoint, i) => {
            const { x, y } = datapoint.getCenterPoint();
            const value = datasets[1].data[i];
            const sumOfValues = datasets[1].data.reduce((acc, val) => acc + val);
            ctx.textBaseline = 'middle';

            const textX = x - (ctx.measureText(value).width / 2);

            if (value / sumOfValues > 0.05) {
                ctx.fillStyle = '#f4f6f7';
                ctx.fillText(datasets[1].data[i], textX, y);
            }
        });
    },
}];