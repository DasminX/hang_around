import { API_PREFIX } from "@dasminx/hang-around-common";

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL; /* "http://192.168.100.25:8080" */

export const BACKEND_API_PATH = `${API_URL}${API_PREFIX}`;
