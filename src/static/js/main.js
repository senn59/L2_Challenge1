var socket = io.connect('http://' + document.domain + ':' + location.port + '/');
let ctx = document.getElementById("barChart").getContext("2d");
var data;
var barChart;
function getCurrentDate(){
    let now = new Date()
    return`${("0" + now.getMonth()).slice(-2)}/${("0" + now.getDate()).slice(-2)}/${now.getFullYear().toString().slice(-2)}`
}
//send signal when page loads
function send_signal(){ 
    socket.emit("getData", {
        queryType: "week", 
        field: "date",
        data: ""
    });
}
//getData when you flip the day view / week view switch
$(".chart_option").on("click", function(){
    socket.emit("getData", {
        queryType: $(this).attr("type"), 
        field: $(this).attr("field"),
        data: ""
    })
    barChart.options.plugins.title.text = "";
})
function handleClick(e, arr){
    let date = barChart.data.labels[arr[0].index];
    if (!date.includes(":")){
        socket.emit("getData", {
            queryType: "specific",
            field: "hour",
            data: barChart.data.labels[arr[0].index]
        })
        barChart.options.plugins.title.text = date;
    }
}
//structure data function for use in graph
function structureData(data){
    let structured_data = {}
    let length = 3
    data.forEach(x => {
        if (x.includes(":")) x = x.split(":")[0] + ":00";
        if (!structured_data.hasOwnProperty(x)) structured_data[x] = 0;
        structured_data[x]++;
    })
    return structured_data
}
//update graph when message recieved from server
socket.on("update", function(msg) {
    let data = structureData(msg.data);
    barChart.data.labels = Object.keys(data)
    barChart.data.datasets.forEach((dataset) => {
        dataset.data = Object.values(data);
    });
    barChart.update()
});




$(document).ready(function() {
    barChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: "",
            datasets: [
                {
                    label: "Motion Sensed",
                    borderColor: "rgb(20, 80, 130)",
                    backgroundColor: "rgba(24, 120, 200, 0.4)",
                    borderWidth: 2,
                    data: ""
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    font : {size: 24},
                    display: true
                },
                legend: {
                    display: false,
                }
            },
            scales: {
                x: {
                    grid: {
                        color: "rgb(120,120,120)"
                    }
                },
                y: {
                    beginAtZero: true,
                    precision: 0,
                    grid: {
                        color: "rgb(120,120,120)"
                    }
                }
            },
            aspectRatio: 3,
            onClick: handleClick
        }
    })
})