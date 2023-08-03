// Imports Express package and initializes app variable by setting it to the value of express()
const express = require("express");
const app = express();

// Imports api and frontend routers
const apiRoutes =  require('./routes/api');
const frontendRoutes = require('./routes/frontend');

// Specifies environment variable PORT or local host
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON, urlencoded form data, and static files from 'public' directory
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Mounts imported routers on /api path and root path
app.use('/api', apiRoutes);
app.use('/', frontendRoutes);

// Listens for incoming connections on specified port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);