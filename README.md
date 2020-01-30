#Build & Release with CI

#Usage
```
git clone https://github.com/ar-ne/ci-br
yarn
yarn gen
```

#configurations/setting.json
```
{
  "delete_old": true,                 //delete old releases ?
  "dpl": {
    "version": 2                      //travis-ci dpl version
  },
  "env": {
    "runtime": {
      "GITHUB_TOKEN": "GITHUB_TOKEN"  //env var's name,not value,
    },                                //set that value in ci's setting
    "config": {
      "repo": "CI_REPOSITORY"
    }
  },
  "ci": {                             //extra setting for ci config file
    "travis": {
      "branches": {
        "except": [
          "/^untagged/"
        ]
      }
    }
  }
}
```

#configurations
```
{
  "repo": {
    "owner": "",
    "name": ""
  },
  "build": {
    "travis": {
      "language": "",
      "os": "linux",
      "before_install": [],
      "install": [],
      "cache": "yarn"
    }
  },
  "release": {
    "provider": "releases",
    "file": [],
    "cleanup": false,
    "overwrite": true,
    "tag_name": "",
    "release_number": "",
    "on": {
      "repo": ""
    }
  }
}
```