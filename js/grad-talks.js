let talksList;
let startingLetters;
let STUDENT = "Student Name";
let SUBMISSION = "Submission Title";
let curFilter = STUDENT;
let processing;

window.onload = function () {
    AOS.init();
    d3.csv("../data/sample-data.csv").then(data => {
        sortData(data, 'Students');
        addSearchIndex();
        addTalksEntries();
        addScrollSpy();
        // fixHrefAnchor();
    })
};

//Submission Code,Presentation Number,Contact Email,Corresponding Author,Students,Advisors,Major,Title,Video,Abstract,Slides
function sortCondition(a, b) {
    return a < b ? -1 : 1;
}

function addIfNotExist(array, letter, ref) {
    !array.map(el => el[0]).includes(letter) ? array.push([letter, ref]) : null;
    return array
}

function sortData(data, attribute) {
    startingLetters = [];
    talksList = data.sort((a, b) => sortCondition(a[attribute], b[attribute]));
    talksList.forEach(el =>
        startingLetters = addIfNotExist(startingLetters, el[attribute][0], replaceSpaceUnderline(el[attribute])));
    startingLetters = startingLetters.sort((a, b) => sortCondition(a[0], b[0]));
}

function addSearchIndex() {

    let parent = $("#searchIndex");
    startingLetters.forEach(([letter, ref], i) => {
        let span = $("<span/>", {
            class: 'mx-5 search-letters',
            'data-aos': 'zoom-in',
            'data-aos-delay': i * 50,
            'data-aos-anchor-placement': "bottom-bottom"
        });
        let a = $("<a\>", {
            class: 'indexLink',
            href: '#' + ref,
            id: 'a_' + ref
        }).text(letter);
        parent.append(span);
        span.append(a);
    });
    let hr = $("<hr/>");
    let div = $("<div/>", {
        class: 'col-6'
    });
}

function addTalksEntries() {
    // console.log(talksList);
    talksList.forEach(item => {
        let entryTitle = item['Title'];
        let entryStudents = item['Students'];
        let entryAdvisors = item['Advisors'];
        let entryMajor = item['Major'];
        let entryVideo = item['Video'];
        let entrySlides = item['Slides'];
        let entryAbstract = item['Abstract'];

        let id = curFilter === STUDENT ? replaceSpaceUnderline(entryStudents) : replaceSpaceUnderline(entryTitle);
        let entriesRow = $("#entriesRow");

        let card = $("<div/>", {
            class: 'card-transparent my-5',
            id: id
        });
        let title = $("<h3/>").text(entryTitle);
        let students = $("<h5/>").text(entryStudents);
        let advisorMajor = $("<h5/>").text(entryAdvisors + " - " + entryMajor);

        let mediaRow = $("<div/>", {
            class: 'row'
        });
        let videoCol = $("<div/>", {
            class: 'col-6 justify-content-center'
        });
        // let videoTag = $("<iframe/>", {
        //     'width': '100%',
        //     'height': '315',
        //     'src': extractMediaLink(entryVideo, 'video')
        //     'allowfullscreen': true
        // });
        let videoTag = $("<img/>", {
            src: '../images/coming soon.png',
            // 'class': 'img-fluid',
            style: 'object-fit: cover; height: 350px'
        });
        let slidesCol = $("<div/>", {
            class: 'col-6 justify-content-center'
        });
        let slidesTag = entrySlides;
        let abstractRow = $("<div/>", {
            class: 'col-12 mt-2 px-0'
        });
        let abstractText = $("<p/>", {
            class: 'px-0 mx-0'
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
    })

}

function deleteTalksEntries() {
    $("#entriesRow").empty();
}

function deleteIndex() {
    $("#searchIndex").empty();
}

function extractMediaLink(linkText, type) {
    if (type === 'video') {
        return linkText.match("src=\"(.*)\" frameborder")[1];
    } else {
        return linkText.match("src=\"(.*)\" frameborder")[1];
    }
}

function changeField(el) {
    if (el.text !== curFilter) {
        deleteTalksEntries();
        deleteIndex();
        if (el.text === STUDENT) {
            $(".student").addClass('active')
            $(".title").removeClass('active');
            sortData(talksList, 'Students');

        }
        if (el.text === SUBMISSION) {
            $(".title").addClass('active')
            $(".student").removeClass('active');
            sortData(talksList, 'Title');
        }
        curFilter = el.text;
        addSearchIndex();
        addTalksEntries();
    }
}

function replaceSpaceUnderline(word) {
    word = word.replaceAll(/[^\w\s]/gi, '');
    return word.replaceAll(' ', '_')
}

function addScrollSpy() {
    $(window).scroll(ev => {
        startingLetters
            .map(el => replaceSpaceUnderline(el[1]))
            .forEach(ref => {
                if (!processing) {
                    processing = true;
                    let aref = "#a_" + ref;
                    let cardref = "#" + ref;
                    let theLink = $(aref);
                    let pos = $(cardref).offset();
                    if (pos && !theLink.hasClass('active')) {
                        let fromTop = pos.top - $(window).scrollTop();
                        let navPos = $("#searchIndex").position().top;
                        let margin = 250;
                        if (fromTop < navPos + margin) {
                            console.log('here', ref);
                            $(".indexLink").removeClass('active');
                            theLink.addClass('active');
                        }
                    }
                    processing = false;
                }
            })
    });
}

// function fixHrefAnchor() {
//     $(".indexLink").click((ev, item) => {
//         let url = location.href;
//         location.href = item.href();
//         history.replaceState(null,null, url);
//     })
// }
