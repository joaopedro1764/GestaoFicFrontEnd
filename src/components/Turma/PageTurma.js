import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import { CurtainsOutlined } from "@mui/icons-material";
import "./turma.css";
import MenuLateral from "../menu/MenuLateral";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import TablePagination from "@mui/material/TablePagination";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuItem from "@mui/material/MenuItem";

import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { yellow } from "@mui/material/colors";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function CadTurma() {
  //  USE ESTATE USADO PARA CONTROLAR O ESTADO DE UMA VARIAVEL

  // variavel que tem acesso a um array com todas as turmas
  const [qtdMatriculas, setqtdMatriculas] = useState();
  // variavel que tem acesso a um array com todas as turmas
  const [turmas, setTurma] = useState([]);
  // variavel que tem acesso a um array com os instrutores
  const [instrutor, setInstrutor] = useState([]);
  // variavel que tem acesso a um array com os instrutores
  const [idInstrutor, setidInstrutor] = useState([]);
  // variavel que tem acesso a um array com o horario
  const [horarios, setHorarios] = useState([]);
  // variavel que tem acesso a um array com os cursos
  const [curso, setCurso] = useState([]);
  const [dataInicio, setDataInicio] = useState();
  const [dataTermino, setDataTermino] = useState();
  const [simEnao, setsimEnao] = useState();
  // variavel que tem acesso a um array com os cursos
  const [idCurso, setidCurso] = useState([]);
  // variavel que tem acesso a um array com os cursos setnumMaxVagas
  const [codigo, setCodigo] = useState();
  // variavel que tem acesso a um array com os cursos
  const [valor, setValor] = useState();
  // variavel que tem acesso a um array com os cursos
  const [numMaxVagas, setnumMaxVagas] = useState();
  const [numMinVagas, setnumMinVagas] = useState();
  // variavel que tem acesso a um array com o periodo
  const [periodo, setPeriodo] = useState([]);
  // variavel que tem acesso a um array com o periodo
  const [ValuePeriodo, setvaluePeriodo] = useState([]);
  // variavel que tem acesso a um array com o status
  const [status, setStatus] = useState([]);
  // variavel que tem acesso a um array com o status
  const [ValueStatus, setvalueStatus] = useState([]);
  // variavel que tem acesso a um array com o ambiente
  const [ambiente, setAmbiente] = useState([]);
  // variavel que tem acesso a um array com o ambiente
  const [idAmbiente, setidAmbiente] = useState([]);
  // variavel que tem acesso a um array com os dias da semana
  const [diaSemana, setDiaSemana] = useState([]);
  // variavel que tem acesso a um array com os dias da semana
  const [valuediaSemana, setvalueDiaSemana] = useState([]);

  const [diasDaTurma, setDiasDaTurma] = useState([]);

  const [horarioInicioValue, setHorarioInicioValue] = useState([]);

  const [horarioFinalValue, setHorarioFinalValue] = useState([]);

  const [idTurma, setidTurma] = useState([]);

  const dataInicioFormatada = dataInicio;
  const dataTerminoFormatada = dataTermino;

  const valorValue = (e) => {
    setValor({ ...valor, [e.target.name]: e.target.value });
  };

  const statusValor = (e) => {
    setStatus({ ...status, [e.target.name]: e.target.value });
  };

  const cursoAlt = (e) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };

  const turma = {
    id: 0,
    qtdMatriculas: qtdMatriculas,
    instrutor: { id: idInstrutor },
    curso: { id: idCurso },
    periodo: ValuePeriodo,
    dataInicio: dataInicioFormatada,
    dataTermino: dataTerminoFormatada,
    valor: valor,
    status: ValueStatus,
    ambiente: { id: idAmbiente },
    numMaxVagas: numMaxVagas,
    numMinVagas: numMinVagas,
    simEnao: simEnao,
    diaSemana: valuediaSemana,
    horarioInicio: { id: horarioInicioValue },
    horarioTermino: { id: horarioFinalValue },
    //diasDaTurma: setDiasDaSemana
  };
  console.log("dia semana ", valuediaSemana)
  // estado do obj da turma
  const [objTurma, setObjTurma] = useState(turma);
  // estado da modal
  const [open, setOpen] = useState(false);
  const [modalAlt, setModalAlt] = useState(false);
  // metodo que abre a modal
  const handleOpen = () => setOpen(true);
  // metodo que fecha a modal
  const handleClose = () => setOpen(false);

  const handleClose2 = () => setOpen(false);
  const values = {
    someDate: "2022-09-19",
  };

  console.log("oooooooooooooooooooooo ", idCurso.id);
  // REQUISI????O GET PARA PUXAR TODAS AS TURMAS
  useEffect(() => {
    fetch("http://localhost:8080/api/turma")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTurma(retorno_convertido)); //lista de turmas
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/instrutor")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setInstrutor(retorno_convertido)); //lista de instrutores
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/horario")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setHorarios(retorno_convertido)); //lista de horario
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/curso")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setCurso(retorno_convertido)); //lista de curso
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/enum/periodo")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setPeriodo(retorno_convertido)); //lista de periodos
  }, []);

  useEffect(() => {
    
    fetch("http://localhost:8080/api/enum/status")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setStatus(retorno_convertido)); //lista de status
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/ambiente")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setAmbiente(retorno_convertido)); //lista de ambiente
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/enum/diasSemana")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setDiaSemana(retorno_convertido)); //lista de dia da semana
  }, []);

  const erroDataIgual = () => {
    toast.error("A data de inicio n??o pode ser igual a data final!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      draggable: true,
      progress: undefined,
    });
  };

  const erroDataMaiorFinal = () => {
    toast.error("A data de inicio n??o pode ser depois da data final!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      draggable: true,
      progress: undefined,
    });
  };

  const erroDataInicioMaiorHoje = () => {
    toast.error("A data de inicio n??o pode ser antes de hoje!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      draggable: true,
      progress: undefined,
    });
  };

  // metodo que efetua o cadastro da turma
  const cadastrar =  async(event) => {
    /* pegar todos  os valores do evento */
    const formData = new FormData(event.target);
    /*formata em um objeto em  json */
    const data = Object.fromEntries(formData);
    console.log( "oi dia semana  ",data.diasDaTurma)
    

    const turmas = {
        id: 0,
        qtdMatriculas: qtdMatriculas,
        instrutor: { id: idInstrutor },
        curso: { id: idCurso },
        periodo: ValuePeriodo,
        dataInicio: dataInicioFormatada,
        dataTermino: dataTerminoFormatada,
        valor: valor,
        status: ValueStatus,
        ambiente: { id: idAmbiente },
        numMaxVagas: numMaxVagas,
        numMinVagas: numMinVagas,
        simEnao: simEnao,
        diaSemana: valuediaSemana,
        horarioInicio: { id: horarioInicioValue },
        horarioTermino: { id: horarioFinalValue },
        diasDaTurma: data.diasDaTurma
      };
      console.log( "oi turmas" ,turmas)

    //requisi????o ao back end
    fetch("http://localhost:8080/api/turma", {
      method: "post",
      body: JSON.stringify(turmas),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      // convertendo a resposta da promessa em json
      .then((retorno) => {
        if (retorno.status === 409) {
          erroDataIgual();
        } else if (retorno.status === 418) {
          erroDataMaiorFinal();
        } else if (retorno.status === 401) {
          erroDataInicioMaiorHoje();
        } else {
          retorno
            .json()
            // pegando o retorno convertido
            .then((retorno_convertido) => {
              // metodo que atualiza a lista, que faz com que ao clicar seja adicionado "automaticamente"
              atualizaLista();

              setInterval(function () {
                window.location.reload();
              }, 1500);
              // exibindo a msg de aviso de cadastro
              msgCadastro();
            });
        }
      });
  };

  // fun????o que espera receber um id
  const alterar = async (event) => {
   
 /* pegar todos  os valores do evento */
    
 const formData = new FormData(event.target);
 /*formata em um objeto em  json */
 const data = Object.fromEntries(formData);
 console.log( "oi data.qtdMatriculas altera ",data.qtdMatriculas)
 console.log( "oi data.instrutor altera ",data.instrutor)
 console.log( "oi  ,data.diasDaTurma altera   ",data.diasDaTurma)
 console.log( "oi dia data.dataTermino  altera ",data.dataTermino)


 const turmasA = {
     id: idTurma,
     qtdMatriculas: data.qtdMatriculas,
     instrutor: { id: data.instrutor },
     curso: { id: data.curso },
     periodo: data.periodo,
     dataInicio: data.dataInicio,
     dataTermino: data.dataTermino,
     valor: data.valor,
     status: data.status,
     ambiente: { id: data.ambiente },
     numMaxVagas: data.numMaxVagas,
     numMinVagas: data.numMinVagas,
     simEnao: simEnao,
     diaSemana: data.diasDaTurma,
     horarioInicio: { id: data.horarioInicio },
     horarioTermino: { id: data.horarioFinal },
     diasDaTurma: data.diasDaTurma
   };
   console.warn("oi alterar: ",turmasA)
   console.log( "oi turmasss" ,turmas)
   console.log("oiiiiiiiiiii")
   
    let result = await fetch(
      "http://localhost:8080/api/turma/" + idTurma,

      {
        method: "PUT",

        body: JSON.stringify(turmasA),

        headers: {
          "Content-type": "application/json",

          Accept: "application/json",
        },
      }
    );
    if (result) {
      setOpen(false);
      setInterval(function () {
        window.location.reload();
      }, 50);
    }
  };

  // metodo que capta a turma que foi selecionado
  const selecionarTurma = (
    id,
    codigo,
    curso,
    instrutor,
    qtdMatriculas,
    periodo,
    valor,
    status,
    ambiente,
    numMaxVagas,
    numMinVagas,
    diaSemana,
    dataInicio,
    dataTermino,
    horarioInicio,
    horarioTermino,
    diasDaTurma
  ) => {
    setidTurma(id);
    setCodigo(codigo);
    setidCurso(curso);
    setidInstrutor(instrutor);
    setqtdMatriculas(qtdMatriculas);
    setvaluePeriodo(periodo);
    setValor(valor);
    setvalueStatus(status);
    setidAmbiente(ambiente);
    setnumMaxVagas(numMaxVagas);
    setnumMinVagas(numMinVagas);
    setvalueDiaSemana(diaSemana);
    setDataInicio(dataInicio);
    setDataTermino(dataTermino);
    setHorarioInicioValue(horarioInicio);
    setHorarioFinalValue(horarioTermino);
    setDiasDaTurma(diasDaTurma.split(','))
  };
  console.log("diasDaTurma: ",diasDaTurma )
  console.log("[horarioInicioValue: ", horarioInicioValue.id) 
  // metodo que atualiza a lista, puxando todos a turma cadastrada da rest api
  const atualizaLista = async () => {
    const result = await fetch("http://localhost:8080/api/turma"); // await = espera uma promessa
    const resultado = await result.json();
    setTurma(resultado);
  };

  // metodo que deleta a turma
  const deletar = async (id) => {
    let result = await fetch(`http://localhost:8080/api/turma/${id}`, {
      method: "DELETE",
    });
    // caso j?? exista uma turma a ser deletado, ele atualiza a lista assim removendo a turma deletado
    if (result) {
      atualizaLista();
      msgExclusao();
    }
  };

  const capturarDados = (e) => {
    setObjTurma({ ...objTurma, [e.target.name]: e.target.value });
  };

  // metodo que limpa os inputs do form
  const limparForm = () => {
    setObjTurma("");
  };

  // metodo que busca uma turma
  const buscaTurma = async (event) => {
    // valor que esta sendo digitado no input de pesquisa
    let key = event.target.value;

    // verifica se existe 'valor'
    if (key) {
      // fazendo uma requisi????o na api de busca e passando a key
      let result = await fetch(
        "http://localhost:8080/api/turma/buscarTurma/" + key
      );
      // tranformando a promessa em json
      result = await result.json();

      // verifica se existe algum resultado
      if (result) {
        // setando as turmas que a api retornou de sua resposta de busca
        setTurma(result);
      }

      // caso n??o exista chave, atualiza a lista
    } else {
      atualizaLista();
    }
  };

  const buscaTurmaAno = async (event) => {
    // valor que esta sendo digitado no input de pesquisa
    let key = event.target.value;

    // verifica se existe 'valor'
    if (key) {
      // fazendo uma requisi????o na api de busca e passando a key
      let result = await fetch(
        "http://localhost:8080/api/turma/buscarTurmaAno/" + key
      );
      // tranformando a promessa em json
      result = await result.json();

      // verifica se existe algum resultado
      if (result) {
        // setando as turmas que a api retornou de sua resposta de busca
        setTurma(result);
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

  const clearClose2 = () => {
    handleClose2();
    limparForm();
  };

  const [modalAlterar, setShow] = useState(false);

  const [modalCadastrar, setShowCadastrar] = useState(false);

  //quando handleClose ?? chamado ele da um false no show e fecha a modal
  const fecharModalAlterar = () => setShow(false);
  //quando handleShow ?? chamado ele da um true no show e abre a modal
  const abrirModalAlterar = () => setShow(true);

  const abrirModalCadastrar = () => setShowCadastrar(true);

  const fecharModalCadastrar = () => setShowCadastrar(false);

  // metodo de msg de cadastro efetuado com sucesso
  const msgCadastro = () => {
    toast.success("Turma Cadastrado com Sucesso", {
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

  // metodo de msg de exclus??o feita com sucesso
  const msgExclusao = () => {
    toast.success("Turma Removido com Sucesso", {
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

  // metodo de msg de altera????o feita com sucesso
  const msgAlteracao = () => {
    toast.warn("Turma Alterado com Sucesso", {
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

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    console.log("EVENTO" + event);

    console.log("PAGINA" + newPage);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const DiasDaSemana = [
    "SEG",
    "TER",
    "QUA",
    "QUI",
    "SEX",
    "SAB",
  ]
 ;

  const [diasDaSemana, setDiasDaSemana] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDiasDaSemana(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setDiasDaTurma(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(value)
  };

  return (
    <>
      <MenuLateral />

      <header style={{position:"fixed"}}>
        <div className="divBotaoAdd">
          <Button
            className="botaoAdd"
            onClick={abrirModalCadastrar}
            variant="contained"
            color="primary"
          >
            <i class="bi bi-plus-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                />
              </svg>
            </i>
            Novo
          </Button>
        </div>

        <div className="divTarefas">
          <Button
            className="botaotarefas"
            href="/tarefa"
            variant="contained"
            color="primary"
          >
            <AssignmentIcon />
            <i class="bi bi-plus-lg"></i>Tarefas
          </Button>
        </div>

        <form className="formBusca">
          <input
            //faz a busca
            onChange={buscaTurmaAno}
            name="parametro"
            required="required"
            className="buscarInput"
            type="date"
          />
        </form>
      </header>

      <div className="conteudoTabela">
        <TableContainer className="tabelaContainer">
          <Table
            sx={{ minWidth: 1500 }}
            aria-label="customized table"
            className="tabelaTurma"
          >
            <TableHead className="theadTurma">
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>C??digo de turma</StyledTableCell>
                <StyledTableCell>Curso</StyledTableCell>
                <StyledTableCell>Instrutor</StyledTableCell>
                <StyledTableCell>Quantidade de matricula</StyledTableCell>
                <StyledTableCell>Per??odo</StyledTableCell>
                <StyledTableCell>Valor</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Ambiente</StyledTableCell>
                <StyledTableCell>N?? M??ximo de vagas</StyledTableCell>
                <StyledTableCell>N?? Minimo de vagas</StyledTableCell>
                <StyledTableCell>Dias da semana</StyledTableCell>
                <StyledTableCell>Data de inicio</StyledTableCell>
                <StyledTableCell>Data de T??rmino</StyledTableCell>
                <StyledTableCell>Horario de Inicio</StyledTableCell>
                <StyledTableCell>Horario de t??rmino</StyledTableCell>
                <StyledTableCell>Alterar</StyledTableCell>
                <StyledTableCell>Excluir</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {turmas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(
                  ({
                    id,
                    codigo,
                    curso,
                    instrutor,
                    qtdMatriculas,
                    periodo,
                    valor,
                    status,
                    ambiente,
                    numMaxVagas,
                    numMinVagas,
                    diaSemana,
                    dataInicio,
                    dataTermino,
                    horarioInicio,
                    horarioTermino,
                    diasDaTurma
                  }) => (
                    <StyledTableRow>
                      <StyledTableCell>{id}</StyledTableCell>
                      <StyledTableCell>{codigo}</StyledTableCell>
                      <StyledTableCell>{curso.nome}</StyledTableCell>
                      <StyledTableCell>{instrutor.nome}</StyledTableCell>
                      <StyledTableCell>{qtdMatriculas}</StyledTableCell>
                      <StyledTableCell>{periodo}</StyledTableCell>
                      <StyledTableCell>{valor}</StyledTableCell>
                      <StyledTableCell>{status}</StyledTableCell>
                      <StyledTableCell>{ambiente.nome}</StyledTableCell>
                      <StyledTableCell>{numMaxVagas}</StyledTableCell>
                      <StyledTableCell>{numMinVagas}</StyledTableCell>
                      <StyledTableCell>{diasDaTurma}</StyledTableCell>
                      <StyledTableCell>{dataInicio}</StyledTableCell>
                      <StyledTableCell>{dataTermino}</StyledTableCell>
                      <StyledTableCell>{horarioInicio.horario}</StyledTableCell>
                      <StyledTableCell>
                        {horarioTermino.horario}
                      </StyledTableCell>

                      <StyledTableCell>
                        <button
                          className="botaoAlterarTurma"
                          onClick={() => {
                            selecionarTurma(
                              id,
                              codigo,
                              curso,
                              instrutor,
                              qtdMatriculas,
                              periodo,
                              valor,
                              status,
                              ambiente,
                              numMaxVagas,
                              numMinVagas,
                              diaSemana,
                              dataInicio,
                              dataTermino,
                              horarioInicio,
                              horarioTermino,
                              diasDaTurma
                            );
                            console.log("diasDaTurma: ",diasDaTurma)
                            abrirModalAlterar();
                          }}
                        >
                          <ModeEditOutlinedIcon />
                        </button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="botaoDeleteTurma"
                          onClick={() => deletar(id)}
                        >
                          <DeleteForeverOutlinedIcon />
                        </button>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                )}
            </TableBody>
          </Table>
          <TablePagination
            sx={{
              marginTop: "40px",

              alignItems: "center",

              textAlign: "center",
            }}
            rowsPerPageOptions={[3, 5, 10, 15]}
            component="div"
            count={turmas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>

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
        show={modalAlterar}
        onHide={fecharModalAlterar}
        size="xl"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Alterar</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{height:610}}>
          <div>
            <img
              className="imagemModal"
              src={require("./imagemModal.png")}
            ></img>
          </div>
          <div className="modalCad">
            <form className="formModalCad"    onSubmit={alterar}   >
              {/*  input de quantidade de m??triculas */}
              {/*  <TextField defaultValue={objTurma.id} sx={styleTextField} className="textField" name="qtdMatriculas" variant="outlined" disabled={true} />*/}

              <div className="parte1">
                <TextField
                  value={qtdMatriculas}
                  sx={styleTextField}
                  className="textField"
                  onChange={(e) => {
                    setqtdMatriculas(e.target.value);
                    capturarDados(e);
                  }}
                  name="qtdMatriculas"
                  type="number"
                  label="qtd de Matriculas"
                  variant="standard"
                />

                <TextField
                  value={numMaxVagas}
                  sx={styleTextField}
                  className="textField"
                  onChange={(e) => {
                    setnumMaxVagas(e.target.value);
                    capturarDados(e);
                  }}
                  name="numMaxVagas"
                  type="number"
                  label="M??ximo de vagas:"
                  variant="standard"
                />
              </div>

              <div className="parte2">
                <TextField
                  value={valor}
                  sx={styleTextField}
                  className="textField"
                  onChange={(e) => {
                    {
                      setValor(e.target.value);
                      capturarDados(e);
                    }
                  }}
                  name="valor"
                  type="text"
                  label="VALOR"
                  variant="standard"
                />

                <TextField
                  value={numMinVagas}
                  sx={styleTextField}
                  className="textField"
                  onChange={(e) => {
                    setnumMinVagas(e.target.value);
                    capturarDados(e);
                  }}
                  name="numMinVagas"
                  type="number"
                  label="Minimo de vagas"
                  variant="standard"
                />
              </div>

              <div className="parte3">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Ambiente
                  </InputLabel>
                  <Select // select de ambiente
                    defaultValue={idAmbiente.id}
                    name="ambiente"
                    required
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                 
                  >
                    {ambiente.map((obj, indice) => (
                      <MenuItem value={obj.id} selected={obj.id == idAmbiente.id } key={indice}>
                        {obj.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                  
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Cursos:
                  </InputLabel>
                  <Select // select de curso
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name="curso"
                    required
                    defaultValue={idCurso.id}
                   
                  >
                    {curso.map((obj) => (
                      <MenuItem value={obj.id} selected={obj.id == idCurso.id }>{obj.nome}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
     
              </div>
              

              <div className="select1">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Instrutor:
                  </InputLabel>
                  <Select // select de instrutores
                    name="instrutor"
                    required
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    defaultValue={idInstrutor.id}
                  
                  >
                    {instrutor.map((obj, indice) => (
                      <MenuItem value={obj.id} selected={obj.id == idInstrutor.id} key={indice}>  {obj.nome}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                
                

                
              </div>

              

              <div className="select2">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Periodo:
                  </InputLabel>
                  <Select //select de per??odo
                    defaultValue={ValuePeriodo}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name="periodo"
                    required
                   
                    
                  >
                    {periodo.map((obj, indice) => (
                      <MenuItem value={obj} selected={obj == ValuePeriodo} key={indice}>
                        {obj}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Horario Inicio:
                  </InputLabel>
                  <Select //select de per??odo
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name="horarioInicio"
                    required
                    defaultValue={horarioInicioValue.id}
                  
                  >
                    {horarios.map((obj, indice) => (
                      <MenuItem value={obj.id} selected={obj.id == horarioInicioValue.id} key={indice}>
                        {obj.horario}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="select3">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Status:
                  </InputLabel>
                  <Select //select de status
                    defaultValue={ValueStatus}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name="status"
                    required
                   
                  >
                    {status.map((obj, indice) => (
                      <MenuItem value={obj} selected={indice == ValueStatus} key={indice}>
                        {obj}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

               

                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Horario T??rmino:
                  </InputLabel>
                  <Select //select de per??odo
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name="horarioFinal"
                    required
                    defaultValue={horarioFinalValue.id}
                 
                  
                  
                    
                  >
                    {horarios.map((obj, indice) => (
                      <MenuItem value={obj.id} selected={obj.id == horarioFinalValue.id} key={indice} >
                        {obj.horario}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <FormControl sx={{ m: 1, width: 300,top:500, left:-10}}>
                  <InputLabel id="demo-multiple-checkbox-label">Dias da Semana</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    name="diasDaTurma"
                    multiple
                    defaultValue={diasDaTurma}
                    onChange={handleChange2}
                    input={<OutlinedInput label="Dias da Semana" />}
                    renderValue={selected => selected.join(",")}
                    MenuProps={MenuProps}
                  >
                    {DiasDaSemana.map((dias) => (
                      <MenuItem key={dias} value={dias}>
                        
                        {console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr "+diasDaTurma)}
                        {console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww "+dias)}
                        <Checkbox checked={diasDaTurma.indexOf(dias) > -1} />
                        <ListItemText primary={dias} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              
              <div>
                <div className="horarioInicio" style={{left:30}}>
                  <TextField
                    sx={estiloData}
                    name="dataInicio"
                    label="Data inicio"
                    onChange={(e) => {
                      setDataInicio(e.target.value);
                      capturarDados(e);
                    }}
                    InputLabelProps={{ shrink: true, required: true }}
                    type="date"
                    variant="standard"
                    value={dataInicioFormatada}
                  />
                </div>

                <div className="horarioFinal" style={{left:285}}>
                  <TextField
                    sx={estiloData}
                    variant="standard"
                    label="Data Terminio"
                    name="dataTermino"
                    onChange={(e) => {
                      setDataTermino(e.target.value);
                      capturarDados(e);
                    }}
                    InputLabelProps={{ shrink: true, required: true }}
                    type="date"
                    value={dataTerminoFormatada}
                  />
                </div>
              </div>
             
              <div class="parteBotao2" style={{left:330, top:535}}>
                <Button
                
                  type="submit"
                >
                  Alterar
                </Button>

      
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={modalCadastrar}
        onHide={fecharModalCadastrar}
        size="xl"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{height:610}}>
          <div>
            <img
              className="imagemModal"
              src={require("./imagemModal.png")}
            ></img>
          </div>
          <div className="modalCad">
            <form className="formModalCad"    onSubmit={cadastrar}   >
              {/*  input de quantidade de m??triculas */}
              {/*  <TextField defaultValue={objTurma.id} sx={styleTextField} className="textField" name="qtdMatriculas" variant="outlined" disabled={true} />*/}

              <div className="parte1">
                <TextField
                  value={qtdMatriculas}
                  sx={styleTextField}
                  className="textField"
                  onChange={(e) => {
                    setqtdMatriculas(e.target.value);
                    capturarDados(e);
                  }}
                  name="qtdMatriculas"
                  type="number"
                  label="qtd de Matriculas"
                  variant="standard"
                />

                <TextField
                  value={numMaxVagas}
                  sx={styleTextField}
                  className="textField"
                  onChange={(e) => {
                    setnumMaxVagas(e.target.value);
                    capturarDados(e);
                  }}
                  name="numMaxVagas"
                  type="number"
                  label="M??ximo de vagas:"
                  variant="standard"
                />
              </div>

              <div className="parte2">
                <TextField
                  value={valor}
                  sx={styleTextField}
                  className="textField"
                  onChange={(e) => {
                    {
                      setValor(e.target.value);
                      capturarDados(e);
                    }
                  }}
                  name="valor"
                  type="text"
                  label="VALOR"
                  variant="standard"
                />

                <TextField
                  value={numMinVagas}
                  sx={styleTextField}
                  className="textField"
                  onChange={(e) => {
                    setnumMinVagas(e.target.value);
                    capturarDados(e);
                  }}
                  name="numMinVagas"
                  type="number"
                  label="Minimo de vagas"
                  variant="standard"
                />
              </div>

              <div className="parte3">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Ambiente
                  </InputLabel>
                  <Select // select de ambiente
                    value={idAmbiente}
                    name="ambiente"
                    required
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={(e) => {
                      setidAmbiente(e.target.value);
                      capturarDados(e);
                    }}
                  >
                    {ambiente.map((obj, indice) => (
                      <MenuItem value={obj.id} key={indice}>
                        {obj.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                  
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Cursos:
                  </InputLabel>
                  <Select // select de curso
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name="curso"
                    required
                    value={idCurso}
                    onChange={(e) => {
                      setidCurso(e.target.value);
                      capturarDados(e);
                    }}
                  >
                    {curso.map((obj) => (
                      <MenuItem value={obj.id}>{obj.nome}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
     
              </div>
              

              <div className="select1">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Instrutor:
                  </InputLabel>
                  <Select // select de instrutores
                    name="instrutor"
                    required
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={idInstrutor}
                    onChange={(e) => {
                      setidInstrutor(e.target.value);
                      capturarDados(e);
                    }}
                  >
                    {instrutor.map((obj, indice) => (
                      <MenuItem value={obj.id}>{obj.nome}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                
                

                
              </div>

              

              <div className="select2">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Periodo:
                  </InputLabel>
                  <Select //select de per??odo
                    defaultValue={objTurma.periodo}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name="periodo"
                    required
                    value={ValuePeriodo}
                    onChange={(e) => {
                      setvaluePeriodo(e.target.value);
                      capturarDados(e);
                    }}
                  >
                    {periodo.map((obj, indice) => (
                      <MenuItem value={indice} key={indice}>
                        {obj}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Horario Inicio:
                  </InputLabel>
                  <Select //select de per??odo
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name="horarioInicio"
                    required
                    value={horarioInicioValue}
                    onChange={(e) => {
                      setHorarioInicioValue(e.target.value);
                      capturarDados(e);
                    }}
                  >
                    {horarios.map((obj, indice) => (
                      <MenuItem value={obj.id} key={indice}>
                        {obj.horario}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="select3">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Status:
                  </InputLabel>
                  <Select //select de status
                    value={ValueStatus}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name="status"
                    required
                    onChange={(e) => {
                      setvalueStatus(e.target.value);
                      capturarDados(e);
                    }}
                  >
                    {status.map((obj, indice) => (
                      <MenuItem value={indice} key={indice}>
                        {obj}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

               

                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Horario T??rmino:
                  </InputLabel>
                  <Select //select de per??odo
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name="horarioFinal"
                    required
                    value={horarioFinalValue}
                    onChange={(e) => {
                      setHorarioFinalValue(e.target.value);
                      capturarDados(e);
                    }}
                  >
                    {horarios.map((obj, indice) => (
                      <MenuItem value={obj.id} key={indice}>
                        {obj.horario}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <FormControl sx={{ m: 1, width: 300,top:500, left:-10}}>
                  <InputLabel id="demo-multiple-checkbox-label">Dias da Semana</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    name="diasDaTurma"
                    multiple
                    defaultValue={diasDaSemana}
                    onChange={handleChange}
                    input={<OutlinedInput label="Dias da Semana" />}
                    renderValue={(selected) => selected.join(",")}
                    MenuProps={MenuProps}
                  >
                    {DiasDaSemana.map((dias) => (
                      <MenuItem key={dias} value={dias}>
                        <Checkbox checked={diasDaSemana.indexOf(dias) > -1} />
                        <ListItemText primary={dias} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

              <div>
                <div className="horarioInicio" style={{left:30}}>
                  <TextField
                    sx={estiloData}
                    label="Data inicio"
                    onChange={(e) => {
                      setDataInicio(e.target.value);
                      capturarDados(e);
                    }}
                    InputLabelProps={{ shrink: true, required: true }}
                    type="date"
                    variant="standard"
                    value={dataInicioFormatada}
                  />
                </div>

                <div className="horarioFinal" style={{left:285}}>
                  <TextField
                    sx={estiloData}
                    variant="standard"
                    label="Data Terminio"
                    onChange={(e) => {
                      setDataTermino(e.target.value);
                      capturarDados(e);
                    }}
                    InputLabelProps={{ shrink: true, required: true }}
                    type="date"
                    value={dataTerminoFormatada}
                  />
                </div>
              </div>
             
              <div class="parteBotao" style={{left:330, top:535}}>
                <Button
                  variant="contained"
                  color="success"
                  //onClick={() => cadastrar(objTurma.id)}
                  type="submit"
                >
                  cadastrar
                </Button>

      
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const styleTextField = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "2em"
};

const estiloData = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "2em",
};

const styleTitle = {
  textAlign: "center",
  marginBottom: "30px",
  color: "blue",
};

const styletSearch = {
  border: "2px solid blue",
  alignItems: "center",
  marginLeft: "500px",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "30px",
  boxShadow: 24,
};

const snackStyle = {
  float: "right",
};

const style = {
  position: "absolute",
  top: "50%",
  display: "flex",
  flexDirection: "row",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default CadTurma;
