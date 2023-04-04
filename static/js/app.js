// belly button challenge app
// read in samples.json from url and assign it to a variable that contains the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
var bellydata;
d3.json(url).then(function(data) {
    bellydata = data;
    init();
});


// append the demographic info for the selected test subject to the demographic info panel
function buildMetadata(subjectID) {
    // create variable for the demographic info panel
    let demographicInfo = d3.select("#sample-metadata");      
        demographicInfo.html("");
        let subjectInfo = bellydata.metadata.filter(subject => subject.id == subjectID)[0];
        console.log(subjectInfo);
        Object.entries(subjectInfo).forEach(function([key, value]) {
            demographicInfo.append("p").text(`${key}: ${value}`);
        });
}

// append the top 10 OTUs found in that individual to the bar chart
function buildCharts(subjectID) {
    // select the bar chart
    let barChart = d3.select("#bar");
    // uselect the bubble chart
    let bubbleChart = d3.select("#bubble");
        // clear the bar chart
        barChart.html("");
        // clear the bubble chart
        bubbleChart.html("");
        // create variables and console log them to make sure they are working
        let subjectInfo = bellydata.samples.filter(subject => subject.id == subjectID)[0];
        console.log(subjectInfo);
        let otu_ids = subjectInfo.otu_ids;
        console.log(otu_ids);
        let otu_labels = subjectInfo.otu_labels;
        console.log(otu_labels);
        let sample_values = subjectInfo.sample_values;
        // create the bar chart
        let trace1 = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otu => `OTU ${otu}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };
        let traceData1 = [trace1];
        let layout1 = {
            title: { text: "<b>Top 10 OTUs</b>", font: { size: 24 } },
            width: 550,
            height: 450,
            margin: { t: 50, b: 50 },
            colorway: ["#8cbf88"],
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };
        Plotly.newPlot("bar", traceData1, layout1, {responsive: true});
        // create the bubble chart
        let trace2 = {
            x: otu_ids,
            y: sample_values,
            margin: { t: 0 },
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            },
            text: otu_labels
        };
        let traceData2 = [trace2];
        let layout2 = {
            title: { text: "<b>OTU ID vs Sample Values</b>", font: { size: 26 } },
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Values" },
            width: 1200,
            height: 600
        };
        Plotly.newPlot("bubble", traceData2, layout2, {scrollZoom: true}, {responsive: true});
}
// create an event handler for the dropdown menu
function optionChanged(subjectID) {
    buildMetadata(subjectID);
    buildCharts(subjectID);
    buildGauge(subjectID);
}
// initialize the dashboard
function init() {
    // create variable for the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // append the names of the test subjects to the dropdown menu
    bellydata.names.forEach(function(name) {
         dropdownMenu.append("option").text(name).property("value");
        });
    // assign the value of the dropdown menu option to a variable
    let subjectID = bellydata.names[0];
    buildMetadata(subjectID);
    buildCharts(subjectID);
    buildGauge(subjectID);
}







