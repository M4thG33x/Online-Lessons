window.MathJax = {
    tex: {
        // inlineMath: [['$', '$'], ['\\(', '\\)']],
        // displayMath: [['$$', '$$'], ['\\[', '\\]']]
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']]
    },
    output: {
        // font: 'mathjax-newcm',
        // font: 'mathjax-asana',
        // font: 'mathjax-bonum',
        // font: 'mathjax-dejavu',
        // font: 'mathjax-modern',
        // font: 'mathjax-pagella',
        // font: 'mathjax-schola',
        // font: 'mathjax-stix2',
        font: 'mathjax-termes',
        // font: 'mathjax-fira', // Activates the full modern sans-serif typeface engine
        linebreaks: {
            inline: false,  // Stop inline math from wrapping inside lines
            display: false  // Stop display math blocks from breaking
        },
        // mathmlSpacing: false,
        // exfactor: 0.25,
    },
    // chtml: {
    //     mathFontHeight: true
    // }
};