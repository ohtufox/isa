exports.getHtmlFolder = getHtmlFolder;

const HTML_FOLDER = '/tests/html';

function getHtmlFolder(testModuleUri) {
    let rootFolder = getRootFolder(testModuleUri);
    let htmlFolder = rootFolder + HTML_FOLDER;
    return htmlFolder;
}

function getRootFolder(moduleUri) {
    let testHelperUri = moduleUri;
    let testFolderPattern = '/tests/';
    let rootFolderLeftovers = testHelperUri.substr(testHelperUri.lastIndexOf(testFolderPattern));
    let rootFolder = testHelperUri.replace(rootFolderLeftovers, '');
    return rootFolder;
}
