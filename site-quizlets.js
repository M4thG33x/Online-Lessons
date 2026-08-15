// =====================================================================================
// 1. NUMERICAL FILL-IN-THE-BLANK SUBMISSION ENGINE
// =====================================================================================
function checkFitBSub(inputID, ans, correctID, wrongID, enteransID, tolerance) {
    var userVal = document.getElementById(inputID).value.trim();
    
    var enterAnsEl = document.getElementById(enteransID);
    var correctEl = document.getElementById(correctID);
    var wrongEl = document.getElementById(wrongID);

    // Safeguard structural markup and MathJax LaTeX definitions inside datasets
    if (!enterAnsEl.dataset.originalHtml) enterAnsEl.dataset.originalHtml = enterAnsEl.innerHTML;
    if (!correctEl.dataset.originalHtml) correctEl.dataset.originalHtml = correctEl.innerHTML;
    if (!wrongEl.dataset.originalHtml) wrongEl.dataset.originalHtml = wrongEl.innerHTML;

    // 1. If empty or invalid, clear other states and flag entry warning
    if (userVal === "") {
        correctEl.innerHTML = "";
        wrongEl.innerHTML = "";
        correctEl.style.display = "none";
        wrongEl.style.display = "none";

        enterAnsEl.innerHTML = enterAnsEl.dataset.originalHtml;
        enterAnsEl.style.display = "block";
        return;
    }

    // Convert input cleanly to support string comparisons or float assessments
    var guessNum = parseFloat(userVal);
    var isCorrect = false;

    // 2. Perform target mathematical equality checks
    if (tolerance > 0 && !isNaN(guessNum)) {
        // Range Check: Ensures answer falls within absolute margin offset boundary constraints
        isCorrect = Math.abs(guessNum - ans) <= (tolerance + 0.0001);
    } else {
        // String check fallback if evaluating strings or non-numeric structures
        isCorrect = userVal.toLowerCase() == ans.toString().toLowerCase();
    }

    // 3. Process Live Region Visibility Adjustments
    if (isCorrect) {
        enterAnsEl.innerHTML = "";
        wrongEl.innerHTML = "";
        enterAnsEl.style.display = "none";
        wrongEl.style.display = "none";

        correctEl.innerHTML = correctEl.dataset.originalHtml;
        correctEl.style.display = "block";
    } else {
        enterAnsEl.innerHTML = "";
        correctEl.innerHTML = "";
        enterAnsEl.style.display = "none";
        clearTimeout(correctEl.style.display = "none");

        wrongEl.innerHTML = wrongEl.dataset.originalHtml;
        wrongEl.style.display = "block";

        // MATHJAX ACCESSIBILITY FIX: Forces MathJax to re-render formulas upon innerHTML insertion
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([wrongEl]).catch(function (err) {
                console.error("MathJax processing failed: ", err.message);
            });
        }
    }
}


// =====================================================================================
// 2. MULTIPLE-CHOICE SUBMISSION ENGINE
// =====================================================================================
function checkMCSub(radioName, ans, correctID, wrongID, mkchoiceID) {
    var radio = document.getElementsByName(radioName);

    var guess = -1;
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) guess = radio[i].value;
    }

    var mkChoiceEl = document.getElementById(mkchoiceID);
    var correctEl = document.getElementById(correctID);
    var wrongEl = document.getElementById(wrongID);

    if (!mkChoiceEl.dataset.originalHtml) mkChoiceEl.dataset.originalHtml = mkChoiceEl.innerHTML;
    if (!correctEl.dataset.originalHtml) correctEl.dataset.originalHtml = correctEl.innerHTML;
    if (!wrongEl.dataset.originalHtml) wrongEl.dataset.originalHtml = wrongEl.innerHTML;

    if (guess == -1) {
        correctEl.innerHTML = "";
        wrongEl.innerHTML = "";
        correctEl.style.display = "none";
        wrongEl.style.display = "none";

        mkChoiceEl.innerHTML = mkChoiceEl.dataset.originalHtml;
        mkChoiceEl.style.display = "block";
    } else if (guess == ans) {
        mkChoiceEl.innerHTML = "";
        wrongEl.innerHTML = "";
        mkChoiceEl.style.display = "none";
        wrongEl.style.display = "none";

        correctEl.innerHTML = correctEl.dataset.originalHtml;
        correctEl.style.display = "block";
    } else {
        mkChoiceEl.innerHTML = "";
        correctEl.innerHTML = "";
        mkChoiceEl.style.display = "none";
        correctEl.style.display = "none";

        wrongEl.innerHTML = wrongEl.dataset.originalHtml;
        wrongEl.style.display = "block";

        // MATHJAX ACCESSIBILITY FIX: Forces MathJax to re-render formulas upon innerHTML insertion
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([wrongEl]).catch(function (err) {
                console.error("MathJax processing failed: ", err.message);
            });
        }
    }
}



// function checkFitBSub(inputID, ans, correctID, wrongID, enteransID, tolerance) {
//     guess = document.getElementById(inputID).value;
//     guess = guess.toLowerCase();

//     if (guess == "") {
//         document.getElementById(enteransID).style.display = "inline";
//         document.getElementById(correctID).style.display = "none";
//         document.getElementById(wrongID).style.display = "none";
//     } else {

//         if (tolerance > 0) {
//             //enter answer within allowed tolerance
//             if (Number(guess) >= (ans / tolerance - 1) *  tolerance && guess <= (ans / tolerance + 1 ) * tolerance) {
//                 //answer is correct, display checkmark
//                 document.getElementById(enteransID).style.display = "none";
//                 document.getElementById(correctID).style.display = "inline";
//                 document.getElementById(wrongID).style.display = "none";
//             } else {
//                 //answer is incorrect, display X
//                 document.getElementById(enteransID).style.display = "none";
//                 document.getElementById(wrongID).style.display = "inline";
//                 document.getElementById(correctID).style.display = "none";
//             }
//         } else {
//             //enter exact answer with no tolerance
//             if (guess == ans) {
//                 //answer is correct, display checkmark
//                 document.getElementById(enteransID).style.display = "none";
//                 document.getElementById(correctID).style.display = "inline";
//                 document.getElementById(wrongID).style.display = "none";
//             } else {
//                 //answer is incorrect, display X
//                 document.getElementById(enteransID).style.display = "none";
//                 document.getElementById(wrongID).style.display = "inline";
//                 document.getElementById(correctID).style.display = "none";
//             }
//         }
//     }
// }



// function checkMCSub(radioName, ans, correctID, wrongID, mkchoiceID) {
//     radio = document.getElementsByName(radioName);

//     guess = -1;
//     for (var i = 0; i < radio.length; i++) {
//         if (radio[i].checked) guess = radio[i].value
//     }

//     if (guess == -1) {
//         document.getElementById(mkchoiceID).style.display = "inline";
//         document.getElementById(correctID).style.display = "none";
//         document.getElementById(wrongID).style.display = "none";
//     } else if (guess == ans) {
//         //answer is correct, display checkmark
//         document.getElementById(mkchoiceID).style.display = "none";
//         document.getElementById(correctID).style.display = "inline";
//         document.getElementById(wrongID).style.display = "none";
//     } else {
//         //answer is incorrect, display X
//         document.getElementById(mkchoiceID).style.display = "none";
//         document.getElementById(wrongID).style.display = "inline";
//         document.getElementById(correctID).style.display = "none";
//     }
// }