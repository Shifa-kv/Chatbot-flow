import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';
import { useDispatch } from 'react-redux';
import { setFlowEdges, setFlowNodes, setSelectedNode } from '../Store/nodesSlice';
let id = 0;

const Flow = ({ nodeTypes }) => {
    // State management for nodes and edges
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    // State to hold the ReactFlow instance
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const dispatch = useDispatch();

    // Memoize nodeTypeComponents to prevent unnecessary re-renders
    const nodeTypeComponents = useMemo(() => {
        // Convert nodeTypes array into an object with only type and component
        return nodeTypes.reduce((data, { type, component }) => {
            data[type] = component;
            return data;
        }, {});
    }, [nodeTypes]);

    // Callback function to handle node connection
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    // Callback function to handle drag over events
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // Callback function to handle node drop events
    const onDrop = (event) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
            return;
        }

        // Get position of the dropped node
        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        // Generate unique ID for the new node
        const getId = () => `node_${id++}`;
        const newNode = {
            id: getId(),
            type,
            position,
            data: { content: '' },
        };

        // Update local state with the new node
        setNodes((nds) => nds.concat(newNode));

        // Dispatch action to update Redux store with the new node
        dispatch((dispatch, getState) => {
            const { data } = getState().nodes;
            dispatch(setFlowNodes([...data, newNode]));
        });
    };

    // Callback function to handle selection change of nodes
    const onSelectionChange = (elements) => {
        dispatch(setSelectedNode(elements?.nodes[0]?.id));
    };

    // Update Redux store with edges whenever they change
    useEffect(() => {
        dispatch(setFlowEdges(edges));
    }, [edges]);

    // Checks if a new edge connection is valid.
    const isValidConnection = useCallback(
        // Check if there's already an edge originating from the same source handle.
        (connection) => !edges.find((edge) => edge.source === connection.source),
        [edges],
    );

    return (
        <div className='p-3 align-bottom sm:w-[75vw] w-full h-full sm:order-none order-1 sm:border-none border border-gray-200'>
            {/* ReactFlow component for rendering the flow diagram */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                onConnect={onConnect}
                nodeTypes={nodeTypeComponents}
                onSelectionChange={onSelectionChange}
                isValidConnection={isValidConnection}
            >
                {/* Controls for the flow diagram */}
                <Controls />
            </ReactFlow>
        </div>
    )
}
export default Flow