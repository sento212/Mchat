"use client";
import axios from "axios";

export default async function api(data) {
  try {
    const response = axios.post("http://127.0.0.1:5000/login", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return {
      status: 500,
      Message: error,
    };
  }
}
