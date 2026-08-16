// =====================================================================================
// DOM Loader for UI and Nav scripts
// =====================================================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. First, build and inject your hollow shell structural templates
    injectGlobalHeaderBanner();
    injectGlobalFooterBanner();

    // 2. Next, trigger your navbar and text injections immediately afterward.
    // This absolute sequence guarantees the subtitle tag is waiting in the DOM tree!
    if (typeof loadStickyTopNav === "function") {
        loadStickyTopNav();
    }

    // 3. Finally, trigger your accessible table of contents toggle hooks
    if (typeof initializeTocDropdownController === "function") {
        initializeTocDropdownController();
    }
});



// =====================================================================================
// Header and Footer global insert content
// =====================================================================================

// AUTOMATED HEADER BANNER GENERATION ENGINE (Preserved)
function injectGlobalHeaderBanner() {
    const headerElement = document.getElementById("global-site-header");
    if (!headerElement) return;

    const relativeRootPrefix = "../";

    // <img src="${relativeRootPrefix}logo-m.png" alt="M4thg33x Logo">
    // <img src="${relativeRootPrefix}logo_custom.png" alt="Wake Tech Logo" style="max-width: 250px; height: 100px;">
    headerElement.innerHTML = `
        <img src="${relativeRootPrefix}logo_custom.png" alt="Wake Tech Logo" style="max-width: 250px; height: 100px;">
        <p id="subtitle" class="header-subtitle"><!-- Filled automatically by site-nav.js script --></p>
    `;
}

// AUTOMATED FOOTER CONTENT GENERATION ENGINE (Matches your original design exactly)
function injectGlobalFooterBanner() {
    const footerElement = document.getElementById("global-site-footer");
    if (!footerElement) return;

    // Fetch the current machine year to guarantee the copyright calendar date updates automatically
    const currentYear = new Date().getFullYear();

    // Reconstructs your exact structural layout with Creative Commons licensing elements
    footerElement.innerHTML = `
        <div class="l-col">            
            <p>&copy; ${currentYear} <a href="https://www.youtube.com/channel/UCszzyEwfkBHBPk6xkNrGpAA" target="_blank" rel="noopener noreferrer" aria-label="M4thG33x YouTube Channel - opens in a new window">M4thG33x YouTube Channel</a>. All rights reserved.</p>

            <a rel="license noopener noreferrer" href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank">
                <img alt="Creative Commons Attribution-ShareAlike 4.0 International License" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" style="border-width:0;">
            </a>
        </div>
        <div class="r-col">
            <a href="#" onclick="pgPrint(); return false;"><i class="fa fa-print" aria-hidden="true"></i> Printer Friendly Page</a>
        </div>
    `;
}


// =====================================================================================
// Generate a printer-friendly page on button click
// =====================================================================================
function pgPrint() {
    // 1. Target the main content node
    var mainBodyNode = document.getElementById("mainbody");
    if (!mainBodyNode) return;

    // 2. Clone the container so we don't disrupt the user's current live view
    var cloneNode = mainBodyNode.cloneNode(true);

    // 3. For MathJax 4: Locate all processed math blocks inside the clone
    if (window.MathJax && window.MathJax.startup && window.MathJax.startup.document) {
        var mathItems = window.MathJax.startup.document.getMathItemsWithin(mainBodyNode);

        // Match the clone's math container wrappers to replace them with raw TeX
        var processedContainers = cloneNode.querySelectorAll('mjx-container, .MathJax');

        mathItems.forEach(function (item, index) {
            if (processedContainers[index]) {
                // Set the correct backslash delimiters matching your configuration
                var delimStart = item.display ? '\\[' : '\\(';
                var delimEnd = item.display ? '\\]' : '\\)';

                // Form the raw fallback text string
                var rawMathString = delimStart + item.math + delimEnd;

                // Swap out the complex processed HTML structure for the clean raw string
                processedContainers[index].outerHTML = rawMathString;
            }
        });
    }

    // 4. Capture the cleaned-up source string containing your specific notation
    var text = cloneNode.innerHTML;

    // 5. Open and construct the clean printer preview tab
    var printDoc = window.open("", "", "width=1200,height=900,scrollbars=1,resizable=1");

    var html = '<html><head>';
    html += '<link rel="stylesheet" type="text/css" media="screen" href="../print-styles.css">';
    html += '<link rel="stylesheet" type="text/css" media="print" href="../print-styles.css">';
    html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">';

    // Inject configuration script first, followed by the core loader script
    html += '<script src="../math.js"></s' + 'cript>';
    html += '<script id="MathJax-script" defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></s' + 'cript>';
    html += '<title>Printer Friendly</title>';

    // html += '<style>';
    // html += '  @media screen {';
    // html += '    body { max-width: 816px; margin: 40px auto; padding: 20px; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.15); }';
    // html += '    html { background-color: #f0f0f0; }';
    // html += '  }';
    // html += '  @media print {';
    // html += '    @page { size: letter; margin: 0.5in; }';
    // html += '    body { max-width: 100% !important; margin: 0 !important; padding: 0 !important; background: #fff !important; }';
    // html += '  }';
    // html += '</style>';

    html += '</head><body>';
    html += text;
    html += '<script>function loadprint() {window.print();}</s' + 'cript>';
    html += '</body></html>';

    printDoc.document.open();
    printDoc.document.write(html);
    printDoc.document.close();
}


// =====================================================================================
// Click-to-Reveal Example Solution Toggle Utility
// =====================================================================================
function toggleSolution(buttonId, contentId) {
    const btn = document.getElementById(buttonId);
    const content = document.getElementById(contentId);
    if (!btn || !content) return;

    const isExpanded = btn.getAttribute("aria-expanded") === "true";

    // Toggle ARIA attributes state metrics
    btn.setAttribute("aria-expanded", !isExpanded);
    content.setAttribute("aria-hidden", isExpanded);

    // Toggle layout container visibility
    content.style.display = isExpanded ? "none" : "block";
    btn.textContent = isExpanded ? "Show Answer" : "Hide Answer";

    // Force MathJax to cleanly format formulas inside the newly displayed layout box
    if (!isExpanded && window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([content]).catch(function (err) {
            console.error("MathJax processing failed: ", err.message);
        });
    }
}


/* =========================================================================
   RESPONSIVE TABLE MATRIX TRANSPOSITION (TABLE 2)
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector(".table-column-group");
    if (!table) return;

    const tbody = table.querySelector("tbody");
    const desktopBackupHTML = tbody.innerHTML;

    const headers = Array.from(table.querySelectorAll("thead th"));
    const rows = Array.from(table.querySelectorAll("tbody tr"));

    const columnStacks = headers.map((th) => {
        const mimicHeader = document.createElement("td");
        mimicHeader.className = "header-mimic";
        mimicHeader.setAttribute("role", "cell");
        mimicHeader.innerText = th.innerText;
        return [mimicHeader];
    });

    rows.forEach((row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        cells.forEach((cell, colIndex) => {
            if (columnStacks[colIndex]) {
                columnStacks[colIndex].push(cell.cloneNode(true));
            }
        });
    });

    columnStacks.forEach((stack) => {
        if (stack.length > 0) {
            stack[stack.length - 1].classList.add("last-in-card");
        }
    });

    let isMobileView = null;

    function adjustTableStructure() {
        const width = window.innerWidth || document.documentElement.clientWidth;

        if (width <= 768) {
            if (isMobileView !== true) {
                tbody.innerHTML = "";
                columnStacks.forEach((stack) => {
                    stack.forEach(cell => tbody.appendChild(cell.cloneNode(true)));
                });
                isMobileView = true;
            }
        } else {
            if (isMobileView !== false) {
                tbody.innerHTML = desktopBackupHTML;
                isMobileView = false;
            }
        }
    }

    adjustTableStructure();
    window.addEventListener("resize", adjustTableStructure);
});
