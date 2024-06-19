// Code to make menus responsive      
function navResp() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Code to show or hide elements onclick event, just as example solutions
function elemShowHide(e) {
    var x = document.getElementById(e);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// Code for printer friendly page
function pgPrint() {
    // Create a new window
    var frog = window.open("", "", "width=920,height=600,scrollbars=1,resizable=1")

    // Store the html content
    var text = document.getElementById("maincontent").innerHTML;

    // Create the html content of the new page
    var html = '<html><head>';
    html += '<link rel="stylesheet" type="text/css" media="screen" href="PrintStyle.css">';
    html += '<link rel="stylesheet" type="text/css" media="print" href="PrintStyle.css">';
    html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">';
    html += '<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></s' + 'cript>';
    html += '<script id="MathJax-script" async="" src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-svg.js"></s' + 'cript>';
    html += '<title>Printer Friendly</title>'
    html += '</head><body>';

    // Copy the body content into the new page
    html += text;

    // Close the new page
    html += '<script>function loadprint() {window.print();}</s' + 'cript>'
    html += '</body></html>';

    frog.document.open();
    frog.document.write(html);
    frog.document.close();
}