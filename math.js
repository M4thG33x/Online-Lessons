window.MathJax = {
    tex: {
        // inlineMath: [['$', '$'], ['\\(', '\\)']],
        // displayMath: [['$$', '$$'], ['\\[', '\\]']]
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']]
    },
    output: {
        font: 'mathjax-fira', // Activates the full modern sans-serif typeface engine
        // font: 'mathjax-dejavu' // Crisp geometric layout with thin line vectors
        // font: 'mathjax-modern', // Thinner structural stroke profile
        // fontCharMap: {
        //     // Forces default text calculations into clean sans-serif profiles
        //     'normal': 'sans-serif',
        //     'italic': 'sans-serif-italic'
        // }
        linebreaks: {
            inline: false,  // Stop inline math from wrapping inside lines
            display: false  // Stop display math blocks from breaking
        }
    }
};