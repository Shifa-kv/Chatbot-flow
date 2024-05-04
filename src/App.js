import React from 'react';
import './App.css';
import NodesPanel from './components/NodesPanel';
import Flow from './components/Flow';
import Header from './components/Header';
import TextNode from './components/nodeTypes/TextNode';
import message from './assets/images/message.svg';

function App() {
  // Define available node types.
  // Add label and icon of each node types for to use in Nodes panel.
  const nodeTypes = [
    { id: 1, type: 'textNode', component: TextNode, label: 'Message', icon: message },
    // TODO: Add more node types here as needed
  ];

  return (
    <div className="App">
      <Header />
      <main className='flex h-[90vh] flex-wrap sm:flex-nowrap'>
        <Flow nodeTypes={nodeTypes} />
        <NodesPanel nodeTypes={nodeTypes} />
      </main>
    </div>
  );
}

export default App;
