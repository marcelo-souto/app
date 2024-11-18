import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://app-api-gdahb9b3brdtgye5.canadacentral-01.azurewebsites.net/api",
});
