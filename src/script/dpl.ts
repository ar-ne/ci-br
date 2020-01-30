import settings from "../utils/settings";
import Configurations from "../utils/configurations";
import {isEqual} from "lodash";
import {execSync} from "child_process";
import Dpl from "../generators/command/dpl";

const repo = JSON.parse(String(process.env[settings.env.config.repo]));
const configurations = new Configurations();
configurations.config.forEach(config => {
    if (isEqual(repo, config.repo)) {
        const dpl = new Dpl(config);
        console.log(dpl.cmd);
        execSync(dpl.cmd);
    }
});