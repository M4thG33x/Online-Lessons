// =====================================================================================
// Create the list of pages in the current folder for the dropdown menu
// Will check for local hosting or GitHub Pages

const lessonSitemap = [
    // MAT 172 Folder Files
    { folder: "LessonFolder/Space", file: "3dspace.html", name: "3D Space" },

    // MAT 273 Folder Files
    { folder: "LessonFolder/Vectors", file: "vectors.html", name: "Vectors" },
    { folder: "LessonFolder/Vectors", file: "dotproduct.html", name: "Dot Product" },
    { folder: "LessonFolder/Vectors", file: "crossproduct.html", name: "Cross Product" }
];

function loadDropdown() {
    const dropdownUl = document.getElementById("dynamic-dropdown-list");
    if (!dropdownUl) return;

    // 1. Get the current active file name (e.g., "vectors.html")
    const currentFile = window.location.pathname.split('/').pop();

    // 2. Find this file inside the sitemap matrix
    const currentLesson = lessonSitemap.find(lesson => lesson.file === currentFile);

    if (!currentLesson) {
        console.warn("This HTML file is not defined in the lessonSitemap array.");
        dropdownUl.innerHTML = "<li><a href='#'>No other lessons</a></li>";
        return;
    }

    // 3. Extract the folder path of the active page (e.g., "LessonFolder/Vectors")
    const currentFolder = currentLesson.folder;

    // 4. Gather all companion files sharing this exact folder matching group
    const localLessons = lessonSitemap.filter(lesson => lesson.folder === currentFolder);

    // 5. Calculate how many steps back (../) are required to reach the root
    // "LessonFolder/Vectors" has 2 folders, so it requires "../../"
    const folderDepth = currentFolder.split('/').length;
    const relativeRootPrefix = "../".repeat(folderDepth);

    // 6. Generate perfectly built, cross-platform relative link trees
    dropdownUl.innerHTML = localLessons
        .map(lesson => {
            // Rebuilds path to match: ../../LessonFolder/Vectors/vectors.html
            const perfectlyCalculatedUrl = `${relativeRootPrefix}${lesson.folder}/${lesson.file}`;
            return `<li><a href="${perfectlyCalculatedUrl}">${lesson.name}</a></li>`;
        })
        .join('');
}

document.addEventListener("DOMContentLoaded", loadDropdown);
