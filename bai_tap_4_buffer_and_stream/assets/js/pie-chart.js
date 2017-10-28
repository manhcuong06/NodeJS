function renderPieChart(chart_data) {
    var pie_chart = new CanvasJS.Chart('pie_chart', {
        exportEnabled: true,
        animationEnabled: true,
        title: { text: 'Total exchanges' },
        legend: {
            cursor: 'pointer',
            itemclick: explodePie,
        },
        data: [{
            type: 'pie',
            showInLegend: true,
            toolTipContent: '{name}: <strong>{y}</strong>',
            indexLabel: '{name} - {y}',
            dataPoints: chart_data,
        }]
    });
    pie_chart.render();
};
function explodePie(e) {
    if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === 'undefined' || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();
}