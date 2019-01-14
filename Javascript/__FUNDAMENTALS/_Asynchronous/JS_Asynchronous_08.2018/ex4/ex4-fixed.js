function fakeAjax(url, cb) {
    const fake_responses = {
        'file1': 'The first text',
        'file2': 'The middle text',
        'file3': 'The last text',
    };
    const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

    console.log('Requesting: ' + url);

    setTimeout(function() {
        cb(fake_responses[url]);
    }, randomDelay);
}

function output(text) {
    console.log(text);
}

// **************************************

function getFile(file) {
    return new Promise(function(resolve) {
        fakeAjax(file, resolve);
    });
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.
['file1', 'file2', 'file3']
    .map(function(currentValue, index, array) {
        return getFile(currentValue);
    })
    .reduce(function(all, itePromise, array) {
        return all.then(function() {
            return itePromise;
        }).then(output);
    }, Promise.resolve()) // fulfilled promise to start chain
    .then(function() {
        output('Complete!');
    });
