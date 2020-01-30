import TravisCI from "../../CI/travis-ci";
import * as util from '../../utils/utils';
import Configurations from "../../utils/configurations";

const TravisCIGen = () => {
    console.log("load configurations.");
    const travis = new TravisCI(new Configurations());
    util.writeFile('.travis.yml', travis.YAMLConfig());
};

export = TravisCIGen;