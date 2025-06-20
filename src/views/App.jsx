import { useState } from 'react'
import '../styles/App.css'
import Custom_Sidebar from '../components/navigations/Sidebar'
import TopNavbar from '../components/navigations/TopNavBar'
import CustomButton from '../components/buttons/CustomButton'
import AddIcon from '@mui/icons-material/Add';
import CardSubject from '../components/CardSubject'

function App() {
  const titre = [
    { titre: "Licence 1", levels: ["tronc commun"] },
    { titre: "licence 2", levels: ["tronc commun"] },
    { titre: "Licence 3", levels: ["Maths info", "Ac. Info"] },
    { titre: "Master 1", levels: ["Ing. Maths", "img. Interaction", "genie info"] },
    { titre: "Master 2", levels: ["Ing. Maths", "img. Interaction", "genie info"] },
  ];

  const profs = [
    { nom: "Rakotonandrasana Marco" },
    { nom: "Velo Jérôme" },
    { nom: "Feno Rajaonasy Daniel" },
    { nom: "Andriamasinoro Hajaniarina" },
  ];

  return (
    <>
      <TopNavbar titlesWithLevels={titre} />
      <div className='container'>
        <Custom_Sidebar profs={profs} />

        <div className='right-div'>
          <CustomButton label={"Créer un nouveau module"} variant={"contained"} endIcon={<AddIcon />} sx={{marginBottom: 12}} />
          <CardSubject/>
        </div>
      </div>
    </>
  );
}

export default App;
