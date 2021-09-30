
let datamessy = [["14:10", "28/09/21"],["14:16", "28/09/21"], ["13:10", "28/09/21"],["13:10", "28/09/21"],["13:10", "28/09/21"]]

function structureData(data){
    let structured_data = {}
    data.forEach(x => {
        let hour = x[0].split(":")[0] + ":00";
        if (!structured_data.hasOwnProperty(hour)) structured_data[hour] = 0;
        structured_data[hour]++;
    })
    return structured_data
}
//console.log(structureData(datamessy))
console.log(new Date())