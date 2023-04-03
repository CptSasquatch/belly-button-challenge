// use d3 to select the gauge chart
let gaugeChart = d3.select("#gauge");
// use d3 to build the gauge chart
function buildGauge(subjectID) {
    bellydata.then(function(data) {
        // clear the gauge chart
        gaugeChart.html("");
        // create variables and console log them to make sure they are working
        let subjectInfo = data.metadata.filter(subject => subject.id == subjectID)[0];
        console.log(subjectInfo);
        let wfreq = subjectInfo.wfreq;
        console.log(wfreq);
        // set variables to calculate the level of the gauge
        var degrees = 180 - wfreq * 20.05, radius = .35;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);



        console.log(x, y);



        // create the gauge chart
        let trace3 = [{
            values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
            text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
            direction: "clockwise",
            textinfo: "text",
            textposition: "inside",
            marker: { colors: ["#f8f3ec", "#f4f1e5", "#e9e6ca", "#e5e7b3", "#d5e49d", "#b7cc92", "#8cbf88", "#8abb8f", "#85b48a", "white"] },
            type: "pie",
            hole: 0.5,
            rotation: 90,
            showlegend: false,
            hoverinfo: "none",
        }];
        
        let layout3 = {
            width: 700,
            height: 700,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: { size: 26 } },
            titleposition: "top center",
            shapes:[
                // {
                // type: "line",
                // x0: 0.495,
                // y0: 0.495,
                // x1: x + 0.495,
                // y1: y + 0.495,
                // opacity: 0.3,
                // line: {
                //     color: "black",
                //     width: 9,
                //     }
                // },
                // {
                // type: "circle",
                // x0: 0.473,
                // y0: 0.465,
                // x1: 0.525,
                // y1: 0.525,
                // opacity: 0.3,
                // dropshadow: 1,
                // fillcolor: "black",
                // line: {
                //     color: "black",
                // }
                // },
                {
                type: "line",
                x0: 0.5,
                y0: 0.5,
                x1: x + 0.5,
                y1: y + 0.5,
                line: {
                    color: "#830308",
                    width: 9
                    }
                },
                {
                type: "circle",
                x0: 0.475,
                y0: 0.475,
                x1: 0.525,
                y1: 0.525,
                dropshadow: 1,
                fillcolor: "#830308",
                line: {
                    color: "#830308",
                }
                },
            ],
        };
        Plotly.newPlot("gauge", trace3, layout3);
    });
}
// initialize the plot
function init() {
    buildGauge(subjectID);
}
init();

