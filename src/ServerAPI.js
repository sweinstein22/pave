const ServerAPI = {
  getFromServer: async ({key, query}) => {
    let returnVal;
    let queryParams = query ? `?${(new URLSearchParams(query)).toString()}` : '';
    await fetch(`http://localhost:8080/${key}${queryParams}`, {
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
  },
  getFileFromServer: async ({fileName}) => {
    let returnVal;
    await fetch(`http://localhost:8080/data/${fileName}.csv`, {
      method: 'GET',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.text())
      .then(value => {
        returnVal = value;
      })
      .catch(e => console.log('Error getting ', fileName, ':', e));
    return returnVal;
  }
};

export default ServerAPI;
