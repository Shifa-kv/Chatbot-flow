import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  data: [], // Array to store nodes
  edges: [], // Array to store edges
  selectedNode: null, // Currently selected node
};

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: initialState,
  reducers: {
    // Action to set nodes
    setFlowNodes: (state, action) => {
      state.data = action.payload;
    },
    // Action to set the selected node
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    // Action to update the content of a node
    updateNodeContent: (state, action) => {
      const { id, content } = action.payload;
    
      // Map over the nodes and update the content of the node with the matching id
      state.data = state.data.map(node =>
        node.id === id ? { ...node, data: { ...node.data, content } } : node
      );
    },
    // Action to set edges data
    setFlowEdges: (state, action) => {
      state.edges = action.payload;
    },

  }
});

export const { setFlowNodes, setSelectedNode, updateNodeContent, setFlowEdges } = nodesSlice.actions;
export default nodesSlice.reducer