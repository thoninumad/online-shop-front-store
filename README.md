# Online Shop Front Store

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Deployment

We're using Vercel CLI to deploy the App. The process are relatively easy.

First install the Vercel CLI globally on your machine:

```
npm i -g vercel
```

Don't forget to clone the repo to your local machine:

```
git clone <this repo>
```

Then deploy the app (make sure you're inside the app root directory)

```
vercel deploy --prod
```

**Note:** Say yes to all Vercel CLI prompt. Make sure you have a Vercel account connected with the CLI.

Then, you're done deploying 🎉

### Configuring Environment Variables

Configuring environment variables can be done on Vercel dashboard. Make sure you read this first:
https://vercel.com/docs/environment-variables

These are the default env:

```
VUE_APP_NAME=STP OTOMOTIF ITS
VUE_APP_BACKEND_URL= <change_to_your_api_endpoint>
VUE_APP_API_URL= <change_to_your_api_endpoint>
```

### DNS Settings for Custom Domain

Configuring your Vercel app to your domain is easy. Read the documentation provided by Vercel here: https://vercel.com/docs/custom-domains
