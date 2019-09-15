---
title: Do i need the npm registry?
---

## Describing npm

npm is [several things](https://www.npmjs.com/about):
- a [company](https://www.npmjs.com/about)
- a [registry](https://registry.npmjs.org/)
- a [website](http://npmjs.com/)
- a [command-line tool (cli)](https://github.com/npm/cli/)

The **registry** is the core component: it's a big database with the packages and handling of user accounts, etc.
The **cli** is an open source command-line tool that allows to define the JS dependencies in a project, remember them in `package.json` and easily fetch the packages from the **registry**
The **website** provides a human-friendly way to browser through the packages in the **registry**. It provides a search feature among other things
The **company** hires people to maintain and improve the **registry**, the **cli**, the **website**. They also pay some bills for the hosting and bandwidth of the registry

Do i need all of these?


## A little feature

There is a little-known feature of npm-cli which is that [you can install packages directly from github](https://docs.npmjs.com/files/package.json#git-urls-as-dependencies) like so:

```sh
npm i github:DavidBruant/baredux
```

Here, the cli fetches the data **directly from github**

This also works with any git repo (public or **private**), so **any gitlab instance** if that's what you have. And **semver** is supported given you have the proper git tags set up. You can also target a specific branch or a specific commit.


### Benefits

- Hosting, storage and bandwidth can be as distributed as the internet (and not centrally managed and paid by the npm company)
- private packages if you already have private git repos
- less dependency to a centralized architecture
- traceability of source code down to the commit


### Opportunities

With something like [tink](https://blog.npmjs.org/post/178027064160/next-generation-package-management) which stores the package data in some shared read-only place in the computer, getting a new version from a git repo might be a matter of a `git fetch` which has the opportunity of being cheaper than downloading the full package of every new version

The package source code downloaded is exactly the source code found on github. This is unlike npm tarballs which differ from github source code and has led to [security vulnerabilities](https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident) in the past 


### Things that may be missed 

- `npm audit`. It's unclear how much it depends the centralization of npm. It probably can be made decentralized though
- search on the website. This is useful for packages discovery. It's currently based on npm being centralized architecture (single registry). But it wouldn't be crazy to create a distributed version


