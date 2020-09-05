import axios from "axios";

class API {
  constructor() {
    this.baseURL =
      process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api"
        : "https://travel-log-bckend.herokuapp.com/api";
    this.mapBoxAccessKey =
      "pk.eyJ1IjoidGhlLW11dGFudCIsImEiOiJja2VqaTJtb20xcHRqMzFqeTdhbjhxZGVwIn0.WHABj0QVsLs3aVXfx8QrKg";
  }

  getAllLocations = async () => {
    const places = await axios.get(`${this.baseURL}`);
    const locations = places.data;
    return locations;
  };

  createLocation = async (data) => {
    await fetch(`${this.baseURL}/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return;
  };

  deleteLocation = async (id) => {
    const del = await axios.delete(`${this.baseURL}/delete/${id}`);
    return del;
  };

  updateLocation = async (data) => {
    await fetch(`${this.baseURL}/update`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return;
  };

  getResultsWithText = async (text) => {
    const results = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        text
      )}.json?access_token=${this.mapBoxAccessKey}&country=US,CA`
    );
    return results.data.features;
  };

  getAddressWithCord = async (cor) => {
    const place = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${cor[0]},${cor[1]}.json?access_token=${this.mapBoxAccessKey}`
    );
    const data = place.data.features;
    data.forEach((cur) => {
      cur.id = cur.id.split(".")[0];
    });
    return data;
  };
}

export default API;
