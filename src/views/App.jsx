import { useState } from 'react'
import '../styles/App.css'
import Custom_Sidebar from '../components/navigations/Sidebar'
import TopNavbar from '../components/navigations/TopNavBar'
import CustomButton from '../components/buttons/CustomButton'
import AddIcon from '@mui/icons-material/Add';

function App() {
  return (
    <>
      <TopNavbar/>
      <div className='container'>
        <Custom_Sidebar/>

        <div className='right-div'>
          <h1> Hello people </h1>
          <p> Voici le contenue de droite </p>
          <CustomButton label={"Crée un nouveau module"} variant={"contained"} endIcon={<AddIcon/>}/>
        </div>
      </div>
    </>
  )
}

export default App
