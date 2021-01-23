// getUrlParams
// returns an object of all url params
export default getUrlParams = (queryString) => {
  const urlParams = new URLSearchParams(queryString);
  const params = {};

  const entries = urlParams.entries();

  for (const entry of entries) {
    params[entry[0]] = entry[1];
  }

  return params;
};
