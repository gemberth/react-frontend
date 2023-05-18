import { useEffect, useState } from "react";
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDetalleUsuarioRecetaApi, useForm, useRecetaApi } from "../../hooks";
import "./styles.css";

import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const formReceta = {
  descripcion: "",
  calorias: "",
  categorias: "",
  preparacion: "",
};

export const RecetaPage = () => {
  //PARA NAVEGAR A OTRA PAG
  const navigate = useNavigate();
  const { traerTodos, guardar } = useRecetaApi();
  const { guardar: guardarDetalle } = useDetalleUsuarioRecetaApi();
  const [listaReceta, setlistaReceta] = useState([]);
  const [estado, setestado] = useState();
  const { user } = useSelector((state) => state.auth);

  //USAR FORMULARIO
  // const { onInputChange, descripcion, calorias, categorias,preparacion, formState } =
  // useForm(formReceta);

  useEffect(() => {
    traerTodosApi();
  }, []);

  const traerTodosApi = async () => {
    let data = await traerTodos();
    console.log(data);
    console.log(data.recetas);
    
    setlistaReceta(data.recetas);
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    //VALIDACIONES
    if (descripcion.length < 1) {
      alert("Error en la descripcion");
      return;
    }

    let data = guardar({ ...formState });

    data.receta;

    //CONFIRMACIONES
  };

  const editarReceta = (receta) => {
    console.log(receta._id);
    navigate("/receta/" + receta._id);
  };
  const CRUDReceta = () => {
    navigate("/receta/new");
  };

  const agregarReceta = async (receta) => {
    let detalle = {
      idReceta: receta._id,
      idUsuario: user.id,
    };
    const data = await guardarDetalle(detalle);
  };

  return (
    <>
      <NavBar></NavBar>

      <div className="app-receta">
        <br />
        <button onClick={() => CRUDReceta()} className="btn btn-success">
          {" "}
          CRUD Recetas
        </button>
        <br />
        <div className="receta-container">
          {listaReceta.map((receta, i) => {
            return (
              <div key={i} className="receta-card">
                <h2>{receta.descripcion}</h2>
                <p>{receta.caloria}</p>
                <p>{receta.categoria}</p>
                <p>{receta.preparacion}</p>
                <img src={receta.lfoto} alt="" />
                <br />
                <br />
                <button
                  className="btn btn-success"
                  // onClick={() => agregarReceta(receta)}
                  onClick={async () => {
                    const result = await Swal.fire({
                      title: "¿Agregar receta?",
                      text: "¿Estás seguro que deseas agregar esta receta?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonText: "Agregar",
                      cancelButtonText: "Cancelar",
                    });

                    if (result.isConfirmed) {
                      agregarReceta(receta);
                      Swal.fire({
                        title: "Receta agregada",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                      });
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
