let programsList;

window.onload = function () {
    AOS.init();
    d3.csv("../data/timeline.csv").then(data => {
        programsList = data;
        generateProgramTable();
    })
};

function generateProgramTable() {
    console.log(programsList);
    for (let item of programsList) {
        let titleLink = $("<a/>", {
                href: 'grad-talks.html#' + replaceSpecial(item['Presenter']),
                class: 'tr-link'
            }
        ).text(item['Title']);

        let tableBody = $("#tableBody");
        let tableRow = $("<tr\>");

        let timeData = $("<td\>")
            .text(item['Time'])
            .addClass('time-col');

        let titleData = $("<td\>")
            .append(titleLink);
        let presenterData = $("<td\>")
            .text(item['Presenter']);

        let typeData = $("<td\>")
            .text(item['Department']);

        tableBody.append(tableRow);
        tableRow.append(timeData);
        tableRow.append(titleData);
        tableRow.append(presenterData);
        tableRow.append(typeData);
    }
}

function replaceSpecial(word) {
    word = word.replaceAll(/[^\w\s]/gi, '');
    return word.replaceAll(' ', '_')
}