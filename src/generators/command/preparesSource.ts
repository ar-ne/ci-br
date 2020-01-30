import Command from "./command";

export default class PreparesSource {
    private readonly _clone: Command;
    private readonly _cd: Command;
    private readonly _checkout: Command;

    constructor(repo: string) {
        this._clone = new Command('git');
        this._clone.addArg('clone', '--depth=50', '--branch=master');
        this._clone.addArg(`https://github.com/${repo}.git`, `${repo}`);

        this._cd = new Command('cd').addArg(repo);
        this._checkout = new Command('git').addArg('checkout', '-qf');
    }

    get clone(): string {
        return this._clone.cmd;
    }

    get cd(): string {
        return this._cd.cmd;
    }

    get checkout(): string {
        return this._checkout.cmd;
    }

    toArray() {
        return [this.clone, this.cd, this.checkout];
    }
}