# EESA-website

台大電機系學會共同網站

## Install

```sh
git clone git@github.com:NTUEEInfoDep/EESA-website.git
yarn install
# setup .env.development
```

## Run Commands

### `yarn run dev`

Run in the project locally.

### `yarn run build`

Run a production build into `./public`. The result is ready to be put on any static hosting you prefer.

### `yarn run deploy`

Run a production build into `./public` and publish the site to GitHub pages.

### `yarn run cleanup-repository`

Removes all dependencies, scripts and data from the installation script.

## Roadmap

- [make the starter completely responsive](https://github.com/contentful-userland/gatsby-contentful-starter/issues/2)
- [include tags](https://github.com/contentful-userland/gatsby-contentful-starter/issues/3)
- [support traced placeholders](https://github.com/contentful-userland/gatsby-contentful-starter/issues/4)
- [add i18n](https://github.com/contentful-userland/gatsby-contentful-starter/issues/6)

## Other resources

- Tutorial video series ["Building a blazing fast website with GatsbyJS and Contentful"](https://www.youtube.com/watch?v=Ek4o40w1tH4&list=PL8KiuH6vpACV-F7jXribe4YveGBhBeG9A) by @Khaledgarbaya
