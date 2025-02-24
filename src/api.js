import axios from "axios";

const API_URL = "http://localhost:5000/api/lead";

export const getLeads = () => axios.get(API_URL);
export const getLeadById = (id) => axios.get(`${API_URL}/${id}`);
export const addLead = (leadData) => axios.post(API_URL, leadData);
export const updateLead = (id, leadData) => axios.put(`${API_URL}/${id}`, leadData);
export const deleteLead = (id) => axios.delete(`${API_URL}/${id}`);
