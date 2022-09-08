
import {useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import  './listaArea.css'

function Area(selecionarArea, cadastrar, post, excluir) {

    const area = {
        id: 0,
        nome: "",
       
      }

      
      cadastrar = () => {
        fetch("http://localhost:8080/api/area", {
          method: 'post',
          body: JSON.stringify(objArea),
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
    
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
          console.log(retorno_convertido)
          window.location.reload();
        })
      }

      excluir = (id) => {
        fetch("http://localhost:8080/api/area/"+id, {
          method: 'delete',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
    
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
         
            let vetorTemporario = [...areas] //vetorTemporario vai ter acesso a todos as areas

            console.log(vetorTemporario)

         

            //vetorIndex retorna a posição dos objetos
            let indice = vetorTemporario.findIndex((p) =>{

                
                return p.id === objArea.id
            }) 

            //remover area do vetorTemporario
             vetorTemporario.splice(indice, 1)

            //atualizar o vetor de areas

            setArea(vetorTemporario)

            window.location.reload();

        })
      }

      post = (e) => {
  
        console.log(e.target)
        setObjArea({ ...objArea, [e.target.name]: e.target.value })
      }

    useEffect(() => {
        fetch("http://localhost:8080/api/area")
        .then(retorno => retorno.json())
        .then(retorno_convertido => setArea(retorno_convertido))//retorno convertido tem a lista de todos os cursos
    }, [])

    selecionarArea = (indice) => {

        setObjArea(areas[indice])
        
      }

    const [areas, setArea] = useState([])

    const [show, setShow] = useState(false);

    const [objArea, setObjArea] = useState(area)
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <div className="botaoCadastrar">
        <h1 className="titulo">Lista de Area</h1>

        <div>
        <Button variant="primary" className="botaoCadastrar" onClick={() => {
            handleShow()

            }}>
         cadastrar Area
        </Button>
        </div>

        <table className="table">

<thead className="table-dark">
     <tr>
              <th>id:</th>
              <th>Nome:</th>
              <th>Excluir:</th>
              <th>Alterar:</th>
             
     </tr>
     </thead>

        <tbody>
            {
            
                areas.map((obj, indice) => (
                    <tr key={indice}>
                        <td  >{obj.id}</td>
                       
                        <td>{obj.nome}</td>
                    
                        <td><button className="btn btn-danger" onClick={() => excluir(obj.id)}>Excluir</button></td>
                        <td> <Button variant="warning" onClick={() => {
                            selecionarArea(indice)
                            handleShow()

                        }}>
                                Alterar
                            </Button>
                        </td>

                        <Modal
                        show={show}
                        onHide={handleClose}
                                    >
                        <Modal.Header closeButton>  
                        <Modal.Title>Alterar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form>
                          <input className="inputNome" type="text" name="nome" defaultValue={objArea.nome} onChange={post}/>

                          </form>
                        
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Fechar
                        </Button>

                        <Button type='submit' variant="warning" onClick={() => {
                          
                            cadastrar()
                            

                        }}>
                            Alterar
                        </Button>
                            
                        </Modal.Footer>
                    </Modal>

                    </tr>

                    
                ))
        }

        </tbody>
        </table>
        </div>
    )
}

export default Area