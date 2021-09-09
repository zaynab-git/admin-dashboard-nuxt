# admin-dashboard-nuxt

## Build Setup

```bash
# install dependencies
$ npm install

# start openapi mock server (log in) 
$ cd server
$ prism mock openapi.yaml
# start websocket server (chat with support) 
$ node echo.js

# serve at localhost:3000
$ cd ..
$ npm run dev

# to log in as support enter 'support' as username
