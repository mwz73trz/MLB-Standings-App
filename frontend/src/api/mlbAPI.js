const BASE_URL = "http://localhost:8000/";

const getInit = (token) => {
  return {
    headers: {
      "Content-Type": "application/json",
      authorization: `JWT ${token}`,
    },
  };
};

const tryCatchFetch = async (url, init) => {
  try {
    let response = await fetch(url, init);
    if (response.ok) {
      if (response.status !== 204) {
        let data = await response.json();
        return data;
      } else {
        return { success: true };
      }
    }
  } catch (error) {
    console.error(":ERR:", error);
    return null;
  }
};

const doLogin = async (credentials) => {
  let url = `${BASE_URL}login/`;
  let init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };
  return await tryCatchFetch(url, init);
};

const getLeagues = async (token) => {
  let url = `${BASE_URL}api/leagues/`;
  return await tryCatchFetch(url, getInit(token));
};

const getLeagueById = async (leagueId, token) => {
  let url = `${BASE_URL}api/leagues/${leagueId}/`;
  return await tryCatchFetch(url, getInit(token));
};

const myExports = {
  doLogin,
  getLeagues,
  getLeagueById,
};

export default myExports;
