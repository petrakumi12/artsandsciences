let programsList;

window.onload = function() {
    AOS.init()
    d3.csv("../data/program-list.csv").then(data => {
        programsList = data;
        generateProgramTable();
    })
};

function generateProgramTable() {
    console.log(programsList);
    for (let item of programsList) {
        let tableBody = $("#tableBody");
        let tableRow = $("<tr\>");
        let timeData = $("<td\>").text(item['time']);
        let titleData = $("<td\>").text(item['title']);
        let typeData = $("<td\>").text(item['type']);

        tableBody.append(tableRow);
        tableRow.append(timeData);
        tableRow.append(titleData);
        tableRow.append(typeData);
    }
}