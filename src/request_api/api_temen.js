import axios from "axios";

export async function api(cari, token) {
  try {
    const response = axios.get(
      `https://sento.my.id/sento/backend/temenlah?cari=${cari}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return {
      status: 500,
      Message: error,
    };
  }
}

export async function api_tambah(data, token) {
  try {
    const response = axios.put(
      `https://sento.my.id/sento/backend/temenlah`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return {
      status: 500,
      Message: error,
    };
  }
}
