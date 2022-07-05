import './App.css';
import TypingTest from './components/TypingTest';
import Login from './components/Login';
import { useState } from 'react'; 

function App() {
  
  const [user, setUser] = useState(null); 

  const changeUser = (user) => {
    setUser(user); 
  }

  const updateUserTests = (test) => {
    const updatedTests = [...user['tests'], test]
    setUser({...user,
             tests: updatedTests})
  }

  const updateStarredTest = (updatedTest) => {
    console.log(updatedTest)
    const updatedTests = user['tests'].map((test)=>{
      if (test['id'] === updatedTest['id']) {
        return updatedTest
      } else {
        return test; 
      }
    });
    setUser({...user,
             tests: updatedTests})
  }

  return (
    <div className="App">
      <header className="App-header">
        {!user?<Login changeUser={changeUser}/>:<TypingTest onStarredTest={updateStarredTest} onCompletion={updateUserTests} user={user}/>}
      </header>
    </div>
  );
}

export default App;
