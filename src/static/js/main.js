var socket = io.connect('http://' + document.domain + ':' + location.port + '/');
socket.on('new_webhook', function(msg) {
    //Put data in object for use in graph
    let data_day = {}
    msg.data.forEach(x => {
        let hour = x[0].split(":")[0] + ":00";
        if (!data_day.hasOwnProperty(hour)) data_day[hour] = 0;
        data_day[hour]++;
    })
    console.log(data_day);
    
    $("ul").empty()
    msg.data.forEach(x => {
        $("ul").append("<li>" + x[0] + " " + x[1] + "</i>")
    })
});