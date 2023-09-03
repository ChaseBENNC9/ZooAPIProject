/**
 * @file This is the Index Page It will automatically redirect the user to the IndexApi route
 * @author Chase Bennett-Hill
 */

// Create a GET route to redirect to the API Page
const get = (req, res) => {
  res.redirect("/api");
};

// Export the get function
export { get };
