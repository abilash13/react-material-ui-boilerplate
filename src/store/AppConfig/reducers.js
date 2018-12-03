const config = {
  hosts: {
    api: {
      dev: 'https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com',
      prod: 'https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com',
    },
  },
  endpoints: {
    catFacts: { endpoint: '/facts', origin: 'api' },
  },
};

const setEndpoints = nonProd => {
  const endpoints = {};
  Object.keys(config.endpoints).map(endpointName => {
    let hostOrigin;
    const { endpoint, origin } = config.endpoints[endpointName];
    if (nonProd) {
      hostOrigin = config.hosts[origin].dev;
    } else {
      hostOrigin = config.hosts[origin].prod;
    }
    endpoints[endpointName] = hostOrigin + endpoint;
    return true;
  });
  return endpoints;
};

const setAppConfig = nonProd => ({
  endpoints: setEndpoints(nonProd),
});

export default () => setAppConfig(process.env.NODE_ENV === 'development');
