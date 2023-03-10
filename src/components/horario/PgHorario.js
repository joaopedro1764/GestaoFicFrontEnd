import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Input from '@material-ui/core/Input';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@material-ui/lab/Alert';
import { toast, ToastContainer, cssTransition } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import red from "@material-ui/core/colors/red";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import TablePagination from "@material-ui/core/TablePagination";
import MenuLateral from "../menu/MenuLateral";
import Slide from '@mui/material/Slide';
import "react-toastify/dist/ReactToastify.css";







const drawerWidth = 240;
//modal css
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))
const msgAlteracao = () => {

  console.log("entrei")

  toast.success("Usu??rio Alterado com Sucesso", {

    position: "top-right",

    autoClose: 1500,

    hideProgressBar: false,

    closeOnClick: true,

    pauseOnHover: true,

    theme: 'colored',

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined




  })

}


const PgHorario = () => {
  const [horario, setHorario] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [idiHorario, setidHorario] = useState([]);
  const [pegarHorario, setpegarHorario] = useState([])
  /* linhas maxima na coluna  */
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  /*  numero de pagina*/
  const [page, setPage] = React.useState(0);
  const classes = useStyles();
  const modalCadastroAbrindo = () => setOpen(true);
  const modalCadastroFechando = () => setOpen(false);
  const modalAlterarAbrindo = (id, horario) => {
    setOpen2(true)
    setidHorario(id)
    setpegarHorario(horario)

  };
  const modalAlterarFechando = () => {
    setOpen2(false)
  };


  /* pegando numero de pagina */
  const handleChangePage = (event, newPage) => {
    console.log("EVENTO" + event);

    console.log("PAGINA" + newPage);

    setPage(newPage);
  };
  /* zerano numero de pagina */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClick = () => {
    setOpen3(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen3(false);
  };

  useEffect(() => {
    getiHorario();

  }, []);


  const getiHorario = async () => {
    let result = await fetch(`http://localhost:8080/api/horario`)
    result = await result.json();
    setHorario(result)

  }


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const deletetarHorario = async (id) => {
    let result = await fetch(`http://localhost:8080/api/horario/${id}`, {
      method: "DELETE"
    });

    if (result) {

      getiHorario();

    }


  }
  const cadastroHorario = async (event) => {


    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    console.warn("teste", data)
    console.log("oi brasil", data.nome)
    console.warn("EVENTO", event.target)


    let obgj = {
      nome: data
    }
    console.warn(data)

    let result = await fetch(`http://localhost:8080/api/horario`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (result) {
      getiHorario();
    }

  }
  const alteraHorario = async (event) => {

    console.warn(event.target)

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    console.warn("teste", data)
    let obgj = {
      id: idiHorario,
      horario: data.horario

    }
    console.warn(obgj)
    let result = await fetch(`http://localhost:8080/api/horario/${idiHorario}`, {
      method: 'PUT',
      body: JSON.stringify(obgj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    if (result) {
      console.warn("ENTREEEEI")
      getiHorario();

    }




  }



  /* const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false); */

  /*  const handleDrawerToggle = () => {
     setMobileOpen(!mobileOpen);
   }; */

  /*const drawer = (


    <div>


      <Toolbar />
      <a href="/">
        <img style={{ width: 150, margin: 20, position: 'relative', bottom: 72, left: 20 }} src="https://upload.wikimedia.org/wikipedia/commons/8/8c/SENAI_S%C3%A3o_Paulo_logo.png" alt="Senai"></img>
      </a>
      <Divider />
      <List>
        <Button onClick={modalCadastroAbrindo} style={{ margin: 10 }} variant="contained">cadastrar  Horaio</Button>

        <Modal
          open={open}
          onClose={modalCadastroFechando}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style}>
            <h2 id="transition-modal-title">cadastro de horario</h2>
            <form onSubmit={cadastroHorario} >
              <TextField name="horario" type="time" defaultValue="00:00:00" label="horario" variant="outlined" 
           />
              <Button variant="contained" style={{ margin: 10 }} type="submit" >cadastrar</Button>
            </form>
          </Box>
        </Modal>
      </List>
      
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;*/



  return (
    <>



      <MenuLateral />


      <Box sx={{ display: 'flex', marginLeft: "80px" }}>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Modal
          open={open}
          onClose={modalCadastroFechando}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style}>
            <h2 id="transition-modal-title">cadastro de horario</h2>
            <form onSubmit={cadastroHorario} >
              <TextField name="horario" type="time" label="horario" variant="outlined"
              />
              <Button variant="contained" style={{ margin: 10 }} type="submit" >cadastrar</Button>
            </form>
          </Box>
        </Modal>

        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(0% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Button
            style={{ margin: 10, fontWeight: "bold" }}
            variant="contained"
            color="primary"
            size="large"
            onClick={modalCadastroAbrindo}
            className={classes.button}
            startIcon={<AddSharpIcon />}
          >
            NOVO
          </Button>

          <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              This is a success message!
            </Alert>
          </Snackbar>

          
          

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Horario cadastrado</StyledTableCell>
                  <StyledTableCell align="center">DELETAR</StyledTableCell>
                  <StyledTableCell align="center">ALTERAR</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {horario
                  .slice(
                    page * rowsPerPage,

                    page * rowsPerPage + rowsPerPage
                  )
                .map((obj) => (
                  <StyledTableRow key={obj.id}>
                    <StyledTableCell align="center">{obj.horario}</StyledTableCell>
                    <StyledTableCell align="center">< Button onClick={() => deletetarHorario(obj.id)} variant="contained"
                          size="large"
                          style={{ backgroundColor: "#FF0000" }} className={classes.button}
                          startIcon={
                            <DeleteIcon
                              style={{ position: "relative", left: "0.3em" }}
                            />
                          } ></Button></StyledTableCell>
                    <StyledTableCell align="center">< Button onClick={() => modalAlterarAbrindo(obj.id, obj.horario)} variant="contained"
                          size="large"
                          style={{ backgroundColor: "#FFD60A" }} className={classes.button} startIcon={
                            <BorderColorIcon
                              style={{
                                color: "#000",
                                position: "relative",
                                left: "0.2em",
                              }}
                            />
                          } ></Button></StyledTableCell>
                    <Modal
                      open={open2}
                      onClose={modalAlterarFechando}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"

                    >
                      <Box sx={style}>
                        <h2 id="transition-modal-title">alterar horario</h2>
                        <form onSubmit={alteraHorario}  >
                          <TextField name="horario" type="time" label="horario" defaultValue={pegarHorario} variant="outlined" />
                          <Button variant="contained" style={{ margin: 10 }} type="submit"  >alterar</Button>
                        </form>
                      </Box>
                    </Modal>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10, 15]}
            component="div"
            count={horario.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </>
  );
}

/**  ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
/**  window: PropTypes.func,*/
/**}; */

export default PgHorario;
