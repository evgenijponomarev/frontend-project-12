import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import routes from '../routes.js';

const fetchData = createAsyncThunk(
  'channelsInfo/setInitialState',
  async (authHeader, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.dataPath, { headers: authHeader });
      return response.data;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: err.status });
    }
  },
);

export default fetchData;
