const ServerAPI = {
  getFromServer: async ({key}) => {
    let returnVal;
    await fetch(`http://localhost:8080/${key}`, {
      method: 'GET',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(value => {
        returnVal = value;
      })
      .catch(e => console.log('Error getting ', key, ':', e));
    return returnVal;
  }
};

export default ServerAPI;
