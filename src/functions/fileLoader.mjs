import { promisify } from "util";
import glob from "glob";

const proGlob = promisify(glob);

async function loadFiles(dirName) {
    const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/src/${dirName}/**/*.{js,mjs}`);
    // Uncomment for non-mjs files
    // Files.forEach((file) => delete require.cache[require.resolve(file)]);
    return Files;
}

export { loadFiles };