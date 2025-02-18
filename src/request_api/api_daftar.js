"use client";
import axios from "axios";

export default async function api(data) {
  try {
    const response = axios.put(
      "https://sento.my.id/sento/backend/DaftarLogin",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
