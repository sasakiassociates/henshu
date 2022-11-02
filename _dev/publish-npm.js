const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const runCommand = async (command) => {
    console.log('> ' + command);
    return;
    // const {stdout, stderr} = await exec(command);
    // if (stderr) throw stderr;
    // return stdout;
};

const updatePackageJsonPre = async (packageJson) => {
    const packageStr = await fs.promises.readFile(packageJson);
    const packageData = JSON.parse(packageStr);
    if (packageData.unpublishSettings) {
        return;//nothing to do - it's already in the correct state and we don't want to overwrite the unpublishSettings
    }
    if (packageData.publishSettings) {
        packageData.unpublishSettings = {};
        Object.keys(packageData.publishSettings).forEach((k) => {
            if (packageData[k] !== packageData.publishSettings[k]) {
                if (packageData[k]) packageData.unpublishSettings[k] = packageData[k];
                packageData[k] = packageData.publishSettings[k];
            }
        });
    }
    await fs.promises.writeFile(packageJson, JSON.stringify(packageData, null, 2));
};

const updatePackageJsonPost = async (packageJson) => {
    const packageStr = await fs.promises.readFile(packageJson);
    const packageData = JSON.parse(packageStr);
    if (packageData.publishSettings) {
        Object.keys(packageData.publishSettings).forEach((k) => {
            delete packageData[k];
        });
    }
    if (packageData.unpublishSettings) {
        Object.keys(packageData.unpublishSettings).forEach((k) => {
            packageData[k] = packageData.unpublishSettings[k];
        });
        delete packageData.unpublishSettings;
    }
    await fs.promises.writeFile(packageJson, JSON.stringify(packageData, null, 2));
};


const publish = async () => {
    let baseDir = path.resolve(__dirname, '../');
    let packageJson = baseDir+'/package.json';
    await updatePackageJsonPre(packageJson);
    await runCommand('npx rollup -c');
    await runCommand('npm publish');
    await updatePackageJsonPost(packageJson);
};

publish();
