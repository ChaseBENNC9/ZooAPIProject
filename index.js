/**
 * @file Manages the Express Application 
 * @author Chase Bennett-Hill
 */
// Import the Express module
import express from "express";
// Import the express rate limit module
import { rateLimit } from "express-rate-limit";
// Import all the routes of the API
import indexRoutes from "./routes/index.js";
import indexApiRoutes from "./routes/indexApi.js";
import zooRoutes from "./routes/api/zoo.js";
import enclosureRoutes from "./routes/api/enclosure.js";
import animalRoutes from "./routes/api/animal.js";
import visitorRoutes from "./routes/api/visitor.js";
import workerRoutes from "./routes/api/worker.js";
import tourGroupRoutes from "./routes/api/tourGroup.js";
// Create an Express application
const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per `window` (1 minute)
  message:
    "You have exceeded the number of requests per minute: 100. Please try again later.",
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(express.urlencoded({ extended: false })); // To parse the incoming requests with urlencoded payloads. For example, form data
app.use(express.json()); // To parse the incoming requests with JSON payloads. For example, REST API requests

// Use the routes module
app.use("/", indexRoutes);
app.use("/api", indexApiRoutes);
app.use("/api/v1/zoos", zooRoutes);
app.use("/api/v1/enclosures", enclosureRoutes);
app.use("/api/v1/animals", animalRoutes);
app.use("/api/v1/visitors", visitorRoutes);
app.use("/api/v1/workers",workerRoutes);
app.use("/api/v1/tourgroups",tourGroupRoutes);
// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});

// Export the Express application. Other modules may use it. For example, API testing
export default app;
