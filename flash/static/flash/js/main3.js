var countStrs = ["③", "②", "①"];
var quiz1 = new Group(3, 20, 1, 0, 20);
var quiz2 = new Group(3, 20, 1, 10, 20);
var index = 1;
var quiz;

function init() {
    index = 1;
    quiz1.nums = [922, 323, 599, 319, 633, 207, 369, 255, 630, 714, 334, 892, 625, 194, 734, 914, 501, 360, 507, 892];
    quiz1.answer = 10924;
    quiz2.nums = [179, 638, 802, -596, -398, 709, -454, -399, 360, 854, -274, 610, 176, 128, -825, 235, -141, -616, -585, -352];
    quiz2.answer = 51;
}


function repeat(begin, end, time, func) {
    return function() {
        func.call(null, begin, end);
        if (begin < end) {
            if (begin++ < end) {
                setTimeout(repeat(begin, end, time, func), time);
            }
        } else if (begin > end) {
            if (begin-- > end) {
                setTimeout(repeat(begin, end, time, func), time);
            }
        } else {}
    };
}

function showQuiz(begin, end) {
    if (begin == end) {
        $(".card-text").text("");
        $("#go").removeClass("disabled");
        $(".fa").removeClass("fa-spin");
    } else {
        $(".card-text").number(quiz.nums[begin]);
    }
}

function showCount(begin, end) {
    if (begin == end) {
        $(".card-text").text("");
        setTimeout(repeat(0, quiz.total, quiz.millisec / quiz.total, showQuiz), 0);
    } else {
        $(".card-text").text(countStrs[begin]);
    }
}

function showAnswer() {
    if ($(".card-text").text().length > 0) {
        $(".card-text").text("");
    } else {
        $(".card-text").number(quiz.answer);
    }
}

function showTitle() {
    $(".card-header").text(headText + " " + digitStrs[digitVal] + " " + numStrs[numVal] + " " + mixStrs[mixIndex]);
}

function go() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }

    if (index == 1) {
        quiz = quiz1;
        index = 2;
        $("#go").addClass("disabled");
        $(".fa").addClass("fa-spin");
        setTimeout(repeat(0, 3, 1000, showCount), 0);
    } else if (index == 2) {
        quiz = quiz2;
        index = 1;
        $("#go").addClass("disabled");
        $(".fa").addClass("fa-spin");
        setTimeout(repeat(0, 3, 1000, showCount), 0);
    } else if (index == 3) {

    } else {
        return false;
    }
}
