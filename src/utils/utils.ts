import {writeFileSync} from "fs";
import {join} from "path";
import {root} from "./paths";

export const writeFile = (filename: string, content: string): void => {
    writeFileSync(join(root, filename), content);
};