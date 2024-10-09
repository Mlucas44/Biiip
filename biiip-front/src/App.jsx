import biiipLogo from '../public/images/biiip-logo.png'
import UsersList from './components/UsersList';
import './App.css'

function App () {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <img src={biiipLogo} alt="Biiip Logo" className="w-1/3" />
      </div>
      <div className="App">
        <UsersList />
      </div>
    </>
  )
}

export default App
