import './Styles/App.css';
import { useMemo, useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

const App = () => {
  const [selectedLevel, setSelectedLevel] = useState('L3 Info');

  const [searchTerm, setSearchTerm] = useState('');
  const [focus, setFocus] = useState(false);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectData, setSelectData] = useState({name: '', subjects: []});

  const clickOpen = (name, subject) => {
    setSelectData({name, subject});
    setOpenDialog(true);
  };

  const clickClose = () => {
    setOpenDialog(false);
  };

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
    () => ({
      'L1': [
        { name: 'Lorem Ipsum', subjects: ['Langage C++'] },
        { name: 'VELO Jerome', subjects: ['Conception à Objet', 'UML', 'Intelligence Artificielle', 'Rédaction', 'Assembleur', 'Système d’Information'] },
        { name: 'Dolor set', subjects: ['Java'] },
      ],

      'L2': [
        { name: 'Izy', subjects: ['COmpta'] },
        { name: 'apad', subjects: ['Gestion'] },
      ],
      'L3 Info': [
      { name: 'Theodor', subjects: ['Topo'] },
      { name: 'Sao', subjects: ['tsy aiko'] },
      { name: 'Marthina', subjects: ['Bool'] },
      { name: 'Zety', subjects: ['Theorie'] },
      { name: 'Leode', subjects: ['Geometrie'] },
      ],
      'L3 Maths': [
        //en attente
      ],
      'M1 Image': [
        //en attente
      ],
      'M1 Maths': [
        //en attente
      ],
      'M1 Genie': [
        //en attente
      ],
      'M2 Maths': [
        //en attente
      ],
      'M2 Image': [
        //en attente
      ],
      'M2 Genie': [
        //en attente
      ]
    }),
    []
  );

  const filteredData = data[selectedLevel].filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const ButtonClick = (rowIndex, subjectIndex) => {
    const buttonKey = `${selectedLevel}-${rowIndex}-${subjectIndex}`;
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

  const clickButtonMatier = (rowIndex, subjectIndex, name, sub) => {
    ButtonClick(rowIndex, subjectIndex);
    clickOpen(name, sub);
  }

  return (
    <div className='app'>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="nav-bar">
        <button onClick={() => setSelectedLevel('L1')} className={selectedLevel === 'L1' ? 'active' : ''}> L1 </button> 
        <button onClick={() => setSelectedLevel('L2')} className={selectedLevel === 'L2' ? 'active' : ''}> L2 </button> 
        <button onClick={() => setSelectedLevel('L3 Info')} className={selectedLevel === 'L3 Info' ? 'active' : ''}> L3 Info </button> 
        <button onClick={() => setSelectedLevel('L3 Maths')} className={selectedLevel === 'L3 Maths' ? 'active' : ''}> L3 Maths </button> 
        <button onClick={() => setSelectedLevel('M1 Genie')} className={selectedLevel === 'M1 Genie' ? 'active' : ''}> M1 Genie </button> 
        <button onClick={() => setSelectedLevel('M1 Image')} className={selectedLevel === 'M1 Image' ? 'active' : ''}> M1 Image </button> 
        <button onClick={() => setSelectedLevel('M1 Maths')} className={selectedLevel === 'M1 Maths' ? 'active' : ''}> M1 Maths </button> 
        <button onClick={() => setSelectedLevel('M2 Genie')} className={selectedLevel === 'M2 Genie' ? 'active' : ''}> M2 Genie </button> 
        <button onClick={() => setSelectedLevel('M2 Image')} className={selectedLevel === 'M2 Image' ? 'active' : ''}> M2 Image </button> 
        <button onClick={() => setSelectedLevel('M2 Maths')} className={selectedLevel === 'M2 Maths' ? 'active' : ''}> M2 Maths </button>
        </div>
      </div>

      {focus && (
        <div className="filter" style={{
          position: 'fixed',
          width: '70%',
          top: '18%',
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

      <TableContainer component={Paper} className="container" style={{ maxHeight: 350, height: 350 , border: '0.5px solid #E8EDDF', marginTop: '4%' }}>
        <Table stickyHeader>
          <TableBody>
            {filteredData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell sx={{
                  borderRight: '0.5px solid #E8EDDF',
                  width: '250px'
                }}>
                  {row.name}
                </TableCell>
                <TableCell>
                  {row.subjects.map((subject, subjectIndex) => {
                    const buttonKey = `${selectedLevel}-${rowIndex}-${subjectIndex}`;
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

      <p id='raccourci'> <SearchIcon /> Ctrl + k </p>

      <Dialog
        open={openDialog}
        onClose={clickClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id="alert-dialog-title">
           {selectData.subject}
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          <p> Prof : {selectData.name}</p>
          <FormControl>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              row
              defaultValue="Matin"
              name='radio-buttons-group'
            >
              <FormControlLabel value="Matin" control={<Radio/>} label="Matin"/>
              <FormControlLabel value="Apres-midi" control={<Radio/>} label="Apres-midi"/>
            </RadioGroup>
          </FormControl>
          <p>Heure</p>
          <p> Duree </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickClose}>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
