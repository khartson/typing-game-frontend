import './App.css';
import TypingTest from './components/TypingTest';
import Login from './components/Login';
import { useState } from 'react'; 

function App() {
 
  // user that is logged and to whom 
  // records will be associated
  const [user, setUser] = useState(null); 

  // changeUser 
  // sets user upon login OR
  // updates user when a test result
  // is added, deleted, or starred
  const changeUser = (user) => {
    setUser(user); 
  }

  // updateUseTests
  // when a user completes a test, this test is added
  // via state after the post request is made
  const updateUserTests = (test) => {
    const updatedTests = [...user['tests'], test]
    setUser({...user,
             tests: updatedTests})
  }

  // updateStarredTest
  // when a user stars a test, this function sets the updated
  // 'starred' field in state after the patch request has been made
  const updateStarredTest = (updatedTest) => {
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

  // deleteTest
  // deletes test from state after it has been deleted from 
  // database 
  const deleteTest = (testToDelete) => {
    const updatedTests = user['tests'].filter((test)=>test['id'] !== testToDelete['id'])
    setUser({...user,
             tests: updatedTests});
  }

  return (
    <div className="App">
      <header className="App-header">
        {!user?<Login changeUser={changeUser}/>:<TypingTest onDeleteTest={deleteTest} onStarredTest={updateStarredTest} onCompletion={updateUserTests} user={user}/>}
      </header>
    </div>
  );
}

export default App;
