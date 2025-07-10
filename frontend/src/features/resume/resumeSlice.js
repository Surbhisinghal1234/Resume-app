import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  selectedTheme: null,
  resumeList: [],
  currentResume: {
    id: null,
    basicInfo: {
      name: "",
      email: "",
      mobile: "",
      location: "",
      designation: "",
      linkedin: "",
      github: "",
    },
    workExperience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        currentlyWorking: false,
      },
    ],
    qualification: [
      {
        degree: "",
        institution: "",
        year: "",
        gradeOrPercentage: "",
      },
    ],
    certification: [
      {
        title: "",
        authority: "",
        year: "",
      },
    ],
    skills: {
      technical: [],
      soft: [],
    },
    summary: "",
    others: {
      hobbies: [],
      languages: [],
    },
  },
  isEdit: false,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    // Step control
    nextStep(state) {
      if (state.step < 7) state.step++;
    },
    prevStep(state) {
      if (state.step > 1) state.step--;
    },
    setStep(state, action) {
      state.step = action.payload;
    },

    // Field update
    updateField(state, action) {
      const { section, value } = action.payload;
      state.currentResume[section] = value;
    },

    // Theme select
    setTheme(state, action) {
      state.selectedTheme = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    //  Add new resume to list
    addResume(state, action) {
      const newResume = {
        ...action.payload,
        id: action.payload.id || crypto.randomUUID(),
      };
      state.resumeList.push(newResume);
    },

    // Load a resume for editing
    loadResumeForEdit(state, action) {
      const resume = action.payload;

      state.currentResume = {
        id: resume._id || resume.id || null,
        basicInfo: resume.basicInfo || {},
        workExperience: resume.workExperience || [],
        qualification: resume.qualification || [],
        certification: resume.certification || [],
        skills: resume.skills || { technical: [], soft: [] },
        others: resume.others || { hobbies: [], languages: [] },
        summary: resume.summary || "",
        theme: resume.theme || "Theme1",
      };

      state.selectedTheme = resume.theme || "Theme1";
      state.step = 1;
      state.isEdit = true;
    },

    // Update an existing resume
    updateResume(state, action) {
      const updated = action.payload;
      const index = state.resumeList.findIndex((r) => r.id === updated.id);
      if (index !== -1) {
        state.resumeList[index] = {
          ...updated,
        };
      }

      state.isEdit = false;
      state.step = 1;
      state.currentResume = JSON.parse(
        JSON.stringify(initialState.currentResume)
      );
      state.selectedTheme = null;
    },

    //  Delete resume
    deleteResume(state, action) {
      const id = action.payload;
      state.resumeList = state.resumeList.filter((r) => r.id !== id);
    },

    // Reset form
    resetForm(state) {
      state.currentResume = JSON.parse(
        JSON.stringify(initialState.currentResume)
      );
      state.selectedTheme = null;
      state.step = 1;
      state.isEdit = false;
    },
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  updateField,
  setTheme,
  addResume,
  updateResume,
  deleteResume,
  loadResumeForEdit,
  resetForm,
  setIsEdit,
} = resumeSlice.actions;

export default resumeSlice.reducer;
