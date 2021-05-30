import axios from "axios";

export default {
  state: {
    markers: [],
    coords: [],
    title: "",
    id: "",
    isEdit: false,
    token: localStorage.getItem("token") || null,
    userId: parseInt(localStorage.getItem("userId")) || null,
  },
  actions: {
    async getAllMarkers({ commit }) {
      try {
        const resolve = await axios.get(
          "http://127.0.0.1:8000/api/markers/list",
          {
            headers: {
              Accept: "application/json; charset=utf-8",
              "Content-Type": "application/json; charset=utf-8",
            },
          }
        );
        commit("setMarkers", resolve.data);
        return resolve.data;
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async addMarker({ commit }, payload) {
      try {
        const resolve = await axios.post(
          "http://127.0.0.1:8000/api/markers/create",
          {
            title: payload.title,
            coords: `${payload.dolgota}, ${payload.shirota}`,
            userId: payload.userId,
          }
        );
        commit("addMarker", resolve.data);
        return resolve.data;
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async deleteMarker({ commit, getters }, payload) {
      try {
        const resolve = await axios.delete(
          `http://127.0.0.1:8000/api/markers/delete/${payload.id}`,
          {
            headers: {
              Authorization: getters.getToken,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        commit("deleteMarker", payload);
        return resolve.data;
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async editMarker({ commit, getters }, payload) {
      try {
        const resolve = await axios.put(
          `http://127.0.0.1:8000/api/markers/put`,
          {
            title: payload.title,
            coords: `${payload.coords[0]}, ${payload.coords[1]}`,
            id: payload.id,
          },
          {
            headers: {
              Authorization: getters.getToken,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        commit("editMarker", payload);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async retrieveToken({ commit }, payload) {
      try {
        const resolve = await axios.post("http://127.0.0.1:8000/api/login", {
          email: payload.email,
          password: payload.password,
        });
        localStorage.setItem("token", resolve.data.token);
        localStorage.setItem("userId", resolve.data.user_id);
        commit("retrieveToken", resolve.data);
        commit("setUserId", resolve.data);
        return resolve;
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async register({ commit }, payload) {
      try {
        const resolve = await axios.post(
          "http://127.0.0.1:8000/api/registration",
          {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.password_confirmation,
          }
        );
        return resolve;
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    destroyToken({ commit, getters }) {
      if (getters.loggIn) {
        localStorage.removeItem("token");
        commit("destroyToken");
      }
    },
  },

  mutations: {
    setMarkers(state, payload) {
      state.markers = payload;
    },
    setCoords(state, payload) {
      state.coords = payload;
    },
    addMarker(state, payload) {
      state.markers.push(payload);
    },
    deleteMarker(state, payload) {
      state.markers = state.markers.filter((marker) => {
        return marker.id !== payload.id;
      });
    },
    editMarker(state, payload) {
      state.markers.map((m) => {
        if (m.id === payload.id) {
          m.title = payload.title;
          m.coords = payload.coords.toString();
        }
      });
    },
    setId(state, payload) {
      state.id = payload;
    },
    setTitle(state, payload) {
      state.title = payload;
    },
    resetForm(state) {
      state.coords = "";
      state.title = "";
    },
    setEdit(state, payload) {
      state.isEdit = payload;
    },

    retrieveToken(state, payload) {
      state.token = payload.token;
    },
    destroyToken(state) {
      state.token = null;
    },
    setUserId(state, payload) {
      state.userId = payload.user_id;
    },
  },

  getters: {
    getAllMarkers(state) {
      return state.markers;
    },
    getToken(state) {
      return state.token;
    },
    getId(state) {
      return state.id;
    },
    getCoords(state) {
      return state.coords;
    },
    getTitle(state) {
      return state.title;
    },
    getEdit(state) {
      return state.isEdit;
    },
    loggIn(state) {
      return state.token;
    },
    getUserId(state) {
      return state.userId;
    },
  },
};
