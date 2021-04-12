let talksList, startingLetters, processing, navPos;
let margin = 250;
let searchIndex, entriesRow;
let STUDENT = "Student Name";
let SUBMISSION = "Submission Title";
let curFilter = STUDENT;

window.onload = function () {
    searchIndex = $("#searchIndex");
    entriesRow = $("#entriesRow");
    d3.csv("../data/sample-data.csv").then(data => {
        sortData(data, 'Students');
        addSearchIndex();
        addTalksEntriesWVideo();
        addScrollSpy();
        addHrefListener();
        clickFirstIndex();
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
    startingLetters.forEach(([letter, ref], i) => {
        let a = $("<a\>", {
            class: 'indexLink px-4',
            href: '#' + ref,
            id: 'a_' + ref
        }).text(letter);
        searchIndex.append(a);
    });
    $(".indexLink").delay(200).fadeIn();
    navPos = searchIndex.position().top;
}

function addTalksEntriesNoVideo() {
    talksList.forEach(item => {
        let entryTitle = item['Title'];
        let entryStudents = item['Students'];
        let entryAdvisors = item['Advisors'];
        let entryMajor = item['Major'];
        let entrySlides = item['Slides'];
        let entryAbstract = item['Abstract'];

        let cardId = curFilter === STUDENT ? replaceSpaceUnderline(entryStudents) : replaceSpaceUnderline(entryTitle);

        let card = $("<div/>", {
            class: 'card-transparent my-5',
            id: cardId
        });
        let title = $("<h3/>", {
            class: 'text-center'
        })
            .text(entryTitle);
        let subtitleRow = $("<div/>", {
            class: 'row my-4 justify-content-center align-items-top'
        });

        let mediaRow = $("<div/>", {
            class: 'row mt-4 mx-5'
        });
        let subtitleCol = $("<div/>", {
            class: 'col-10 d-flex'
        });
        let studentCol = $("<div/>", {
            class: 'col text-center'
        });
        let advisorCol = $("<div/>", {
            class: 'col text-center'
        });
        let majorCol = $("<div/>", {
            class: 'col text-center'
        });

        let students = $("<h5/>", {
            class: 'text-center'
        })
            .text(entryStudents);
        let studentIcon = $("<i/>", {
            class: "fas fa-user-graduate my-2"
        });

        let advisor = $("<h5/>", {
            class: 'text-center'
        })
            .text(entryAdvisors);
        let advisorIcon = $("<i/>", {
            class: "fas fa-user-tie my-2"
        });

        let major = $("<h5/>", {
            class: 'text-center'
        })
            .text(entryMajor);
        let majorIcon = $("<i/>", {
            class: "fas fa-building my-2"
        });

        let slidesCol = $("<div/>", {
            class: 'col justify-content-center'
        });
        let slidesTag = entrySlides;
        let abstractCol = $("<div/>", {
            class: 'col mt-0 px-0 px-3'
        });
        let abstractText = $("<p/>", {
            class: 'px-0 mx-0',
            style: 'font-size: .9rem;'
        })
            .text(entryAbstract);

        entriesRow.append(card);
        card.append(title);
        card.append(subtitleRow);
        subtitleRow.append(subtitleCol);

        subtitleCol.append(studentCol);
        subtitleCol.append(advisorCol);
        subtitleCol.append(majorCol);
        studentCol.append(studentIcon);
        studentCol.append(students);
        advisorCol.append(advisorIcon);
        advisorCol.append(advisor);
        majorCol.append(majorIcon);
        majorCol.append(major);

        card.append(mediaRow);
        mediaRow.append(slidesCol);
        mediaRow.append(abstractCol);
        slidesCol.append(slidesTag);
        abstractCol.append(abstractText);
    })

}

function addTalksEntriesWVideo() {
    talksList.forEach(item => {
        let entryTitle = item['Title'];
        let entryStudents = item['Students'];
        let entryAdvisors = item['Advisors'];
        let entryMajor = item['Major'];
        let entryVideo = item['Video'];
        let entrySlides = item['Slides'];
        let entryAbstract = item['Abstract'];

        let cardId = curFilter === STUDENT ? replaceSpaceUnderline(entryStudents) : replaceSpaceUnderline(entryTitle);

        let card = $("<div/>", {
            class: 'card-transparent my-5',
            id: cardId
        });
        let title = $("<h3/>", {
            class: 'text-center'
        }).text(entryTitle);

        let mediaRow = $("<div/>", {
            class: 'row mt-4 mx-5'
        });
        let videoCol = $("<div/>", {
            class: 'col-6 justify-content-center'
        });
        let videoTag = $("<iframe/>", {
            'width': '100%',
            'height': '315',
            'src': extractMediaLink(entryVideo, 'video'),
            'allowfullscreen': true
        });

        let subtitleRow = $("<div/>", {
            class: 'row my-4 justify-content-center align-items-top'
        });
        let subtitleCol = $("<div/>", {
            class: 'col-10 d-flex'
        });
        let studentCol = $("<div/>", {
            class: 'col text-center'
        });
        let advisorCol = $("<div/>", {
            class: 'col text-center'
        });
        let majorCol = $("<div/>", {
            class: 'col text-center'
        });

        let students = $("<h5/>", {
            class: 'text-center'
        }).text(entryStudents);
        let studentIcon = $("<i/>", {
            class: "fas fa-user-graduate my-2"
        });

        let advisor = $("<h5/>", {
            class: 'text-center'
        }).text(entryAdvisors);
        let advisorIcon = $("<i/>", {
            class: "fas fa-user-tie my-2"
        });

        let major = $("<h5/>", {
            class: 'text-center'
        }).text(entryMajor);
        let majorIcon = $("<i/>", {
            class: "fas fa-building my-2"
        });

        let slidesCol = $("<div/>", {
            class: 'col justify-content-center'
        });
        let slidesTag = entrySlides;
        let abstractCol = $("<div/>", {
            class: 'col mt-4 px-5'
        });
        let abstractText = $("<p/>", {
            class: 'px-3 mx-0',
            style: 'font-size: .9rem;'
        }).text(entryAbstract);

        entriesRow.append(card);
        card.append(title);
        card.append(subtitleRow);
        subtitleRow.append(subtitleCol);

        subtitleCol.append(studentCol);
        subtitleCol.append(advisorCol);
        subtitleCol.append(majorCol);

        studentCol.append(studentIcon);
        studentCol.append(students);

        advisorCol.append(advisorIcon);
        advisorCol.append(advisor);

        majorCol.append(majorIcon);
        majorCol.append(major);
        card.append(mediaRow);
        mediaRow.append(slidesCol);
        slidesCol.append(slidesTag);
        mediaRow.append(videoCol);
        videoCol.append(videoTag);

        card.append(abstractCol);
        abstractCol.append(abstractText);
    })
}

function deleteTalksEntries() {
    entriesRow.empty();
}

function deleteIndex() {
    searchIndex.empty();
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
            $(".student").addClass('active');
            $(".title").removeClass('active');
            sortData(talksList, 'Students');

        }
        if (el.text === SUBMISSION) {
            $(".title").addClass('active');
            $(".student").removeClass('active');
            sortData(talksList, 'Title');
        }
        curFilter = el.text;
        addSearchIndex();
        addTalksEntries();
        clickFirstIndex();
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
                        if (fromTop < navPos + margin) {
                            $(".indexLink").removeClass('active');
                            theLink.addClass('active');
                        }
                    }
                    processing = false;
                }
            })
    });
}

function addHrefListener() {
    $(".nav").fadeIn();
    $(".title").delay(200).fadeIn();

    $(document).on("click", "#searchIndex", ev => {
        ev.preventDefault();
        let el = ev.target || ev.srcElement;
        if (el instanceof HTMLAnchorElement) {
            window.location.href = el.getAttribute('href');
            let htmlTag = $("html");
            let scrollPos = htmlTag.scrollTop();
            console.log('scrollpos', scrollPos);
            htmlTag.animate({
                scrollTop: scrollPos - (navPos) - 50
            });
        }
    });
}

function clickFirstIndex() {
    console.log('called', searchIndex.children().eq(0))
    searchIndex.children()[0].click();
}


