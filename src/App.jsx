import './Styles/App.css';
import { useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const data = useMemo(
    () => [
      { name: 'Lorem Ipsum', subjects: ['Langage C++'] },
      { name: 'VELO Jerome', subjects: ['Conception à Objet', 'UML', 'Intelligence Artificielle', 'Rédaction', 'Assembleur', 'Système d’Information'] },
      { name: 'Dolor set', subjects: ['Java'] },
      { name: 'Marco', subjects: ['Algebre 6'] },
      { name: 'Karitaka', subjects: ['Java'] },
      { name: 'Nandrianina', subjects: ['Algebre 2'] },
      { name: 'Bao', subjects: ['Maths disc'] },
      { name: 'Theodor', subjects: ['Topo'] },
      { name: 'Sao', subjects: ['tsy aiko'] },
      { name: 'Marthina', subjects: ['Bool'] },
      { name: 'Zety', subjects: ['Theorie'] },
      { name: 'Leode', subjects: ['Geometrie'] },
      { name: 'Koto', subjects: ['Francais'] },
      { name: 'Ka', subjects: ['Anglais'] },
      { name: 'Izy', subjects: ['COmpta'] },
      { name: 'apad', subjects: ['Gestion'] },

    ],
    []
  );

  const filteredData = data.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className='app'>
      <div className="nav-bar">
        <button> L1 </button>
        <button> L2 </button>
        <button className='active'> L3 Info </button>
        <button> L3 Maths </button>
        <button> M1 Genie </button>
        <button> M1 Image </button>
        <button> M1 Maths </button>
        <button> M2 Genie </button>
        <button> M2 Image </button>
        <button> M2 Maths </button>
      </div>

      <div className="filter">
        <TextField
          label="recherche"
          className='bar-search'
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <SearchIcon/>
              </InputAdornment>
            )
          }}
         />
      </div>

      <TableContainer component={Paper} className="container" style={{ maxHeight: 480 , height: 480, border: '0.5px solid #E8EDDF'}}>
        <Table stickyHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {row.name}
                  </TableCell>
                <TableCell>
                  {row.subjects.map((subject, index) => (
                    <Button key={index} variant="outlined" style={{ margin: 2 }}>
                      {subject}
                    </Button>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className='container'>
        <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#0B162C',
              '&:hover': {
                backgroundColor: '#3B556D',
              },
              color: 'white',
              width: '10em',
            }}
        >
          Generer
        </Button>
      </div>
    </div>
  );
};

export default App;
