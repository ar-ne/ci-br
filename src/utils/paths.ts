import {join} from 'path';

export const root = process.cwd();
export default {
    root: root,
    config: join(root, 'configurations'),
    setting: join(root, 'configurations', 'setting.json'),
    ignored_files: ['setting.json']
};
