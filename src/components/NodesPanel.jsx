import React from 'react';
import { setSelectedNode, updateNodeContent } from '../Store/nodesSlice';
import { useDispatch, useSelector } from 'react-redux';
import backButton from '../assets/images/back-button.svg';

const NodesPanel = ({ nodeTypes }) => {
  const dispatch = useDispatch();
  const { selectedNode, data } = useSelector((state) => state.nodes);
  const selectedNodeContent = Array.isArray(data) ? data.find(node => node.id === selectedNode)?.data?.content : '';

  // Handler for drag start event
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  // Handler for input change event
  const onInputChange = (event) => {
    dispatch(updateNodeContent({ id: selectedNode, content: event?.target?.value }))
  };

  return (
    <div className="sm:border-l-2 border-r-2 border-gray-200 sm:w-[25vw] w-full h-max sm:h-full">
      {selectedNode ? (
        // Display input to change selected node content if a node is selected
        <div className="overflow-hidden py-3 text-left border-b">
          <div className='border-b px-3 pb-3'>
            <img
              src={backButton}
              alt="back"
              className='w-5 h-5 text-left m-auto cursor-pointer float-left'
              onClick={() => { dispatch(setSelectedNode('')); }}
            />
            <p className='text-center'>Message</p>
          </div>
          <div className='p-3'>
            <label className='w-full block mb-3 text-gray-400'>Text</label>
            <textarea
              id="text"
              name="text"
              onChange={onInputChange}
              value={selectedNodeContent}
              className="nodrag px-2 py-3 w-full shadow-lg border min-h-32 rounded-l"
              placeholder="Text Message 1"
            />
          </div>
        </div>
      ) : (
        // Display node types if no node is selected
        <div className='grid grid-cols-2 h-max gap-2 gap-y-2 p-3'>
          {nodeTypes.map((nodeType) => (
            <button
              key={nodeType.id}
              className="border borderborder border-cyan-800 p-4 rounded-lg text-cyan-800 w-full h-max"
              onDragStart={(event) => onDragStart(event, nodeType.type)}
              draggable
            >
              <img src={nodeType.icon} alt={nodeType.label} className='w-6 h-6 m-auto' />
              {nodeType.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NodesPanel;