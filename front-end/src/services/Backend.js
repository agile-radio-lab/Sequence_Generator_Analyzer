import axios from "axios";
import { backend } from "../config/config";

let baseUrl = localStorage.getItem("amlControlBaseURL") || backend || "";

var backendSettings = axios.create({
    baseURL: baseUrl
});

export default backendSettings;