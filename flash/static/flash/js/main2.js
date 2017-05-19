var countStrs = ["③", "②", "①"];
var timegap = [0, 0.6, 0.7, 0.9, 1];
var mixStrs = ["纯加", "混合"];
var headText = "闪电心算 -";
var digitVal = 1; // 位数
var numVal = 10; // 总笔数
var mixIndex = 0; // 混合 OR 纯加
var mixVal = 0; // 负数的笔数 

function init() {
    showTitle();
    $("#digit_selector button").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        digitVal = parseInt($(this).attr("value"));
        showTitle();
    });

    $("#num_selector button").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        numVal = parseInt($(this).attr("value"));
        showTitle();
    });

    $("#mix_selector button").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
        mixIndex = parseInt($(this).attr("value"));
        showTitle();

        if (mixIndex == 1) {
            mixVal = Math.floor(numVal / 2);
        } else {
            mixVal = 0;
        }
    });

    $(window).resize(adjustInit);
    adjustInit();
}

function adjustInit() {
    //设置.init的top和height
    $(".init").css({ "top": $(".card-header").outerHeight() });
    $(".init").css({ "height": $(".card-block").outerHeight() });
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
        $(".card-text").removeClass("negative");
    } else {
        if (quiz.nums[begin] < 0) {
            $(".card-text").addClass("negative");
        } else {
            $(".card-text").removeClass("negative");
        }
        $(".card-text").number(quiz.nums[begin]);
    }
}

function showMask(begin, end) {
    if (begin == end) {
        $(".init span").removeClass("spin");
        $(".init").removeClass("part1").removeClass("part2");
    } else {
        $(".init span").removeClass("spin");
        $(".init").removeClass("part1").removeClass("part2");
        $(".init").offset();
        $(".init span").addClass("spin");
        $(".init").addClass("part1");
        setTimeout(function() { $(".init").addClass("part2"); }, 500);
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
        $(".card-text").removeClass("negative");
    } else {
        if (quiz.answer < 0) {
            $(".card-text").addClass("negative");
        } else {
            $(".card-text").removeClass("negative");
        }
        $(".card-text").number(quiz.answer);
    }
}

function showTitle() {
    $(".card-header").text(headText + " " + digitVal + "位数 " + numVal + "笔 " + mixStrs[mixIndex]);
}

function go() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }
    quiz = new Group(digitVal, numVal, 1, mixVal, numVal * timegap[digitVal]);
    showTitle();
    quiz.generate(mixIndex);
    $("#go").addClass("disabled");
    $(".fa").addClass("fa-spin");
    setTimeout(repeat(0, 3, 1000, showCount), 0);
    setTimeout(repeat(0, 3, 1000, showMask), 0);
}
