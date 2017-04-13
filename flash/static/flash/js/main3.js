var countStrs = ["③", "②", "①"];
var quiz1 = new Group(3, 10, 1, 0, 1);
var quiz2 = new Group(3, 10, 1, 0, 1);
var quiz3 = new Group(3, 10, 1, 5, 1);
var index = 1;
var quiz;

function init() {
    index = 1;
    quiz1.nums = [784, 919, 159, 259, 346, 499, 376, 934, 182, 595];
    quiz1.answer = 5053;
    quiz2.nums = [607, 976, 745, 658, 701, 249, 210, 543, 567, 635];
    quiz2.answer = 5891;
    quiz3.nums = [585, 535, -177, 404, -286, 947, -658, -355, 751, -926];
    quiz3.answer = 820;
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
        index = 3;
        $("#go").addClass("disabled");
        $(".fa").addClass("fa-spin");
        setTimeout(repeat(0, 3, 1000, showCount), 0);
    } else if (index == 3) {
        quiz = quiz3;
        index = 4;
        $("#go").addClass("disabled");
        $(".fa").addClass("fa-spin");
        setTimeout(repeat(0, 3, 1000, showCount), 0);
    } else {

    }


}
