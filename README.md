# Aniless Website
Training project for the Adobe Experience Manager Edge Delivery System. The project is a website for a fictional app called Aniless that should motivate people to consume less animal products. 

## Content source for authoring
https://drive.google.com/drive/folders/1VUc6n35NkeiuAj3Az6Hx5hnYO-ygGAQ9?usp=drive_link

## Environments
- Preview: https://main--gvb-heureka--vass-ch.aem.page/de/
- Live: https://main--gvb-heureka--vass-ch.aem.live/de/

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
2. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)

## Use AEM headless functionality
1. Before using the AEM Headless functionality, ensure that the sandbox environment is not in Hibernate status. If it is, then de-hibernate it.
2. To retrieve data using the AEM Headless feature, you can run a local instance of Google Chrome with security features disabled. Use the following command to start Chrome: `open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials`
3. Open the `aem-eds-aniless-docbased` directory in your favorite IDE and start coding :)
