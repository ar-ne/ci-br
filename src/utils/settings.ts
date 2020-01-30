import paths from "./paths";

export interface Setting {
    env: {
        runtime: {
            [GITHUB_TOKEN: string]: string
        }
        config: {
            repo: string
        }
    }
    delete_old: boolean
    dpl: {
        version: number
    }
    ci: {
        [key: string]: any
    }
}

class Settings {
    constructor() {
        const {env} = this._setting;
        const {runtime, config} = env;
        const ci_env = process.env[config.repo] !== undefined;
        if (process.env.CI || ci_env) {
            for (let envKey in runtime) {
                let tmp = process.env[envKey];
                if (tmp === undefined)
                    throw new Error(`${envKey} not defined in environment variables.`);
                runtime[envKey] = tmp;
            }
        }
    }

    private _setting = require(paths.setting) as Setting;

    get setting(): Setting {
        return this._setting;
    }
}

export default new Settings().setting;