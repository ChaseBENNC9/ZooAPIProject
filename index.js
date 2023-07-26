// Import the Express module
import express from 'express';

// Import the index routes module
import indexRoutes from './routes/index.js';
import aboutRoutes from './routes/about.js';
import contactRoutes from './routes/contact.js';
import coursesRoutes from './routes/courses.js';


// Create an Express application
const app = express();

// Use the routes module
app.use('/', indexRoutes);
app.use('/about', aboutRoutes);
app.use('/contact',contactRoutes);
app.use('/courses',coursesRoutes);


// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});

// Export the Express application. Other modules may use it. For example, API testing
export default app;