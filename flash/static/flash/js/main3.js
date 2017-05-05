var countStrs = ["③", "②", "①"];
var index;
var quizArray;
var quiz;
var inputindex;
var calcanswer;

function init() {
    index = 0;
    quizArray = [];
    quizArray.push(new Group(1, 7, 1, 0, 5.6));
    quizArray.push(new Group(1, 7, 1, 3, 5.6));
    quizArray.push(new Group(1, 9, 1, 0, 7.2));
    quizArray.push(new Group(1, 9, 1, 4, 7.2));
    quizArray.push(new Group(1, 10, 1, 0, 8));
    quizArray.push(new Group(1, 10, 1, 5, 8));
    quizArray.push(new Group(2, 7, 1, 0, 6.3));
    quizArray.push(new Group(2, 7, 1, 3, 6.3));
    quizArray.push(new Group(2, 9, 1, 0, 8.1));
    quizArray.push(new Group(2, 9, 1, 4, 8.1));
    quizArray.push(new Group(2, 10, 1, 0, 9));
    quizArray.push(new Group(2, 10, 1, 5, 9));
    quizArray.push(new Group(3, 5, 1, 0, 5));
    quizArray.push(new Group(3, 5, 1, 2, 5));
    quizArray.push(new Group(3, 10, 1, 0, 10));
    quizArray.push(new Group(3, 10, 1, 5, 10));
    var content = "第1题,第2题,第3题,第4题,第5题,第6题,第7题,第8题\r\n";
    quizArray.forEach(function(item, index, array) {
        item.generate(1);
        content += item.answer;
        if (index == 7) {
            content += "\r\n第9题,第10题,第11题,第12题,第13题,第14题,第15题,第16题\r\n";
        } else if (index != 15) {
            content += ",";
        }
    });
    $("#saveanswer").attr("href", "data:application/csv;charset=UTF-8," + encodeURI(content));
    showTitle();

    $("#go").hide();
    $(".container").hide();
    $("#rowinput").hide();
    inputindex = 0;
    calcanswer = 0;
    $('#idinput').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            addin();
        }
    });
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
        $(".fa-play-circle-o").removeClass("fa-spin");
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
    $(".card-header").text("武汉市珠心算选拔赛 - 第" + (index + 1) + "题");
}

function readytogo() {
    $("#go").show();
    $("#saveanswer").hide();
    return true;
}

function go() {
    if ($("#go").hasClass("disabled")) {
        return false;
    }

    if (index < 16) {
        showTitle();
        quiz = quizArray[index];
        index++;
        $("#go").addClass("disabled");
        $(".fa-play-circle-o").addClass("fa-spin");
        setTimeout(repeat(0, 3, 1000, showCount), 0);
    } else {
        return false;
    }

    //$(".card-block").hide();
    //$("#rowgo").hide();
    //$(".container").show();
    //$("#rowinput").show();
}

function addin() {
    var i = parseInt($("#idinput").val());
    if (isNaN(i) || inputindex > 9) {
        $("#idinput").val("");
        return false;
    }

    $("#idinput").val("");
    $(".inputnumber").eq(inputindex++).number(i);
    calcanswer += i;
}

function calc() {
    $(".answer").addClass("whitetop");
    $(".answer").number(calcanswer);
}
