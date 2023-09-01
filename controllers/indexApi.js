/**
 * @file This is the Index Api, It shows all the available routes of the API
 * @author Chase Bennett-Hill
 */
const routes = [
    '/api/v1/zoos',
    '/api/v1/enclosures',
    '/api/v1/animals',
    '/api/v1/workers',
    '/api/v1/visitors',
    '/api/v1/tourGroups'
  ];
  const routeList = routes.map(route => `<li><a href="${route}">${route}</a></li>`).join('');
  
  const html = `
    <h1>Available Routes:</h1>
    <ul>${routeList}</ul>
  `;
  // Create a GET route
  const get = (req, res) => {
    res.send(html);
  };
  
  // Export the get function
  export { get };
  