function checkFitBSub(inputID, ans, correctID, wrongID, enteransID, tolerance) {
    guess = document.getElementById(inputID).value;
    guess = guess.toLowerCase();

    if (guess == "") {
        document.getElementById(enteransID).style.display = "inline";
        document.getElementById(correctID).style.display = "none";
        document.getElementById(wrongID).style.display = "none";
    } else {

        if (tolerance > 0) {
            //enter answer within allowed tolerance
            if (guess >= ans - tolerance && guess <= ans + tolerance) {
                //answer is correct, display checkmark
                document.getElementById(enteransID).style.display = "none";
                document.getElementById(correctID).style.display = "inline";
                document.getElementById(wrongID).style.display = "none";
            } else {
                //answer is incorrect, display X
                document.getElementById(enteransID).style.display = "none";
                document.getElementById(wrongID).style.display = "inline";
                document.getElementById(correctID).style.display = "none";
            }
        } else {
            //enter exact answer with no tolerance
            if (guess == ans) {
                //answer is correct, display checkmark
                document.getElementById(enteransID).style.display = "none";
                document.getElementById(correctID).style.display = "inline";
                document.getElementById(wrongID).style.display = "none";
            } else {
                //answer is incorrect, display X
                document.getElementById(enteransID).style.display = "none";
                document.getElementById(wrongID).style.display = "inline";
                document.getElementById(correctID).style.display = "none";
            }
        }
    }
}


function checkMCSub(radioName, ans, correctID, wrongID, mkchoiceID) {
    radio = document.getElementsByName(radioName);

    guess = -1;
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) guess = radio[i].value
    }

    if (guess == -1) {
        document.getElementById(mkchoiceID).style.display = "inline";
        document.getElementById(correctID).style.display = "none";
        document.getElementById(wrongID).style.display = "none";
    } else if (guess == ans) {
        //answer is correct, display checkmark
        document.getElementById(mkchoiceID).style.display = "none";
        document.getElementById(correctID).style.display = "inline";
        document.getElementById(wrongID).style.display = "none";
    } else {
        //answer is incorrect, display X
        document.getElementById(mkchoiceID).style.display = "none";
        document.getElementById(wrongID).style.display = "inline";
        document.getElementById(correctID).style.display = "none";
    }
}