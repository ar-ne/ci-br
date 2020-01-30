import {Item} from "../CI/travis-ci";
import paths from './paths';
import {readdirSync, readFileSync} from "fs";
import {join, resolve} from "path";
import _ from 'lodash'

export interface Configuration {
    repo: {
        owner: string
        name: string
    }
    build: {
        travis: Item
    }
    release: {
        provider: string
        file: string[]
        file_glob?: boolean
        cleanup?: boolean
        overwrite?: boolean
        tag_name?: string
        release_number?: string
        on: {
            repo: string
        }
    }
}

export default class Configurations {
    constructor(dir: string = paths.config) {
        dir = resolve(dir);
        const files = _.pull(readdirSync(dir), ...paths.ignored_files);
        console.log(`config found: ${files}`);
        files.forEach((f) => {
            const content = readFileSync(join(dir, f)).toString();
            this._config.push(JSON.parse(content));
        })
    }

    private _config: Configuration[] = [];

    get config(): Configuration[] {
        return this._config;
    }

    travisConfigs() {
        return this._config.map(v => v.build.travis);
    }
}