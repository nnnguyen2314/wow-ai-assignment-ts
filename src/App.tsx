import React from 'react';
import './assets/styles/App.css';
import RootLayout from "./modules/shared/features/layout/RootLayout";
import TodoContainer from "./modules/todo/features/containers/TodoContainer";

function App() {
  return (
      <RootLayout>
          <div className="App">
              <TodoContainer />
          </div>
      </RootLayout>
  );
}

export default App;
