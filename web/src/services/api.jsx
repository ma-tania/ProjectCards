const callToApi = (data) => {
  return fetch('http://localhost:3500/createproject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        return data.cardURL;
      }
      console.log('Solicitud POST exitosa:', data);
    })
    .catch((error) => {
      console.error('*Error al realizar la solicitud POST:', error);
    });
};

const getDataProjects = async () => {
  const fetchData = await fetch('http://localhost:3500/authors/list');
  const dataJson = await fetchData.json();
  return dataJson;
};

const object = {
  getDataProjects: getDataProjects,
  callToApi: callToApi
}

export default object;
