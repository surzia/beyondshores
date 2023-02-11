import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { BACKEND_API_HOST } from "../../common";

const initialState: Ifeed = {
  records: 0,
  count: 0,
  feeds: [],
};

export const feedStory = createAsyncThunk(
  "feed/story",
  async (props: FeedProps) => {
    try {
      let url: string = "";
      if (props.word === "") {
        url = `${BACKEND_API_HOST}/story/query?page=${props.page}&size=${props.size}&sort=${props.sort}`;
      } else {
        url = `${BACKEND_API_HOST}/story/query?page=${props.page}&size=${props.size}&sort=${props.sort}&word=${props.word}`;
      }
      const response = await fetch(url);
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

export const feedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(feedStory.pending, (state, action) => {});
    builder.addCase(feedStory.fulfilled, (state, { payload }) => {
      state.records = payload.data.records;
      state.count = payload.data.count;
      state.feeds = payload.data.stories;
    });
  },
});

export const feedResults = (state: RootState) => state;

export default feedSlice.reducer;
