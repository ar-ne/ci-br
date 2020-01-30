import {Configuration} from "../../utils/configurations";
import setting from "../../utils/settings";
import Command from "./command";
import {join} from "path";

export default class Dpl extends Command {
    constructor(config: Configuration, version: number = setting.dpl.version) {
        super('dpl');
        const {release: dpl, repo} = config;
        switch (version) {
            case 1:
                this.addArg(`${dpl.provider}`);
                this.addArg(`--token=${setting.env.runtime.GITHUB_TOKEN}`);
                this.addArg(`--repo=${dpl.on.repo}`);
                dpl.file.forEach(f => this.addArg(`--file=${join(repo.owner, repo.name, f)}`));
                if (dpl.release_number !== undefined && dpl.release_number)
                    this.addArg(`--release_number=${dpl.release_number}`);
                if (dpl.file_glob !== undefined && dpl.file_glob)
                    this.addArg('--file_glob');
                if (dpl.overwrite !== undefined && dpl.overwrite)
                    this.addArg('--overwrite');
                if (dpl.cleanup !== undefined && dpl.cleanup)
                    this.addArg('--skip_cleanup=true');
                break;

            case 2:
                this.addArg(dpl.provider);
                this.addArg('--token', setting.env.runtime.GITHUB_TOKEN);
                this.addArg('--repo', dpl.on.repo);
                dpl.file.forEach(f => this.addArg('--file', join(repo.owner, repo.name, f)));
                if (dpl.release_number !== undefined && dpl.release_number)
                    this.addArg('--release_number', dpl.release_number);
                if (dpl.tag_name !== undefined && dpl.tag_name)
                    this.addArg('--tag_name', dpl.tag_name);
                if (dpl.file_glob !== undefined && dpl.file_glob)
                    this.addArg('--file_glob');
                if (dpl.overwrite !== undefined && dpl.overwrite)
                    this.addArg('--overwrite');
                if (dpl.cleanup !== undefined && dpl.cleanup)
                    this.addArg('--cleanup');
                break;
            default:
                throw new Error("dpl version not specified");
        }
    }
}