import YAML from "yaml";
import Configurations from "../utils/configurations";
import PreparesSource from "../generators/command/preparesSource";
import settings from "../utils/settings";
import {assign} from "lodash";

export interface Item {
    language: string
    os: string
    env?: string[]
    before_install?: string[]
    install?: string[]
    script?: string[]
    after_script?: string[]
    cache?: string

    [key: string]: any
}

export interface MainConfig {
    jobs: {
        include: Item[]
    }

    [key: string]: any
}

export default class TravisCI {
    constructor(configurations: Configurations) {
        configurations.config.forEach(config => {
            const {travis} = config.build;
            const {repo} = config;
            const preparesSource = new PreparesSource(`${repo.owner}/${repo.name}`);

            travis.before_install = travis.before_install !== undefined ? travis.before_install : [];
            travis.before_install.unshift(...preparesSource.toArray());
            travis.before_install.unshift(`gem install dpl${settings.dpl.version === 2 ? " --pre" : ""}`);
            travis.before_install.unshift("yarn");

            travis.after_script = travis.after_script !== undefined ? travis.after_script : [];
            travis.after_script.push('cd ..');
            travis.after_script.push('yarn dpl');
            travis.after_script.push('yarn ls');

            travis.env = travis.env !== undefined ? travis.env : [];
            travis.env.push(`${settings.env.config.repo}='${JSON.stringify(repo)}'`);
        });
        this._jsonConfig.jobs.include.push(...configurations.travisConfigs());
        const extra_setting = settings.ci["travis"];
        if (extra_setting !== undefined) {
            assign(this._jsonConfig, extra_setting);
        }
    }

    private _jsonConfig: MainConfig = {jobs: {include: []}} as MainConfig;

    get jsonConfig(): MainConfig {
        return this._jsonConfig;
    }

    YAMLConfig() {
        return YAML.stringify(this._jsonConfig);
    }
}


