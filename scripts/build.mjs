import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(scriptDir);
const outputDir = join(projectRoot, "public");

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

cpSync(join(projectRoot, "index.html"), join(outputDir, "index.html"));

for (const folder of ["dist", "src/css", "src/imagens", "src/sons"]) {
  const source = join(projectRoot, folder);
  const destination = join(outputDir, folder);

  if (existsSync(source)) {
    cpSync(source, destination, { recursive: true });
  }
}
