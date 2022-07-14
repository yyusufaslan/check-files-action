const core = require('@actions/core');
const github = require('@actions/github');
const io = require('@actions/io');
const fs = require('fs');


async function checkFileExists(filePath) {
    return fs.promises.access(filePath)
        .then(() => {
            core.info(`File ${filePath} exists`);
            return true;
        })
        .catch(() => {
            core.setFailed(`File ${filePath} is mandatory`);
            return false;
        });
}

async function checkFileExists1() {
    let filePath = await io.which('ExchangeRepository', true)

    return fs.promises.access(filePath)
        .then(() => {
            core.info(`File ${filePath} exists`);
            return true;
        })
        .catch(() => {
            core.setFailed(`File ${filePath} is mandatory`);
            return false;
        });
}

async function checkFileExists2() {
    fs.readdir('/', (err, files) => {
        if (err)
            console.log(err);
        else {
            console.log("\nCurrent directory filenames:");
            files.forEach(file => {
                console.log(file);
            })
        }
    })
}

async function checkFileStartsWithHeader(filePath) {
    return fs.promises.readFile(filePath, 'utf8').then(fileContent => {
        // remove all empty lines ad the beginning of the file        fileContent = fileContent.replace(/^\s*\n/gm, '');
        core.info(`fileContent`);
    });
}


(
    async () => {
        try {
            checkFileExists1();
            checkFileStartsWithHeader("pom.xml");
            checkFileExists2();
            checkFileExists("README.md");

        } catch (error) {
            core.setFailed(error.message);
        }
    }

)();