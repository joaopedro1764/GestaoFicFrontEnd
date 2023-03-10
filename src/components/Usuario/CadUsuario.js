import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import FolderSharedRoundedIcon from "@mui/icons-material/FolderSharedRounded";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import List from "@mui/material/List";
import { toast, ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateIcon from "@mui/icons-material/Create";
import SaveIcon from "@mui/icons-material/Save";
import Toolbar from "@mui/material/Toolbar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import TextField from "@mui/material/TextField";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { height } from "@mui/system";
import { ListItem } from "@mui/material";
import MenuLateral from "../menu/MenuLateral";

function PageUsuario() {
  //  USE ESTATE USADO PARA CONTROLAR O ESTADO DE UMA VARIAVEL
  // estado da modal
  const [open, setOpen] = useState(false);
  const [modalAlt, setModalAlt] = useState(false);
  // estado do obj do ususario
  const [objUsuario, setObjUsuario] = useState(usuario);
  // metodo que abre a modal
  const handleOpen = () => setOpen(true);
  // metodo que fecha a modal
  const handleClose = () => setOpen(false);
  // variavel que tem acesso a um array com todos os usuarios
  const [usuarios, setUsuario] = useState([]);
  // variavel que tem acesso a um array com todos os tipos de usuarios
  const [tipoUsuario, setTipoUsuario] = useState([]);

  // metodo que captura informa????es do input
  const capturarDados = (e) => {
    console.log(e.target.value);
    setObjUsuario({ ...objUsuario, [e.target.name]: e.target.value });
  };

  // REQUISI????O GET PARA PUXAR TODOS OS USUARIOS
  useEffect(() => {
    fetch("http://localhost:8080/api/usuario")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setUsuario(retorno_convertido)); //lista de usu??rios
  }, []);

  // REQUISI????O GET PARA PUXAR TODOS OS TIPOS DE USUARIOS
  useEffect(() => {
    fetch("http://localhost:8080/api/enum/tipoUsuario")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTipoUsuario(retorno_convertido)); //lista de usu??rios
  }, []);

  // fun????o que espera receber um id
  const alterar = async (id) => {
    // requisi????o ao back-end
    let resultado = await fetch("http://localhost:8080/api/usuario/" + id, {
      method: "PUT",
      body: JSON.stringify(objUsuario),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    // verifica se existe resultado
    if (resultado) {
      // atualiza a lista com o usuario alterado
      atualizaLista();
      // fecha a modal de alterar
      setModalAlt(false);
      // exibe a msg de altera????o concluida
      msgAlteracao();
    }
  };

  // metodo que efetua o cadastro do usuario
  const cadastrar = () => {
    fetch("http://localhost:8080/api/usuario", {
      method: "post",
      body: JSON.stringify(objUsuario),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }).then((retorno) => {
      //se o input estiver vazio, passar uma resposta de erro e enviar mensagem de erro
      if (retorno.status === 500 || retorno.status === 400) {
        msgCamposVazio();

        // se existir um email existente
      } else if (retorno.status === 409) {
        document.getElementById("email").value = ""; // Limpa o campo

        msgEmailDuplicados();
      } else if (retorno.status === 510) {
        document.getElementById("nif").value = ""; // Limpa o campo
        msgNifDuplicados();
      } else {
        //faz o processo de cadastro
        retorno.json().then((retorno_convertido) => {
          //exibir notifica????o de sucesso
          msgCadastro();
          atualizaLista();
          //atualiza a p??gina depois de um tempo
          setOpen(false);
        });
      }
    });
  };
  // metodo que capta o usuario que foi selecionado
  const selecionarUsuario = (indice) => {
    setObjUsuario(usuarios[indice]);
  };

  // metodo que atualiza a lista, puxando todos os usuarios da rest api
  const atualizaLista = async () => {
    const result = await fetch("http://localhost:8080/api/usuario"); // await = espera uma promessa
    const resultado = await result.json();
    setUsuario(resultado);
  };

  // metodo que deleta o usuario
  const deletar = async (id) => {
    let result = await fetch(`http://localhost:8080/api/usuario/${id}`, {
      method: "DELETE",
    });
    // caso exista um usuario a ser deletado, ele atualiza a lista assim removendo o usuario deletado
    if (result) {
      atualizaLista();
      msgExclusao();
    }
  };

  // metodo que limpa os inputs do form
  const limparForm = () => {
    setObjUsuario("");
  };

  // metodo que busca um usuario
  const buscaUsuario = async (event) => {
    // valor que esta sendo digitado no input de pesquisa
    let key = event.target.value;
    console.log(key);

    // verifica se existe 'valor'
    if (key) {
      // fazendo uma requisi????o na api de buscar e passando a key
      let result = await fetch(
        "http://localhost:8080/api/usuario/buscar/" + key
      );
      // tranformando a promessa em json
      result = await result.json();
      console.log(result);

      // verifica se existe algum resultado
      if (result) {
        // setando os usuarios que a api retornou de sua resposta de busca
        setUsuario(result);
      }

      // caso n??o exista chave, atualiza a lista
    } else {
      atualizaLista();
    }
  };

  // toda vez que a modal ?? chamada, ela sera limpa e fechada
  const clearClose = () => {
    handleClose();
    limparForm();
  };

  // metodo de msg de cadastro efetuado com sucesso
  const msgCadastro = () => {
    toast.success("Usu??rio Cadastrado com Sucesso", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  // registros duplicados
  const msgEmailDuplicados = () => {
    toast.error("Email ja esta associado a um usuario", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const msgNifDuplicados = () => {
    toast.error("Nif ja esta associado a um usuario", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const msgCamposVazio = () => {
    toast.warn("Preencha os Campos Corretamente", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  // metodo de msg de exclus??o feita com sucesso
  const msgExclusao = () => {
    toast.error("Usu??rio Removido com Sucesso", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  // metodo de msg de altera????o feita com sucesso
  const msgAlteracao = () => {
    toast.info("Usu??rio Alterado com Sucesso", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <MenuLateral/>
      
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
        onClose={clearClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <form>
            <div>
              <h2 style={titleModal}>ADICIONAR USU??RIO</h2>
              <TextField
                id="nome"
                sx={styleTextField}
                className="textField"
                onChange={capturarDados}
                name="nome"
                type="text"
                label="NOME"
                variant="outlined"
              />
              <InputLabel id="demo-simple-select-label">
                Tipo Usuario
              </InputLabel>
              <select
                id="tipoUsuario"
                style={styleSelect}
                name="tipoUsuario"
                required
                className="form-control"
                onChange={capturarDados}
              >
                <Box></Box>

                <option>Selecione:</option>

                {tipoUsuario.map((obj, indice) => (
                  <option key={indice}>{obj}</option>
                ))}
              </select>
              <TextField
                required
                sx={styleTextField}
                id="nif"
                onChange={capturarDados}
                name="nif"
                type="text"
                label="NIF"
                variant="outlined"
              ></TextField>
              <TextField
                autoComplete="email"
                sx={styleTextField}
                id="email"
                onChange={capturarDados}
                name="email"
                type="email"
                label="EMAIL"
                variant="outlined"
              />
            </div>
            <Button
              variant="contained"
              style={btnCad}
              onClick={() => {
                cadastrar();
              }}
            >
              <SaveIcon sx={{ marginRight: "10px" }} />
              Cadastrar
            </Button>

            <Button
              variant="contained"
              color="error"
              style={btnClose}
              onClick={() => {
                limparForm();
                handleClose();
              }}
            >
              <CancelPresentationIcon sx={{ marginRight: "10px" }} />
              Fechar
            </Button>
          </form>
          <Paper elevation={0}>
            <img
              style={imgStyle}
              src="https://img.freepik.com/vetores-gratis/ilustracao-em-vetor-conceito-abstrato-de-visualizacao-de-design-interativo-visualizacao-interativa-arquitetura-de-virtualidade-experiencia-do-usuario-de-realidade-virtual-metafora-abstrata-de-design-de-interacao_335657-2298.jpg"
            />
          </Paper>
        </Box>
      </Modal>
      <Modal
        open={modalAlt}
        onClose={clearClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <form>
            <div>
              <h2 style={titleModal}>
                <CreateIcon
                  sx={{
                    color: "#a2d2ff",
                    width: "100",
                    border: "none",
                    marginRight: 2,
                  }}
                />{" "}
                ALTERAR USU??RIO
              </h2>
              <TextField
                id="nome"
                defaultValue={objUsuario.nome}
                sx={styleTextField}
                className="textField"
                onChange={capturarDados}
                name="nome"
                type="text"
                label="NOME"
                variant="outlined"
              />
              <InputLabel id="demo-simple-select-label">
                Tipo Usuario
              </InputLabel>
              <select
                defaultValue={objUsuario.tipoUsuario}
                id="tipoUsuario"
                style={styleSelect}
                name="tipoUsuario"
                required
                className="form-control"
                onChange={capturarDados}
              >
                <Box></Box>

                <option>Selecione:</option>

                {tipoUsuario.map((obj, indice) => (
                  <option key={indice}>{obj}</option>
                ))}
              </select>
              <TextField
                defaultValue={objUsuario.nif}
                required
                sx={styleTextField}
                id="nif"
                onChange={capturarDados}
                name="nif"
                type="text"
                label="NIF"
                variant="outlined"
              ></TextField>
              <TextField
                defaultValue={objUsuario.email}
                autoComplete="email"
                sx={styleTextField}
                id="email"
                onChange={capturarDados}
                name="email"
                type="email"
                label="EMAIL"
                variant="outlined"
              />
            </div>
            <Button
              variant="contained"
              style={btnCad}
              onClick={() => {
                alterar(objUsuario.id);
              }}
            >
              <CreateIcon
                sx={{
                  color: "#ffff",
                  width: "100",
                  border: "none",
                  marginRight: "10px",
                }}
              />
              Alterar
            </Button>

            <Button
              variant="contained"
              color="error"
              style={btnClose}
              onClick={() => {
                limparForm();
                setModalAlt(false);
              }}
            >
              <CancelPresentationIcon sx={{ marginRight: "10px" }} />
              Fechar
            </Button>
          </form>
          <Paper elevation={0}>
            <img style={imgStyle} src="/img/img1.png" />
          </Paper>
        </Box>
      </Modal>
      <Paper
        sx={{
          maxWidth: 12000,
          marginTop: "0px",
          marginLeft: "20em",
          overflow: "hidden",

        }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          style={{marginTop: 100}}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          <Toolbar style={{marginBottom:20}}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon sx={{ display: "block", color: "#01161e" }} />
              </Grid>
              <Grid item xs>
                <TextField
                  onChange={buscaUsuario}
                  fullWidth
                  placeholder="Pesquise pelo nome do usuario"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: "default", width: "200px" },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  style={{ backgroundColor: "#a2d2ff" }}
                  sx={{ mr: 1 }}
                >
                  <AddCircleIcon sx={{ marginRight: "12px", color: "#ffff" }} />{" "}
                  ADICIONAR USU??RIO
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          <table
            style={{ width: "100%" }}
            className="table  table-lg  table-hover"
          >
            <thead
              style={{ backgroundColor: "#212529", color: "white" }}
              className="thead"
            >
              <tr>
                <th scope="col">NOME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">NIF</th>
                <th scope="col">TIPO USU??RIO</th>
                <th scope="col">ALTERAR</th>
                <th scope="col">DELETAR</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((obj, indice) => (
                <tr key={indice}>
                  <th scope="row">{obj.nome}</th>
                  <th scope="row">{obj.email}</th>
                  <th scope="row">{obj.nif}</th>
                  <th scope="row">{obj.tipoUsuario}</th>
                  <th scope="row">
                    <Button
                      variant="contained"
                      style={btnAlterar}
                      onClick={() => {
                        selecionarUsuario(indice);
                        setModalAlt(true);
                      }}
                    >
                      <CreateIcon sx={{ marginRight: "10px" }} />
                      Alterar
                    </Button>
                  </th>
                  <th scope="row">
                    <Button
                      variant="contained"
                      style={btnExcluir}
                      onClick={() => deletar(obj.id)}
                    >
                      <DeleteIcon sx={{ marginRight: "10px" }} />
                      Remover
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </Typography>
      </Paper>
    </>
  );
}

const usuario = {
  id: "",
  nome: "",
  nif: "",
  tipoUsuario: "",
  email: "",
  senha: "",
};

const imgStyle = {
  border: "none",
  width: "400px",
  height: "400px",
  margin: "50px auto",
  position: "center",
};

const styleTextField = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "30px",
  width: "450px",
};

const btnAlterar = {
  backgroundColor: "#caf0f8",
};

const btnExcluir = {
  backgroundColor: "#f9564f",
};

const styleSelect = {
  width: "235px",
  height: "40px",
  marginBottom: "30px",
};

const styleTitle = {
  textAlign: "center",
  marginBottom: "30px",
  color: "blue",
};

const titleModal = {
  color: "#a2d2ff",
  marginBottom: "65px",
  boxShadow: 24,
};
const btnCad = {
  marginTop: "20px",
  borderRadius: "10px",
  color: "#ffff",
  backgroundColor: "#a2d2ff",
};

const btnClose = {
  marginTop: "20px",
  marginLeft: "20px",
  borderRadius: "10px",
  color: "#ffff",
  backgroundColor: "#f08080",
};

const imgLogo = {
  width: "200px",
  borderRadius: "20px",
};

const style = {
  position: "absolute",
  top: "50%",
  display: "flex",
  flexDirection: "row",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  borderRadius: "37px",
  border: "3px solid #a2d2ff",
  boxShadow: 240,
  p: 4,
};
export default PageUsuario;
