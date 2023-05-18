import { useEffect, useState } from "react";
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import { useForm, useRecetaApi } from "../../hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "./styles2.css";
import { Modal, Button } from "react-bootstrap";

const formReceta = {
  descripcion: "",
  caloria: "",
  categoria: "",
  preparacion: "",
  lfoto: "",
  fecha: new Date(),
};

export const CRUDReceta = () => {
  //PARA NAVEGAR A OTRA PAG
  const navigate = useNavigate();
  const { traerTodos, guardar, eliminar, actualizar } = useRecetaApi();
  const [listaReceta, setlistaReceta] = useState([]);
  const [accion, setaccion] = useState("Ingresar");
  const [recetaSelecion, setrecetaSelecion] = useState({});
  const [estado, setestado] = useState();
  const [showModal, setShowModal] = useState(false);

  //USAR FORMULARIO
  const {
    onInputChange,
    formState,
    setFormState,
    descripcion,
    caloria,
    categoria,
    preparacion,
    lfoto,
    // idUsuarioCreado: "",
    // fecha: new Date(),
  } = useForm(formReceta);

  useEffect(() => {
    traerTodosApi();
  }, []);

  const traerTodosApi = async () => {
    let data = await traerTodos();
    setlistaReceta(data.recetas);
  };

  // SELECIONAR PARA EDITAR
  const seleccionarReceta = (receta) => {
    setaccion("Modificar");
    setrecetaSelecion(receta)
    setFormState({
      descripcion: receta.descripcion,
      caloria: receta.caloria,
      categoria: receta.categoria,
      preparacion: receta.preparacion,
      lfoto: receta.lfoto,
    });
    setShowModal(true);
  };

  // GUARDAR
  const guardarDatos = (e) => {
    e.preventDefault();
    if (accion == "Ingresar") {
      if (descripcion.length < 1) {
        alert("Error en la descripcion");
        return;
      }
      // console.log({...formState});
      let data = guardar({ ...formState });
      data.receta;
      traerTodosApi();
    } else {
      try {
        let data = actualizar(
          recetaSelecion._id,
          {...formState}
        );
        setShowModal(false);
        traerTodosApi();
      } catch (error) {
        console.error(error);
      }
    }
    setFormState({
      descripcion: "",
      caloria: 0,
      categoria: "",
      preparacion:"",
      lfoto: "",
      idUsuarioCreado: "",
      fecha: new Date(),
    });
    traerTodosApi();
    setShowModal(false);
  };
  // ABRIR MODAL
  const abrirModal = () => {
    setaccion("Ingresar");
    setShowModal(true);
  };
  // ELIMINAR
  const eliminarReceta = async (recetaId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta receta?")) {
      try {
        await eliminar(recetaId);
        console.log(recetaId);
        setlistaReceta(listaReceta.filter((r) => r._id !== recetaId));
        Swal.fire({
          title: "Receta eliminada",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <NavBar></NavBar>
      <div className="app">
        <br />
        <button className="btn btn-success" onClick={() => abrirModal()}>
          {" "}
          Agregar Recetas
        </button>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>DESCRIPCION</th>
              <th>CALORIAS</th>
              <th>CATEGORIAS</th>
              <th>PREPARACION</th>
              <th>IMAGEN</th>
              <th colSpan={2}>ACCION</th>
            </tr>
          </thead>
          <tbody>
            {listaReceta.map((receta, i) => {
              return (
                <tr key={i}>
                  <td>{receta.descripcion}</td>
                  <td>{receta.caloria}</td>
                  <td>{receta.categoria}</td>
                  <td>{receta.preparacion}</td>
                  {/* <td>{receta.lfoto}</td> */}
                  <td>
                    <img src={receta.lfoto} alt={receta.descripcion} />
                  </td>
                  <td>
                    <button
                      // onClick={() => setShowModal(true)}
                      onClick={() => seleccionarReceta(receta)}
                      className="btn btn-primary"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => eliminarReceta(receta._id)}
                      className="btn btn-danger"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Recetas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
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
              <label htmlFor="calorias">CALORIAS</label>
              <input
                id="calorias"
                name="caloria"
                value={caloria}
                onChange={onInputChange}
                className="form-control"
                type="number"
                min="0"
                required
              />
              <br />
              <label htmlFor="categorias">CATEGORIAS</label>
              <input
                id="categorias"
                name="categoria"
                value={categoria}
                onChange={onInputChange}
                className="form-control"
                required
              />
              <br />
              <label htmlFor="preparacion">PREPARACION</label>
              <input
                id="preparacion"
                name="preparacion"
                value={preparacion}
                onChange={onInputChange}
                className="form-control"
                required
              />
              <br />
              <label htmlFor="lfoto">URL IMAGEN</label>
              <input
                id="lfoto"
                name="lfoto"
                value={lfoto}
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
