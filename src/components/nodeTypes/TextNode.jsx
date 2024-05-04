import React from "react";
import { useSelector } from "react-redux";
import { Handle, Position } from "reactflow";
import message from '../../assets/images/message.svg';

const TextNode = ({id}) => {
    const {data,selectedNode} = useSelector((state) => state.nodes);
    const currentNode = data.find(node => node.id === id);
    // Get the content of the selected node or set default message
    const selectedNodeContent = currentNode?.data?.content || 'Click to add text message';
    // CSS class for content based on whether content exists
    let contentClass = currentNode?.data?.content ? ' text-gray-700' : ' text-gray-400';

    return (
        <div className="text-updater-node">
            {/* Target Handle for incoming connections */}
            <Handle type="target" position={Position.Left} isConnectableStart={false} />
            {/* Node container */}
            <div className={`shadow-lg rounded-xl overflow-hidden ${selectedNode === id ? 'border border-cyan-800' : 'border'}`}>
                <div className=" bg-cyan-200 text-left px-2 py-1 font-bold flex items-center ">
                    <img src={message} alt='text-node' className='w-4 h-4 flex mr-2 float-left' />
                    <label htmlFor="text">Send Message</label>
                </div>
                <p className={` min-h-8 p-3 text-left w-60 break-words bg-white ${contentClass}`}>
                    {selectedNodeContent}
                </p>
            </div>
            {/* Source Handle for outgoing connections */}
            <Handle type="source" position={Position.Right} isConnectableEnd = {false}
             />
        </div>
    )
}
export default TextNode