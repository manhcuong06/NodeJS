function renderColumnChart(chart_data) {
    var data = [];
    chart_data.forEach(item => {
        data.push({
            type: 'column',
            name: item.name,
            legendText: item.name,
            showInLegend: true,
            dataPoints: item.points
        });
    });
    var column_chart = new CanvasJS.Chart('column_chart', {
        exportEnabled: true,
        animationEnabled: true,
        title: { text: 'Exchange type' },
        axisY: { title: 'Amount' },
        toolTip: { shared: true },
        legend: {
            cursor: 'pointer',
            itemclick: toggleDataSeries
        },
        data: data
    });
    column_chart.render();
}
function toggleDataSeries(e) {
	if (typeof(e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}