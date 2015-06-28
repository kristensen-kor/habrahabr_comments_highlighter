var comments = document.getElementsByClassName("comment_body");

var l = comments.length;

function getScore(xs) {
    var score = xs.getElementsByClassName("score")[0].childNodes[0].nodeValue;
    if (score.indexOf('+') == 0) return Number(score.substring(1));
    if (score.indexOf('–') == 0) return -1 * Number(score.substring(1));
    return Number(score);
}

var scores_pos = [];
var scores_neg = [];

for (var i = 0; i < l; i++) {
    var score = getScore(comments[i]);
    if (score > 0) scores_pos[score] = 0.5;
    if (score < 0) scores_neg[-score] = 0.5;
}


function array_length(xs) {
    var res = 0;
    for (var i = 0; i < xs.length; i++) {
       if (xs[i] == 0.5) res++;
    }
    return res;
}

var j = 0;
var alen = array_length(scores_pos);
if (alen > 1) {
    for (var i = 0; i < scores_pos.length; i++) {
        if (scores_pos[i] == 0.5) {
            scores_pos[i] = j / (alen - 1);
            j++;
        }
    }
}

j = 0;
alen = array_length(scores_neg);
if (alen > 1) {
    for (var i = 0; i < scores_neg.length; i++) {
        if (scores_neg[i] == 0.5) {
            scores_neg[i] = j / (alen - 1);
            j++;
        }
    }
}

for (var i = 0; i < l; i++) {
    var score = getScore(comments[i]);

    if (score > 0) {
        var s = 95 - 10 * scores_pos[score];
        var h = 60 + 60 * scores_pos[score];
        comments[i].getElementsByClassName("message")[0].style.backgroundColor = "hsl(" + h + ", 100%, " + s + "%)";
    }
    if (score < 0) {
        var color = 95 - 30 * scores_neg[-score];
        comments[i].getElementsByClassName("message")[0].style.backgroundColor = "hsl(0, 100%, " + color + "%)";
    }
}
