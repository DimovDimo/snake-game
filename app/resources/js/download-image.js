const canvasIdConstant = "snake-game";
const imageTypeConstant = "image/png";
const fileNameIdConstant = "file-name";
const eventElementIdConstant = "download-image";
const eventListenerConstant = "click";
const linkElementConstant = "a";
const joinDatasetConstant = ":";

document.getElementById(eventElementIdConstant)
        .addEventListener(eventListenerConstant, download);

function download() {
    let link = createDownloadLink();
    setFileName(link);
    setImage(link);
    setDownloadUrl(link);
    linkClick(link);
}

function linkClick(link) {
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function setDownloadUrl(link) {
    let datasetDownload = [imageTypeConstant, link.download, link.href];
    link.dataset.downloadurl = datasetDownload.join(joinDatasetConstant);
}

function setImage(link) {
    let canvas = getCanvas();
    let image = canvas.toDataURL(imageTypeConstant);
    link.href = image;
}

function setFileName(link) {
	link.download = document.getElementById(fileNameIdConstant).value;
}

function getCanvas() {
	return document.getElementById(canvasIdConstant);
}

function createDownloadLink() {
	return document.createElement(linkElementConstant);
}