var socket = io.connect('http://' + document.domain + ':' + location.port + '/');
let ctx = document.getElementById("barChart").getContext("2d");
var data;
var barChart
//Settings button
$(".chart_option").on("click", function(){
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    socket.emit("getDayData", "")
})
//send signal
function send_signal(){ 
    socket.emit("pageLoad", "week");
}

//structure data function for use in graph
function structureData(data){
    let structured_data = {}
    data.forEach(x => {
        //let hour = x.split(":")[0] + ":00";
        if (!structured_data.hasOwnProperty(x)) structured_data[x] = 0;
        structured_data[x]++;
    })
    return structured_data
}
function structureDataTemp(data){
    let structured_data = {}
    data.forEach(x => {
        if (!structured_data.hasOwnProperty(x)) structured_data[x] = 0
        structured_data[x]++
    })
    return structured_data
}
//update chart function
function updateChart(chart, newData){
    chart.data.labels = Object.keys(newData)
    chart.data.datasets.forEach((dataset) => {
        dataset.data = Object.values(newData);
    });
    chart.update()
}

//recieve data from server and create graph
socket.on("graphData", function(msg){
    data = structureData(msg.data)
    //Graph
    barChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(data),
            datasets: [
                {
                    label: "Motion Sensed",
                    borderColor: "rgb(20, 80, 130)",
                    backgroundColor: "rgba(24, 120, 200, 0.4)",
                    borderWidth: 2,
                    data: Object.values(data)
                }
            ]
        },
        options: {
            plugins: {
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
                    grid: {
                        color: "rgb(120,120,120)"
                    }
                }
            },
            aspectRatio: 3
        }
    })
})

//update graph when message recieved from server
socket.on("update", function(msg) {
    let newData = structureData(msg.data);
    updateChart(barChart, newData)
});