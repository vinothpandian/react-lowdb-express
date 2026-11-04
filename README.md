# React with Express and LowDB

React, Bootstrap, LowDB, and Express with Vite hot reload. Requires Node.js 22.12+.

- `npm ci`: install dependencies.
- `npm run dev`: start the UI on port 8080.
- `npm run build`: build the UI into `dist/`. Configure the static host to serve `index.html` for client routes such as `/features`.
- `npm test`: verify existing browser data, additions, and deletion.
- `npm start`: run the original JSON-array API on port 3000.
- `npm run start:lowdb`: run the alternative LowDB dictionary-object API on port 3000.

Run only one API server at a time. Each uses `src/assets/datastore/db.json`, but the original examples expect different JSON shapes: `server.js` uses an array and `dbServer.js` uses an object with a `dictionary` array. Back up data and select the matching shape before switching servers.

The Features page uses browser local storage under the existing `db` key and preserves its dictionary entries across reloads. The alternative `FeatureForm` component still supports the HTTP API. Runtime dependencies are installed in production as well as development.

Vite and Dart Sass replace Webpack/Babel/Node Sass. Bootstrap 5 navigation attributes and form spacing are adapted while React 16, routing, and LowDB's storage format remain compatible. Windows aliases `wdev` and `wbuild` use the same portable commands.
