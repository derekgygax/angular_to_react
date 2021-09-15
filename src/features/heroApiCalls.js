import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

// API call to get the heroes from the DB
export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const response = await client.get("/heroes");
  // The response and stuff will get handled in the extraReducers
  return response;
});
