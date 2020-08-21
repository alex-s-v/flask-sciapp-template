function transpose(arr) {
    return arr[0].map((_, i) => arr.map(row => row[i]));
}

function createCSVFile(data, labels, transp = false) {
    if (transp) { data = transpose(data); }
    if (labels) { data.unshift(labels); }
    const csvContent = data.map(e => e.join(",")).join("\n");
    const csvFile = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    return csvFile;
}

function uploadFiles(selector, onload, onerror) {
    let reader;
    document.querySelector(selector).files.forEach(file => {
        reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => onload(reader.result);
        reader.onerror = () => onerror(reader.error);
    });
}

function createDownloadFileLink(file, filename) {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    return link;
}

function getCBValue(cbname) {
    document.querySelectorAll(`input[name="${cbname}"]`.forEach(el => {
        if (el.checked) { return el.value; }
    }));
}

