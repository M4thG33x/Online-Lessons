// ==========================================================================
// 1. Site Map array of all lesson files, organized by courseFolder and lessonName
// ==========================================================================
const SiteMap = [
    // Trigonometry (All files live directly inside the '172' course folder)
    // { courseFolder: "trig", file: "angles.html", pageName: "Angles", lessonName: "Angles and Angle Measure" },
    // { courseFolder: "trig", file: "arcsector.html", pageName: "Arcs &amp; Sectors", lessonName: "Angles and Angle Measure" }, // Shared lessonName
    // { courseFolder: "trig", file: "applications.html", pageName: "Applications", lessonName: "Applications of Right Triangle Trigonometry" },

    // Calculus III (Moved directly into the 'calciii' course folder)
    // { courseFolder: "calciii", file: "0-basePage.html", pageName: "Base", lessonName: "3D Space, Vectors & Dot Product" },
    { courseFolder: "calciii", file: "3dspace.html", pageName: "3D Space", lessonName: "3D Space, Vectors & Dot Product" },
    { courseFolder: "calciii", file: "planes.html", pageName: "Planes & Spheres", lessonName: "3D Space, Vectors & Dot Product" },
    { courseFolder: "calciii", file: "vectors.html", pageName: "Vectors", lessonName: "3D Space, Vectors & Dot Product" },
    { courseFolder: "calciii", file: "geogebraintro.html", pageName: "GeoGebra", lessonName: "3D Space, Vectors & Dot Product" },
    { courseFolder: "calciii", file: "dotproduct.html", pageName: "Dot Product", lessonName: "3D Space, Vectors & Dot Product" },
    { courseFolder: "calciii", file: "crossproduct.html", pageName: "Cross Product", lessonName: "Cross Product, Planes & Surfaces" },
    { courseFolder: "calciii", file: "lines.html", pageName: "Lines & Planes", lessonName: "Cross Product, Planes & Surfaces" },
    { courseFolder: "calciii", file: "geogebravectors.html", pageName: "GeoGebra", lessonName: "Cross Product, Planes & Surfaces" },
    { courseFolder: "calciii", file: "surfaces.html", pageName: "Surfaces", lessonName: "Cross Product, Planes & Surfaces" },
    { courseFolder: "calciii", file: "curves.html", pageName: "Curves", lessonName: "Curves, Calculus, Length & Curvature" },
    { courseFolder: "calciii", file: "vectorcalculus.html", pageName: "Calculus", lessonName: "Curves, Calculus, Length & Motion" },
    { courseFolder: "calciii", file: "geogebracurves.html", pageName: "GeoGebra", lessonName: "Curves, Calculus, Length & Motion" },
    { courseFolder: "calciii", file: "arclength.html", pageName: "Arc Length", lessonName: "Curves, Calculus, Length & Motion" },
    { courseFolder: "calciii", file: "curvature.html", pageName: "Curvature", lessonName: "Curves, Calculus, Length & Motion" },
    { courseFolder: "calciii", file: "motion.html", pageName: "Motion", lessonName: "Curves, Calculus, Length & Motion" },
    { courseFolder: "calciii", file: "tnb.html", pageName: "Computing TNB", lessonName: "Curves, Calculus, Length & Motion" },
    { courseFolder: "calciii", file: "functions.html", pageName: "Functions", lessonName: "Functions & Limits" },
    { courseFolder: "calciii", file: "limits.html", pageName: "Limits", lessonName: "Functions & Limits" }
];


// Master Orchestration Event Loop
document.addEventListener("DOMContentLoaded", () => {
    const indexContainer = document.getElementById("course-index-container");
    
    if (indexContainer) {
        // If on the root directory index dashboard, handle the landing links grid
        buildCourseIndexDirectory(indexContainer);
    } 
    // The loadStickyTopNav and initializeTocDropdownController are now securely triggered inside site-ux.js to ensure perfect layout timing.
});



// ==========================================================================
// 2. Build the Index page directory of lessons organized by course
// ==========================================================================
function buildCourseIndexDirectory(container) {
    let html = "";
    const uniqueCourses = [...new Set(SiteMap.map(item => item.courseFolder))];

    uniqueCourses.forEach(course => {
        const courseItems = SiteMap.filter(item => item.courseFolder === course);

        let displayCourseTitle = course.toUpperCase();
        if (course.toLowerCase() === "172" || course.toLowerCase() === "trig") displayCourseTitle = "Trigonometry";
        if (course.toLowerCase() === "calciii") displayCourseTitle = "Calculus III";

        html += `<section class="course-section">`;
        html += `<h2>${displayCourseTitle} Modules</h2>`;

        // LESSON GROUPING FIX: Gather unique lesson names instead of folders
        const uniqueLessons = [...new Set(courseItems.map(item => item.lessonName))];

        uniqueLessons.forEach(lessonName => {
            const lessonPages = courseItems.filter(item => item.lessonName === lessonName);

            if (lessonPages.length > 0) {
                // Link straight to the first HTML file designated in this lesson group cluster
                const firstPage = lessonPages[0];
                const localLaunchUrl = `${firstPage.courseFolder}/${firstPage.file}`;

                html += `<a href="${localLaunchUrl}" class="lesson-link">${lessonName}</a>`;
            }
        });

        html += `</section>`;
    });

    container.innerHTML = html;
}



// ==========================================================================
// 3. Load the navigation menu items in the sticky menu at the top of the page
// ==========================================================================
function loadStickyTopNav() {
    const navContainer = document.getElementById("mytopnavmenu");
    if (!navContainer) return;

    // 1. Isolate both the parent course folder AND the filename from your browser's path
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    let currentCourseFolder = "";
    let currentFile = "home.html"; // Default fallback if no file is present

    if (pathSegments.length > 0) {
        // Grab the absolute last string segment as the filename
        const lastSegment = pathSegments[pathSegments.length - 1];
        if (lastSegment.endsWith(".html")) {
            currentFile = lastSegment;
            // Grab the segment right before it as the active parent course folder
            if (pathSegments.length >= 2) {
                currentCourseFolder = pathSegments[pathSegments.length - 2];
            }
        }
    }

    // Match the active page by pairing BOTH the folder name and the filename together.
    const currentLesson = SiteMap.find(item =>
        item.file.toLowerCase() === currentFile.toLowerCase() &&
        item.courseFolder.toLowerCase() === currentCourseFolder.toLowerCase()
    );

    if (!currentLesson) {
        console.warn("Current file position could not be uniquely verified inside the SiteMap registry.");
        return;
    }

    // 2. TARGET DOM TEXT INJECTIONS
    // NEW: Automatically injects the pageName directly into the browser tab <title> element
    if (currentLesson) {
        // document.title = `${currentLesson.pageName} | M4thG33x`;
        document.title = currentLesson.pageName;
    }
    // Populates the header banner with the folder-shared module title
    const subtitleEl = document.getElementById("subtitle");
    if (subtitleEl) subtitleEl.innerHTML = currentLesson.lessonName;
    // Populates the main body header with the specific page's custom name
    const bodyHeaderTop = document.getElementById("top");
    if (bodyHeaderTop) bodyHeaderTop.innerHTML = currentLesson.pageName;
    // Populates your Table of Contents top heading element with the specific page name
    const tocHeaderTop = document.getElementById("toc-top");
    if (tocHeaderTop) tocHeaderTop.innerHTML = currentLesson.pageName;

    // Every lesson page sits exactly 1 folder level deep from the site root
    const relativeRootPrefix = "../";

    // TIMELINE GROUPING FILTER: Gather peers sharing this courseFolder and specific lessonName
    const currentLessonTimeline = SiteMap.filter(item =>
        item.courseFolder.toLowerCase() === currentLesson.courseFolder.toLowerCase() &&
        item.lessonName.toLowerCase() === currentLesson.lessonName.toLowerCase()
    );

    let html = "";

    // 3. Assemble horizontal layout menu links
    currentLessonTimeline.forEach(page => {
        if (page === currentLesson) {
            html += `<span class="active" aria-current="page">${page.pageName}</span>`;
        } else {
            let computedUrl = `${relativeRootPrefix}${page.courseFolder}/${page.file}`;
            html += `<a href="${computedUrl}">${page.pageName}</a>`;
        }
    });

    // Append search input block code
    html += `<div class="nav-search-container">
                <input type="search" id="coursesearch" class="search-input-field" 
                       placeholder="Search this course..." 
                       aria-label="Search pages in this course"
                       autocomplete="off" 
                       autocorrect="off">
                <button type="button" id="searchsubmit" class="search-submit-btn" aria-label="Submit Search"><i class="fa fa-search"></i></button>
             </div>`;

    // Append mobile menu hamburger vector bars toggler trigger icon
    html += `<a href="javascript:void(0);" class="icon" onclick="navResp()" aria-label="Toggle mobile menu">
                <div class="hamburger-toggle">
                    <span class="bar-line"></span>
                    <span class="bar-line"></span>
                    <span class="bar-line"></span>
                </div>
             </a>`;

    navContainer.innerHTML = html;

    // Trigger local client text parser immediately following code generation
    initializeLocalCourseSearch(currentLesson, relativeRootPrefix);
}


// Make the sticky nav menu responsive for smaller screens
function navResp() {
    const x = document.getElementById("mytopnavmenu");
    if (x) x.classList.toggle("responsive");
}


// ==========================================================================
// 4. THE FLATTENED SEARCH ENGINE: ROOT DROPDOWN BOX SETUP
// ==========================================================================
function initializeLocalCourseSearch(currentLesson, relativeRootPrefix) {
    const searchContainer = document.querySelector(".nav-search-container");
    const searchInput = document.getElementById("coursesearch");
    if (!searchInput || !searchContainer) return;

    // Create the results list drawer automatically if it's missing from the page
    let resultsDropdown = document.getElementById("search-results-box");
    if (!resultsDropdown) {
        resultsDropdown = document.createElement("ul");
        resultsDropdown.id = "search-results-box";
        resultsDropdown.className = "search-results-list";
        resultsDropdown.style.display = "none";

        // Dynamic W3C Live accessibility markers
        resultsDropdown.setAttribute("role", "region");
        resultsDropdown.setAttribute("aria-live", "polite");
        searchContainer.appendChild(resultsDropdown);
    }

    let searchTimeout = null;

    // Isolate subdirectory segments to prevent broken paths on GitHub Pages
    const hostPathSegments = window.location.pathname.split('/').filter(Boolean);
    let pathSubfolderPrefix = "/";
    if (window.location.hostname.includes("github.io") && hostPathSegments.length > 0) {
        pathSubfolderPrefix = `/${hostPathSegments[0]}/`;
    }

    async function scanCoursePageContents() {
        const query = searchInput.value.trim().toLowerCase();

        if (query.length < 2) {
            resultsDropdown.innerHTML = "";
            resultsDropdown.style.display = "none";
            return;
        }

        // Enforce a strict course folder matching rule so search operations 
        // stay isolated entirely inside the active parent course directory context
        const coursePages = SiteMap.filter(item =>
            item.courseFolder.toLowerCase() === currentLesson.courseFolder.toLowerCase()
        );

        let matchedItemsHtml = "";

        const fetchPromises = coursePages.map(async (page) => {
            try {
                // Generates rock-solid absolute root relative link references for fetching
                const absoluteFetchUrl = `${pathSubfolderPrefix}${page.courseFolder}/${page.file}`;

                const response = await fetch(absoluteFetchUrl);
                if (!response.ok) return null;

                const rawHtmlText = await response.text();

                // Load raw source code lines into an isolated virtual parsing document tree
                const parser = new DOMParser();
                const doc = parser.parseFromString(rawHtmlText, 'text/html');
                const contentNode = doc.querySelector('.lesson-body') || doc.querySelector('main') || doc.body;

                const cleanContentClone = contentNode.cloneNode(true);

                // Clear out website navigation bars, site menus, and page header containers
                const tocNav = cleanContentClone.querySelector('.lesson-page-toc');
                if (tocNav) tocNav.remove();
                const hiddenHeader = cleanContentClone.querySelector('.page-header');
                if (hiddenHeader) hiddenHeader.remove();
                const hiddenMenu = cleanContentClone.querySelector('.topnavmenu');
                if (hiddenMenu) hiddenMenu.remove();

                // Fully eliminate styling nodes or background script layers from text match evaluations
                const embeddedScripts = cleanContentClone.querySelectorAll('script:not([type*="mathjax"]), style, noscript, svg, textarea');
                embeddedScripts.forEach(el => el.remove());

                const textBlocks = cleanContentClone.querySelectorAll('p, li, h1, h2, h3, h4, .math-block, div');
                let pageSnippetsHtml = "";

                for (let block of textBlocks) {
                    const blockTextLower = block.textContent.toLowerCase();

                    if (blockTextLower.includes(query) && block.innerHTML.trim().length > 0) {
                        if (block.tagName === 'DIV' && (block.querySelector('p') || block.querySelector('li'))) continue;

                        // CLASS EXCLUSION COOPERATOR GUARD: Skips specific container elements completely
                        // Replace 'div.YOUR-CLASS-NAME-HERE' with whichever container class you want to mask out
                        // Use comma separated list for multiple classes
                        // if (block.closest('div.YOUR-CLASS-NAME-HERE')) continue;
                        if (block.closest('div.response')) continue;

                        const foundMatchNode = block.cloneNode(true);

                        // Walk deep text tree branches exclusively to bypass internal mathematical tag properties
                        const walker = document.createTreeWalker(foundMatchNode, NodeFilter.SHOW_TEXT, null, false);
                        const nodesToReplace = [];

                        let textNode;
                        while (walker.nextNode()) {
                            textNode = walker.currentNode;
                            if (textNode.parentNode.tagName === 'SCRIPT' || textNode.parentNode.tagName === 'STYLE') continue;
                            if (textNode.nodeValue.toLowerCase().includes(query)) nodesToReplace.push(textNode);
                        }

                        nodesToReplace.forEach(node => {
                            const originalValue = node.nodeValue;
                            const lowerValue = originalValue.toLowerCase();
                            const fragment = document.createDocumentFragment();
                            let currentIndex = 0;
                            let queryPos = lowerValue.indexOf(query, currentIndex);

                            while (queryPos !== -1) {
                                if (queryPos > currentIndex) {
                                    fragment.appendChild(document.createTextNode(originalValue.substring(currentIndex, queryPos)));
                                }
                                const mark = document.createElement('mark');
                                mark.className = 'search-highlight';
                                mark.textContent = originalValue.substring(queryPos, queryPos + query.length);
                                fragment.appendChild(mark);

                                currentIndex = queryPos + query.length;
                                queryPos = lowerValue.indexOf(query, currentIndex);
                            }
                            if (currentIndex < originalValue.length) {
                                fragment.appendChild(document.createTextNode(originalValue.substring(currentIndex)));
                            }
                            node.parentNode.replaceChild(fragment, node);
                        });

                        // SMART VIEWPORT SCROLL JUMP LOCATION MAKER (Pure Text Fragments Protocol Built-in)
                        let scrollHashSuffix = "";
                        if (block.id) {
                            scrollHashSuffix = `#${block.id}`;
                        } else {
                            const parentSection = block.closest('section, div[id], article');
                            if (parentSection && parentSection.id) scrollHashSuffix = `#${parentSection.id}`;
                        }

                        if (!scrollHashSuffix) {
                            const cleanPlainTextSample = block.textContent.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
                            const textWordsArray = cleanPlainTextSample.split(' ');
                            const queryWordIndex = textWordsArray.findIndex(w => w.toLowerCase().includes(query));

                            let targetTextWindow = "";
                            if (queryWordIndex !== -1) {
                                const startWordPos = Math.max(0, queryWordIndex - 1);
                                targetTextWindow = textWordsArray.slice(startWordPos, startWordPos + 5).join(' ');
                            } else {
                                targetTextWindow = textWordsArray.slice(0, 5).join(' ');
                            }
                            if (targetTextWindow) scrollHashSuffix = `#:~:text=${encodeURIComponent(targetTextWindow)}`;
                        }

                        // FLAT JUMP ROUTING LOCK: Assembles absolute direct links pointing exactly to that specific sentence section
                        const finalRelativePath = `${relativeRootPrefix}${page.courseFolder}/${page.file}${scrollHashSuffix}`;
                        pageSnippetsHtml += `<li>
                                                <a href="${finalRelativePath}">
                                                    <div class="result-title">${page.pageName}</div>
                                                    <div class="result-snippet">${foundMatchNode.innerHTML.trim()}</div>
                                                </a>
                                             </li>`;
                    }
                }

                if (!pageSnippetsHtml) {
                    const fallbackText = cleanContentClone.textContent.replace(/\s+/g, ' ').trim();
                    const queryIndex = fallbackText.toLowerCase().indexOf(query);
                    if (queryIndex !== -1) {
                        const snippetStart = Math.max(0, queryIndex - 60);
                        const snippetEnd = Math.min(fallbackText.length, queryIndex + query.length + 80);
                        let fallbackSnippetText = fallbackText.substring(snippetStart, snippetEnd);

                        if (snippetStart > 0) fallbackSnippetText = "..." + fallbackSnippetText.substring(fallbackSnippetText.indexOf(" ") + 1);
                        if (snippetEnd < fallbackText.length) fallbackSnippetText = fallbackSnippetText.substring(0, fallbackSnippetText.lastIndexOf(" ")) + "...";

                        const regex = new RegExp(`(${query})`, "gi");
                        const highlightedFallback = fallbackSnippetText.replace(regex, `<mark class="search-highlight">$1</mark>`);

                        const finalRelativePath = `${relativeRootPrefix}${page.courseFolder}/${page.file}`;
                        pageSnippetsHtml = `<li>
                                                <a href="${finalRelativePath}">
                                                    <div class="result-title">${page.pageName}</div>
                                                    <div class="result-snippet">${highlightedFallback}</div>
                                                </a>
                                             </li>`;
                    }
                }

                return pageSnippetsHtml;
            } catch (err) {
                console.error(`Unable to scrape index content parameters for ${page.file}:`, err);
            }
            return null;
        });

        const completedResults = await Promise.all(fetchPromises);
        matchedItemsHtml = completedResults.filter(Boolean).join('');

        if (matchedItemsHtml) {
            resultsDropdown.innerHTML = matchedItemsHtml;
            resultsDropdown.style.display = "block";

            // MATHJAX FORCE SCAN SWITCH: Triggers math layouts parsing inside our generated results lists card
            if (window.MathJax && typeof MathJax.typesetPromise === "function") {
                MathJax.typesetPromise([resultsDropdown]).catch((err) => console.log("MathJax Typeset failed:", err));
            }
        } else {
            resultsDropdown.innerHTML = `<li class="no-results-msg">No text matches found inside this course.</li>`;
            resultsDropdown.style.display = "block";
        }
    }

    searchInput.addEventListener("input", () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(scanCoursePageContents, 300);
    });

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            resultsDropdown.innerHTML = "";
            resultsDropdown.style.display = "none";
        }
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest('.nav-search-container')) resultsDropdown.style.display = "none";
    });

    searchInput.addEventListener("focus", () => {
        if (resultsDropdown.innerHTML !== "" && searchInput.value.trim().length >= 2) resultsDropdown.style.display = "block";
    });
} // Cleans and safely terminates the entire initializeLocalCourseSearch function




// ==========================================================================
// 5. ACCESSIBLE KEYBOARD TOC DROPDOWN ACTION CONTROLLERS (Unchanged)
// ==========================================================================
function initializeTocDropdownController() {
    const parentContainer = document.querySelector(".lesson-page-toc");
    const dropBtn = document.querySelector(".lesson-page-toc .dropbtn");
    const dropdownContent = document.querySelector(".lesson-page-toc .dropdown-content");

    if (!parentContainer || !dropBtn || !dropdownContent) return;

    dropBtn.setAttribute("aria-haspopup", "true");
    dropBtn.setAttribute("aria-expanded", "false");

    function openMenu() {
        dropBtn.setAttribute("aria-expanded", "true");
        dropdownContent.classList.add("show-menu");
        parentContainer.classList.add("menu-open");
    }

    function closeMenu() {
        dropBtn.setAttribute("aria-expanded", "false");
        dropdownContent.classList.remove("show-menu");
        parentContainer.classList.remove("menu-open");
    }

    function handleKeyboardToggle(event) {
        const isExpanded = dropBtn.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Toggle menu open/close when keyboard Enter or Spacebar is activated
    dropBtn.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            handleKeyboardToggle(event);
        }
    });

    // Close list panels instantly if hardware Escape key triggers
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && dropBtn.getAttribute("aria-expanded") === "true") {
            closeMenu();
            dropBtn.focus();
        }
    });

    // Automatically collapse list panels if a pointer mouse moves away from widget boundaries
    parentContainer.addEventListener("mouseleave", () => {
        closeMenu();
    });
}
