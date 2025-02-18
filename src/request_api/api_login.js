"use client";
import axios from "axios";

export default async function api(data) {
  try {
    const response = axios.post(
      "https://sento.my.id/sento/backend/login",
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
