import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

// Function to validate nodes and edges.
const validateNodes = (data, edges) => {
    // Check if there are more than one node.
    if (data.length <= 1) {
      return null;
    }

    // Check if more than one node has an empty target handle.
    const emptyTargetHandleNodes = data.filter(node => {
      return edges.filter(edge => edge.target === node.id).length === 0;
    });

    // Return error message.
    if (emptyTargetHandleNodes.length > 1) {
      return 'Cannot save flow';
    }

    return null;
};

const Header = () => {
  const { data, edges } = useSelector((state) => state.nodes);
  const [errorMessage, setErrorMessage] = useState();

  // Memoize the result of validation function.
  const validationError = useMemo(() => validateNodes(data, edges), [data, edges]);

  const handleSave = () => {
    if (validationError) {
      setErrorMessage(validationError);
    } else {
      setErrorMessage('');
      // Logic for saving the flow goes here.
      alert('Saved!');
    }
  };

  return (
    <div className="h-[10vh] min-h-[60px] bg-gray-200 flex justify-end px-6 py-3">
      {errorMessage &&
        <div className=' w-4/12'>
          <p className=' bg-red-300 rounded-md font-semibold px-3 py-1 w-max'>{errorMessage}</p>
        </div>
      }
      <div className=' w-4/12 text-right'>
      <button
        className="border border-cyan-800  font-semibold px-4 rounded-lg bg-slate-100 h-full"
        onClick={handleSave}
      >
        Save changes
      </button>
      </div>
    </div>
  )
}
export default Header