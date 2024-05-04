import { configureStore } from "@reduxjs/toolkit";
import nodesSlice from "./nodesSlice";

// Configure the Redux store
const Store = configureStore({
    reducer: {
        nodes : nodesSlice,
    }
});
export default Store