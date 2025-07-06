import { createSlice, nanoid } from "@reduxjs/toolkit";

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
    },
    workExperience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    qualification: [
      {
        degree: "",
        institution: "",
        year: "",
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
    others: {
      hobbies: [""],
      languages: [""],
    },
  },
  isEdit: false,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.selectedTheme = action.payload;
    },

    updateField(state, action) {
      const { section, value } = action.payload;
      state.currentResume[section] = value;
    },
    nextStep(state) {
      if (state.step < 6) state.step++;
    },
    prevStep(state) {
      if (state.step > 1) state.step--;
    },
    setStep(state, action) {
      state.step = action.payload;
    },
    addResume(state) {
      const newResume = {
        ...state.currentResume,
        id: nanoid(),
        theme: state.selectedTheme,
      };
      state.resumeList.push(newResume);
      state.currentResume = JSON.parse(
        JSON.stringify(initialState.currentResume)
      );
      state.step = 1;
      state.selectedTheme = null;
    },
    deleteResume(state, action) {
      state.resumeList = state.resumeList.filter(
        (r) => r.id !== action.payload
      );
    },
    // editResume(state, action) {
    //   const resume = state.resumeList.find((r) => r.id === action.payload);
    //   if (resume) {
    //     state.currentResume = JSON.parse(JSON.stringify(resume));
    //     state.selectedTheme = resume.theme;
    //     state.step = 1;
    //     state.isEdit = true;
    //   }
    // },
//    editResume: (state, action) => {
//   const resume = action.payload;
//   return {
//     ...state,
//     step: 1,
//     selectedTheme: resume.theme || null,
//     basicInfo: resume.basicInfo,
//     workExperience: resume.workExperience,
//     education: resume.qualification,
//     certification: resume.certification,
//     skills: resume.skills,
//     others: resume.others,
//     summary: { text: resume.summary || "" },
//     id: resume._id || null,
//   };
// }
editResume: (state, action) => {
  const resume = action.payload;

  return {
    ...state,
    step: 1, // force go to step 1
    selectedTheme: resume.theme || "Theme1", 
    basicInfo: resume.basicInfo || {},
    workExperience: resume.workExperience || [],
    qualification: resume.qualification || [],
    certification: resume.certification || [],
    skills: resume.skills || { technical: [], soft: [] },
    others: resume.others || { hobbies: [], languages: [] },
    summary: resume.summary || { text: "" },
  };
}
,
    updateResume(state) {
      const index = state.resumeList.findIndex(
        (r) => r.id === state.currentResume.id
      );
      if (index !== -1) {
        state.resumeList[index] = {
          ...state.currentResume,
          theme: state.selectedTheme,
        };
        state.isEdit = false;
        state.step = 1;
        state.currentResume = JSON.parse(
          JSON.stringify(initialState.currentResume)
        );
        state.selectedTheme = null;
      }
    },
  },
});

export const {
  setTheme,
  nextStep,
  prevStep,
  setStep,
  updateField,
  addResume,
  deleteResume,
  editResume,
  updateResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
