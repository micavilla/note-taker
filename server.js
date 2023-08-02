// Imports express package and initializes app variable by setting it to the value of express()
const express = require("express");
const app = express();

// Imports frontend and API routes
const frontendRoutes = require('./routes/frontend');
const apiRoutes =  require('./routes/api');

// Specifies environment variable PORT or local host
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON, urlencoded form data, and static files from 'public' directory
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Mounts routers on root path and /api path
app.use('/', frontendRoutes);
app.use('/api', apiRoutes);

// Listens for incoming connections on specified port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);