let talksList;

//Submission Code,Presentation Number,Contact Email,Corresponding Author,Students,Advisors,Major,Title,Video,Abstract,Slides

window.onload = function(){
    d3.csv("../data/sample-data.csv").then(data => {
        talksList = data;
        console.log("list", talksList);
        generateTalksEntries();
    })
};

function generateTalksEntries() {
    console.log(talksList);
    for (let item of talksList) {
        console.log('item is', item);
        let entryTitle = item['Title'];
        let entryStudents = item['Students'];
        let entryAdvisors = item['Advisors'];
        let entryMajor = item['Major'];
        let entryVideo = item['Video'];
        let entrySlides = item['Slides'];
        let entryAbstract = item['Abstract'];

        console.log('slides video', entrySlides, entryVideo)
        let entriesRow = $("#entriesRow");
        let card = $("<div/>", {
            'class': 'card-transparent my-5'
        });
        let title = $("<h3/>").text(entryTitle);
        let students = $("<h5/>").text(entryStudents);
        let advisorMajor = $("<h5/>").text(entryAdvisors + " - " + entryMajor);

        let mediaRow = $("<div/>", {
            'class': 'row'
        });
        let videoCol = $("<div/>", {
            'class': 'col-6 justify-content-center'
        });
        let videoTag = $("<iframe/>", {
            'width': '100%',
            'height': '315',
            'src': extractMediaLink(entryVideo, 'video')
            // 'allowfullscreen': true
        });
        console.log('hello', extractMediaLink(entrySlides, 'slides'));
        let slidesCol = $("<div/>",{
           'class': 'col-6 justify-content-center'
        });
        // let slidesTag = $("<iframe/>", {
        //     'width': '100%',
        //     'height': '315',
        //     'src': extractMediaLink(entrySlides, 'slides')
        // });
        let slidesTag = entrySlides;
        let abstractRow = $("<div/>", {
            'class': 'col-12 mt-2 px-0'
        });
        let abstractText = $("<p/>", {
            'class': 'px-0 mx-0'
        }).text(entryAbstract);

        entriesRow.append(card);
        card.append(title);
        card.append(students);
        card.append(advisorMajor);
        card.append(mediaRow);
        mediaRow.append(videoCol);
        videoCol.append(videoTag);
        mediaRow.append(slidesCol);
        slidesCol.append(slidesTag);
        card.append(abstractRow);
        abstractRow.append(abstractText);
    }
}

function extractMediaLink(linkText, type) {
    console.log('whats up', linkText.match("src=\"(.*)\" frameborder"));
    if (type==='video'){
        return linkText.match("src=\"(.*)\" frameborder")[1];
    } else {
        return linkText.match("src=\"(.*)\" frameborder")[1];
    }
}

