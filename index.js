const fs = require("fs").promises;
const path = require("path");

async function scanInner(dir) {
    const result = { files: [], dirs: [] };
    const content = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of content) {
        if (entry.isDirectory()) {
            result.dirs.push(path.join(dir, entry.name));
        } else if (entry.isFile()) {
            result.files.push(path.join(dir, entry.name));
        }
    }
    return result;
}

async function scanDir(dir) {
    const result = await scanInner(dir);
    do {
        const dirs = result.dirs;
        result.dirs = [];
        await Promise.all(
            dirs.map(async (a) => {
                const sub = await scanInner(a);
                result.files.push(...sub.files);
                result.dirs.push(...sub.dirs);
            })
        );
    } while (result.dirs.length !== 0);
    return result.files;
}

exports.scan = scanDir;