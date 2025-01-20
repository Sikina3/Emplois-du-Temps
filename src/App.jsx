import './Styles/App.css';
import { useMemo, useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [focus, setFocus] = useState(false);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const keyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setFocus(true);
      }

      if (event.key === 'Escape') {
        setFocus(false);
      }
    };

    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, []);

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

  const ButtonClick = (rowIndex, subjectIndex) => {
    const buttonKey = `${rowIndex}-${subjectIndex}`;
    setClickedButtons(prev => (
      prev.includes(buttonKey)
        ? prev.filter(key => key !== buttonKey)
        : [...prev, buttonKey]
    ));
  };

  const click = ()=>{
    setIsLoad(true);

    setTimeout(() =>{
      setIsLoad(false);
    }, 10000);
  };

  return (
    <div className='app'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
      </div>

      {focus && (
        <div className="filter" style={{
          position: 'fixed',
          width: '70%',
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, 0)',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '0px',
          boxShadow: '0px 0px 5px rgb(195, 195, 195)',
          borderRadius: '8px'
        }}
        >
          <TextField
            label="recherche"
            variant='outlined'
            className='bar-search'
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>
      )}

      <TableContainer component={Paper} className="container" style={{ maxHeight: 480, height: 480, border: '0.5px solid #E8EDDF', marginTop: '4%' }}>
        <Table stickyHeader>
          <TableBody>
            {filteredData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell sx={{
                  borderRight: '0.5px solid #E8EDDF'
                }}>
                  {row.name}
                </TableCell>
                <TableCell>
                  {row.subjects.map((subject, subjectIndex) => {
                    const buttonKey = `${rowIndex}-${subjectIndex}`;
                    const isClicked = clickedButtons.includes(buttonKey);
                    return (
                      <Button
                        key={subjectIndex}
                        variant="outlined"
                        style={{ margin: 2, borderColor: isClicked ? '#0B162C' : '#3B556D', color: isClicked ? 'white' : '#3B556D', backgroundColor: isClicked ? '#3B556D' : 'white', fontSize: '12px'}}
                        onClick={() => ButtonClick(rowIndex, subjectIndex)}
                        endIcon={isClicked ? <EditIcon /> : null}
                      >
                        {subject}
                      </Button>
                    );
                  })}
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
            width: '10em'
          }}
          onClick={click}
          loading={isLoad}
          loadingPosition='end'
        >
          Generer
        </Button>
      </div>
      <p> <SearchIcon /> Ctrl + k </p>
    </div>
  );
};

export default App;
