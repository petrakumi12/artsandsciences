let talksList, startingLetters, processing, navPos;
let margin = 50 / window.innerWidth;
let searchIndex, entriesRow;
let STUDENT = "Student Name";
let SUBMISSION = "Submission Title";
let curFilter = STUDENT;
let isSmall;
let smallScreen = 576;


window.onload = function () {
    searchIndex = $("#searchIndex");
    entriesRow = $("#entriesRow");
    isSmall = checkIsSmall();
    d3.csv("../data/submissions.csv").then(data => {
        sortData(data, 'Students');
        addSearchIndex();
        addTalksEntriesNoVideo();
        addHrefListener();
        addScrollSpy();
        // clickFirstIndex();
        goToHref();
        generateSearchOnResize();
    })
};

function checkIsSmall() {
    return window.innerWidth < smallScreen
}

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
        startingLetters = addIfNotExist(startingLetters, el[attribute][0], replaceSpecial(el[attribute])));
    startingLetters = startingLetters.sort((a, b) => sortCondition(a[0], b[0]));
}

function addSearchIndex() {

    if (window.innerWidth < smallScreen) {
        let containerDiv = $("<div/>", {
            class: 'input-group d-flex justify-content-center'
        });
        let select = $("<select/>", {
            class: 'custom-select text-center',
            id: 'selectIndexTag',
            'data-width': '20%'
        })
        startingLetters.forEach(([letter, ref], i) => {
            let option = $("<option/>", {
                class: 'indexLink',
                value: '#' + ref,
                href: '#' + ref,
                id: 'a_' + ref
            }).text(letter);
            select.append(option)
        });
        searchIndex.append(containerDiv);
        containerDiv.append(select);
        addOnSelectListener();
    } else {
        startingLetters.forEach(([letter, ref], i) => {
            let a = $("<a\>", {
                class: 'indexLink px-4',
                href: '#' + ref,
                id: 'a_' + ref
            }).text(letter);
            searchIndex.append(a);
        });
    }

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

        let cardId = curFilter === STUDENT ? replaceSpecial(entryStudents) : replaceSpecial(entryTitle);

        let card = $("<div/>", {
            class: 'card-transparent my-5',
            id: cardId
        });
        let title = $("<h3/>", {
            class: 'text-center px-3'
        }).text(entryTitle);

        let subtitleRow = $("<div/>", {
            class: 'row w-100 no-gutters mt-4 justify-content-center align-items-top'
        });
        let subtitleCol = $("<div/>", {
            class: 'row w-100 no-gutters px-5 justify-content-around'
        });

        let studentCol = $("<div/>", {
            class: 'col-xs-4 px-2 text-center icon-text-col'
        });
        let advisorCol = $("<div/>", {
            class: 'col-xs-4 px-2 text-center icon-text-col'
        });
        let majorCol = $("<div/>", {
            class: 'col-xs-4 px-2 text-center icon-text-col'
        });
        let students = $("<h5/>").text(entryStudents);
        let studentIcon = $("<i/>", {
            class: "fas fa-user-graduate my-2"
        });
        let advisor = $("<h5/>").html(entryAdvisors);
        let advisorIcon = $("<i/>", {
            class: "fas fa-user-tie my-2"
        });
        let major = $("<h5/>").text(entryMajor);
        let majorIcon = $("<i/>", {
            class: "fas fa-building my-2"
        });
        let containerRow = $("<div/>", {
            class: 'row w-100 no-gutters px-5 media-container'
        });
        let slidesCol = $("<div/>", {
            class: 'col-lg-6 mt-4  px-3 justify-content-center'
        });
        let slidesTag = entrySlides;
        let parsedSlidesTag = $($.parseHTML(entrySlides));
            // .width('100%')
            // .height('20rem');
            // .removeAttr('width');
            // parsedSlidesTag.removeAttr('height');
                parsedSlidesTag.width('100%')
        parsedSlidesTag.css('min-height', '100%')

        let abstractCol = $("<div/>", {
            class: 'col-lg-6 mt-4'
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

        card.append(containerRow);
        containerRow.append(slidesCol);
        containerRow.append(abstractCol);
        slidesCol.append(parsedSlidesTag);
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

        let cardId = curFilter === STUDENT ? replaceSpecial(entryStudents) : replaceSpecial(entryTitle);

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

function goToHref(url = '') {
    console.log('href', url);
    url === '' ? window.location.href.split('#')[1] + '#' : url;
    if (url !== '') {
        let hrefPos = $(url).position().top;
        console.log('pos', hrefPos);
        $("html").animate({
            scrollTop: hrefPos - navPos - margin
        }, 600);
    } else {
        clickFirstIndex();
    }

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
        addTalksEntriesNoVideo();
        clickFirstIndex();
    }
}

function replaceSpecial(word) {
    word = word.replaceAll(/[^\w\s]/gi, '');
    return word.replaceAll(' ', '_')
}

function addScrollSpy() {
    $(window).scroll(ev => {
        startingLetters
            .map(el => replaceSpecial(el[1]))
            .forEach(ref => {
                if (!processing) {
                    processing = true;
                    let aref = "#a_" + ref;
                    let cardref = "#" + ref;
                    let theLink = $(aref);
                    let pos = $(cardref).offset();
                    if (pos && !theLink.hasClass('active') && !theLink.hasClass('selected')) {
                        let fromTop = pos.top - $(window).scrollTop();
                        if (fromTop <= navPos + 300) {
                            if (window.innerWidth < smallScreen) {
                                $(".indexLink").removeClass('selected');
                                theLink.addClass('selected');
                            } else {
                                $(".indexLink").removeClass('active');
                                theLink.addClass('active');
                            }
                        }
                    }
                    processing = false;
                }
            })
    });
}

function addHrefListener() {
    $(document).on("click", "#searchIndex", ev => {
        // ev.preventDefault();
        let el = ev.target || ev.srcElement;
        if (el instanceof HTMLAnchorElement && el.id !== 'a_') {
            let hrefPos = $(el.getAttribute('href')).position().top;
            $("html").animate({
                scrollTop: hrefPos - navPos - margin
            }, 600);
        }
    });
}

function generateSearchOnResize() {
    $(window).resize(ev => {
        let newCheck = checkIsSmall();
        if (newCheck !== isSmall) {
            isSmall = newCheck;
            deleteIndex();
            addSearchIndex();
        }
    })
}

function addOnSelectListener() {
    $("select").click(function () {
        let child = $("select option:selected");
        goToHref(child.attr('href'));
    });
}

function clickFirstIndex() {
    searchIndex.children()[0].click();
}




