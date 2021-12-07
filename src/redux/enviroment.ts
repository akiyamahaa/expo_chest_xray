const ENV = {
  dev: {
    API_BASE_URL: 'http://192.168.10.94:3000'
  },
  prod: {
    API_BASE_URL: 'http://192.168.10.94:3000'
  }
};

const getEnvVars = () => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else {
    return ENV.prod;
  }
};

export default getEnvVars;
