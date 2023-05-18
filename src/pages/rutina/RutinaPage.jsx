import { useEffect, useState } from "react";
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import { useForm, useRutinaApi } from "../../hooks";
import "./styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

const formRutina = {
  nombre: "",
  descripcion: "",
  tiempoDeRutina: 0,
  caloriasEstimadas: 0,
  idUsuario: 0,
  rutinaCompletada: "",
  caloriasPerdidas: 0,
};

export const CRUDRutina = () => {
  const navigate = useNavigate();
  const { traerTodos, guardar, actualizar, eliminar } = useRutinaApi();
  const [listaRutina, setListaRutina] = useState([]);
  const [rutinaSelecion, setrutinaSelecion] = useState({});
  const [accion, setaccion] = useState("Ingresar");
  const [showModal, setShowModal] = useState(false);
  


  const traerTodosApi = async () => {
    let data = await traerTodos();
    setListaRutina(data.rutinas);
  };

  const {
    onInputChange,
    formState,
    setFormState,
    nombre,
    descripcion,
    tiempoDeRutina,
    caloriasEstimadas,
    idUsuario,
    rutinaCompletada,
    caloriasPerdidas,
  } = useForm(formRutina);

  const guardarDatos = (e) => {
    e.preventDefault();
    if (accion == "Ingresar") {
      if (descripcion.length < 1) {
        alert("Error en la descripcion");
        return;
      }
      // console.log({...formState});
      let data = guardar({ ...formState });
      data.rutina;
    } else {
      try {
        let data = actualizar(
          rutinaSelecion._id,
          {...formState}
        );
        setShowModal(false);
        
      } catch (error) {
        console.error(error);
      }
    }
    setFormState({
      nombre: "",
      descripcion: "",
      tiempoDeRutina: 0,
      caloriasEstimadas: 0,
      idUsuario: 0,
      rutinaCompletada: "",
      caloriasPerdidas: 0,
    });
    traerTodosApi();
    setShowModal(false);
  };
  
  const abrirModal = () => {
    setaccion("Ingresar");
    setShowModal(true);
  };
  const eliminarReceta = async (rutinaId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta rutina?")) {
      try {
        await eliminar(rutinaId);
        console.log(rutinaId);
        setListaRutina(listaRutina.filter((r) => r._id !== rutinaId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const seleccionarRutina = (rutina) => {
    setaccion("Modificar");
    setrutinaSelecion(rutina)
    setFormState({
      nombre: rutina.nombre,
      descripcion: rutina.descripcion,
      tiempoDeRutina: rutina.tiempoDeRutina,
      caloriasEstimadas: rutina.caloriasEstimadas,
      idUsuario:0,
      rutinaCompletada: rutina.rutinaCompletada,
      caloriasPerdidas:rutina.caloriasPerdidas
    });
    setShowModal(true);
  };



  useEffect(() => {
    traerTodosApi();
  }, []);

  return (
    <>
      <NavBar />
      <div className="app">
        <br />
        <button className="btn btn-success" onClick={() => abrirModal()}>
          {" "}
          Agregar Rutina
        </button>  
        <table className="table">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>DESCRIPCION</th>
              <th>TIEMPO</th>
              <th>CALORIAS</th>
              <th>RUTINA COMPLETADA</th>
              <th>CALORIAS PERDIDAS</th>
              <th>Acccion</th>

            </tr>
          </thead>
          <tbody>
            {listaRutina.map((rutina, i) => {
              return (
                <tr key={i}>
                  <td>{rutina.nombre}</td>
                  <td>{rutina.descripcion}</td>
                  <td>{rutina.tiempoDeRutina}</td>
                  <td>{rutina.caloriasEstimadas}</td>
                  <td>{rutina.rutinaCompletada}</td>
                  <td>{rutina.caloriasPerdidas}</td>
                  <td>
                    <button
                      onClick={() => eliminarReceta(rutina._id)}
                      className="btn btn-danger"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <button
                      // onClick={() => setShowModal(true)}
                      onClick={() => seleccionarRutina(rutina)}
                      className="btn btn-primary"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                  
                </tr>
                
              );
            })}
          </tbody>
        </table>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Rutina</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="descripcion">NOMBRE</label>
              <input
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={onInputChange}
                className="form-control"
                required
              />
              <br />
              <label htmlFor="descripcion">DESCRIPCION</label>
              <input
                id="descripcion"
                name="descripcion"
                value={descripcion}
                onChange={onInputChange}
                className="form-control"
                required
              />
              <br />
              <label htmlFor="tiempoDeRutina">TIEMPO RUTINA</label>
              <input
                id="tiempoDeRutina"
                name="tiempoDeRutina"
                value={tiempoDeRutina}
                onChange={onInputChange}
                className="form-control"
                type="number"
                min="0"
                required
              />
              <br />
              <label htmlFor="preparacion">CALORIAS QUEMADAS</label>
              <input
                id="caloriasEstimadas"
                name="caloriasEstimadas"
                value={caloriasEstimadas}
                onChange={onInputChange}
                className="form-control"
                type="number"
                min="0"
                required
              />
              
              <br />
              <label htmlFor="lfoto">RUTINA COMPLETADA </label>
              <input
                id="rutinaCompletada"
                name="rutinaCompletada"
                value={rutinaCompletada}
                onChange={onInputChange}
                className="form-control"
                required
              />
              <br />
              <label htmlFor="lfoto">CALORIAS QUEMADAS </label>
              <input
                id="caloriasPerdidas"
                name="caloriasPerdidas"
                value={caloriasPerdidas}
                onChange={onInputChange}
                className="form-control"
                required
              />
              <br />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(event) => guardarDatos(event)}
            >
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
