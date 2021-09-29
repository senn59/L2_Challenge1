var socket = io.connect('http://' + document.domain + ':' + location.port + '/');


//Create graph when page loads

//send signal
function send_signal(){
    socket.emit("pageload");
}

//structure data function for use in graph
function structureData(data){
    let structured_data = {}
    data.forEach(x => {
        let hour = x[0].split(":")[0] + ":00";
        if (!structured_data.hasOwnProperty(hour)) structured_data[hour] = 0;
        structured_data[hour]++;
    })
    return structured_data
}
//recieve data from server and create graph
socket.on("graphData", function(msg){
    let data = structureData(msg.data)
    //Graph
    let ctx = document.getElementById("barChart").getContext("2d");
    socket.barChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(data),
            datasets: [
                {
                    label: "Motion Sensed",
                    borderColor: "rgb(57, 169, 196)",
                    backgroundColor: "rgba(54, 215, 255, 0.4)",
                    borderWidth: 2,
                    data: Object.values(data)
                }
            ]
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
})
//update graph when message recieved from server
socket.on("update", function(msg) {
    //Update graph data

    let newData = structureData(msg.data);
    socket.barChart.data.labels = Object.keys(newData)
    socket.barChart.data.datasets.forEach((dataset) => {
        dataset.data = Object.values(newData);
    });

    console.log("test")
    socket.barChart.update()
});