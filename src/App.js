import './App.css';
import Graphs from './Graphs';
import SelectionForm from './SelectionForm';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Employee Compensation Data</h1>
        <h2>The Restaurant Group of San Francisco</h2>
      </header>
      <main>
        <SelectionForm />
        <Graphs />
      </main>
    </div>
  );
}

export default App;
