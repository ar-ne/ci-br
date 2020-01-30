export default class Command {
    constructor(command: string) {
        this._cmd = [command];
    }

    private _cmd: string[];

    get cmd(): string {
        return this._cmd.join(' ');
    }

    public addArg(...items: (any | ConcatArray<any>)[]): Command {
        this._cmd.push(...items);
        return this;
    }
}