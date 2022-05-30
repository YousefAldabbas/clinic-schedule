import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import patientService from "./patientService";
const initialState = {
  patient: {},
  patients: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isTableLoading: false,
  isTableError: false,
  isTableSuccess: false,
  isDeleteLoading: false,
  isDeleteError: false,
  isDeleteSuccess: false,
  isUpdateLoading: false,
  isUpdateError: false,
  isUpdateSuccess: false,
  message: "",
};

// get patients
export const getPatients = createAsyncThunk(
  "patient/getPatients",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // logout false
      return await patientService.getPatients(token);
    } catch (err) {
      const message =
        (err.response & err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

// get patients
export const getPatient = createAsyncThunk(
  "patient/getPatient",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await patientService.getPatient(id, token);
    } catch (err) {
      const message =
        (err.response & err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

// add patient
export const addPatient = createAsyncThunk(
  "patient/addPatient",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await patientService.addPatient(data, token);
    } catch (err) {
      const message =
        (err.response & err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

// update patient

export const updatePatient = createAsyncThunk(
  "patient/updatePatient",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await patientService.updatePatient(data, token);
    } catch (err) {
      const message =
        (err.response & err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

// delete patient
export const deletePatient = createAsyncThunk(
  "patient/deletePatient",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await patientService.deletePatient(data, token);
    } catch (err) {
      const message =
        (err.response & err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    reset: (state) => {
      state.patient = {};
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    resetTable: (state) => {
      state.patients = [];
      state.isTableLoading = false;
      state.isTableError = false;
      state.isTableSuccess = false;
    },
    resetDelete: (state) => {
      state.isDeleteLoading = false;
      state.isDeleteError = false;
      state.isDeleteSuccess = false;
    },
    resetUpdate: (state) => {
      state.isUpdateLoading = false;
      state.isUpdateError = false;
      state.isUpdateSuccess = false;
    },
    resetAll: (state) => {
      state.patient = {};
      state.patients = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isTableLoading = false;
      state.isTableError = false;
      state.isTableSuccess = false;
      state.isDeleteLoading = false;
      state.isDeleteError = false;
      state.isDeleteSuccess = false;
      state.isUpdateLoading = false;
      state.isUpdateError = false;
      state.isUpdateSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPatients.pending, (state, action) => {
        state.isTableLoading = true;
        state.isTableError = false;
        state.isTableSuccess = false;
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.isTableLoading = false;
        state.isTableError = false;
        state.isTableSuccess = true;
        state.patients = action.payload;
      });
    builder
      .addCase(getPatients.rejected, (state, action) => {
        state.isTableLoading = false;
        state.isTableError = true;
        state.isTableSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(getPatient.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.patient = action.payload;
      })
      .addCase(getPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(addPatient.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.patient = action.payload;
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(updatePatient.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isUpdateSuccess = true;
        state.patient = action.payload;
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(deletePatient.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isDeleteSuccess = action.payload;
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      });
  },
});

export const { reset, resetAll, resetUpdate, resetDelete } =
  patientSlice.actions;
export default patientSlice.reducer;
