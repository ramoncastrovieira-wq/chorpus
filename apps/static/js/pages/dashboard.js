/**
 * Theme: Adminto - Responsive Bootstrap 5 Admin Dashboard
 * Author: Coderthemes
 * Module/App: Dashboard
 */


// 
// Total Orders Chart
//
var colors = ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"];
var dataColors = $("#total-orders-chart").data('colors');
if (dataColors) {
    colors = dataColors.split(",");
}
var options1 = {
    series: [65],
    chart: {
        type: 'radialBar',
        height: 81,
        width: 81,
        sparkline: {
            enabled: false
        }
    },
    plotOptions: {
        radialBar: {
            offsetY: 0,
            hollow: {
                margin: 0,
                size: '50%'
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    offsetY: 5,
                    fontSize: '14px',
                    fontWeight: "600",
                    formatter: function (val) {
                        return val + 'k'
                    }
                }
            }
        }
    },
    grid: {
        padding: {
            top: -18,
            bottom: -20,
            left: -20,
            right: -20,
        }
    },
    colors: colors,
}


new ApexCharts(document.querySelector("#total-orders-chart"), options1).render();

// 
// New Users Chart
//
var colors = ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"];
var dataColors = $("#new-users-chart").data('colors');
if (dataColors) {
    colors = dataColors.split(",");
}
var options2 = {
    series: [75],
    chart: {
        type: 'radialBar',
        height: 81,
        width: 81,
        sparkline: {
            enabled: false
        }
    },
    plotOptions: {
        radialBar: {
            offsetY: 0,
            hollow: {
                margin: 0,
                size: '50%'
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    offsetY: 5,
                    fontSize: '14px',
                    fontWeight: "600",
                    formatter: function (val) {
                        return val + 'k'
                    }
                }
            }
        }
    },
    grid: {
        padding: {
            top: -18,
            bottom: -20,
            left: -20,
            right: -20,
        }
    },
    colors: colors,
}


new ApexCharts(document.querySelector("#new-users-chart"), options2).render();

//
// data-visits- CHART
//
var colors = ["#5b69bc", "#35b8e0", "#10c469", "#fa5c7c", "#e3eaef"];
var dataColors = $("#data-visits-chart").data('colors');
if (dataColors) {
    colors = dataColors.split(",");
}

var options = {
    chart: {
        height: 277,
        type: 'donut',
    },
    series: [65, 14, 10, 45],
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: 7
    },
    labels: ["Direct","Social", "Marketing", "Affiliates"], // Age groups
    colors: colors,
    stroke: {
        show: false
    }
};

var chart = new ApexCharts(
    document.querySelector("#data-visits-chart"),
    options
);

chart.render();

//
// Statistics CHART
//
///
var colors = ["#5b69bc", "#10c469", "#fa5c7c", "#f9c851"];
var dataColors = $("#statistics-chart").data('colors');
if (dataColors) {
    colors = dataColors.split(",");
}

var options = {
    series: [
        { name: "Open Campaign", type: "bar", data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24] }
    ],
    chart: { height: 301, type: "line", toolbar: { show: false } },
    stroke: {
        width: 0,
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: "20%",
            barHeight: "70%",
            borderRadius: 5,
        },
    },
    xaxis: { categories: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"] },
    colors: colors
}

var chart = new ApexCharts(
    document.querySelector("#statistics-chart"),
    options
);

chart.render();

//
// REVENUE AREA CHART
//
///
var colors = ["#5b69bc", "#10c469", "#fa5c7c", "#f9c851"];
var dataColors = $("#revenue-chart").data('colors');
if (dataColors) {
    colors = dataColors.split(",");
}

var options = {
    series: [
        { 
            name: "Total Income", 
            data: [82.0, 85.0, 70.0, 90.0, 75.0, 78.0, 65.0, 50.0, 72.0, 60.0, 80.0, 70.0] 
        },
        { 
            name: "Total Expenses", 
            data: [30.0, 32.0, 40.0, 35.0, 30.0, 36.0, 37.0, 28.0, 34.0, 42.0, 38.0, 30.0] 
        },
    ],
    stroke: {
        width: 3,
        curve: 'straight'
    },
    chart: {
        height: 299,
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: { show: false }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    colors: colors,
    tooltip: {
        shared: true,
        y: [{
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return "$" + y.toFixed(2) + "k";
                }
                return y;
            },
        },
        {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return "$" + y.toFixed(2) + "k";
                }
                return y;
            },
        }
        ],
    },
}

var chart = new ApexCharts(
    document.querySelector("#revenue-chart"),
    options
);

chart.render();
