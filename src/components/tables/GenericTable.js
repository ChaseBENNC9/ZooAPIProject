/**
 * @summary Generic Table that contains re-usable functions for Creating,Updating, Retrieving and Deleting Data
 * @author Chase Bennett-Hill
 */
import axios from "axios";
const BASE_URL = "https://id607001-bennc9-bit.onrender.com";

/**
 * @description Generic Function that handles deletion of a specific row of data
 * @param {integer} id //The id of the row to be deleted
 * @param {object} data //Data to be deleted
 * @param {string} type //Type of data to be deleted - specific endpoint
 * @returns {object}
 */
const deleteRow = (id, data, type) => {
  if (
    window.confirm(
      //Ensures that data can not be accidentally deleted.
      "Are you Sure? \n If you Delete this row it will be lost forever!",
    )
  ) {
    axios.delete(`${BASE_URL}/api/v1/${type}/${id}`);
    data = data.filter((data) => {
      //Filters the data out of the table
      return data.id !== id;
    });
  }
  return data;
};

/**
 * @description Gets the set of data from the endpoint 'type'
 * @param {string} type
 * @returns {object}
 */
const getTableData = async (type) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/${type}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Creates a new row in the data
 * @param {object} data
 * @param {object} newData
 * @returns {object}
 */
const handleCreateData = (data, newData) => {
  return [...data, newData]; //Appends the new data to the original data array
};

/**
 * @description Updates a specific row of data
 * @param {object} updatedItem
 * @param {object} data
 * @returns {object}
 */
const handleUpdateData = (updatedItem, data) => {
  data = data.map((item) => {
    return item.id === updatedItem.id ? updatedItem : item; //Finds the object with the matching id and replaces it with the updated data
  });

  return data;
};

export { deleteRow, getTableData, handleCreateData, handleUpdateData };