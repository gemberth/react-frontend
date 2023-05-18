import { useEffect, useState, } from "react";
import { useDetalleUsuarioRecetaApi, useForm, useUsuarioApi } from "../../hooks"
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import './styles.css'
import { useSelector } from "react-redux";
// import imagenMario from '../../assets/Mario.png'
import {SimpleBarCharts } from "../../chart"
// import './styles.css'


const formReceta = {
  descripcion: '',
  calorias: '',
  categorias: ''
}

export const UserPage = () => {
  const { user } = useSelector(state => state.auth)

  //PARA NAVEGAR A OTRA PAG
  const navigate = useNavigate()

  const { traerTodos, guardar, traerPorId } = useUsuarioApi();
  const { traerPorIdUsuario, eliminar } = useDetalleUsuarioRecetaApi();

  const [listaUsuario, setlistaUsuario] = useState([])

  const [usuarioSeleccionado, setusuarioSeleccionado] = useState({})


  const [listaCaloriaSeleccionado, setlistaCaloriaSeleccionado] = useState([])
  const [estado, setestado] = useState()

  //USAR FORMULARIO
  const { onInputChange, descripcion, calorias, categorias, formState } = useForm(formReceta)

  useEffect(() => {
    traerTodosApi();
  }, [])

  const traerTodosApi = async () => {
    let data = await traerPorId(user.id);
    let recetasUsuario = await traerPorIdUsuario(user.id);
    setusuarioSeleccionado(data.usuario)
    setlistaCaloriaSeleccionado(recetasUsuario.detalle)
  }

  const guardarDatos = async (e) => {
    e.preventDefault();
    //VALIDACIONES
    if (descripcion.length < 1) {
      alert("Error en la descripcion")
      return
    }

    let data = guardar({ ...formState })

    data.usuario

    //CONFIRMACIONES
  }

  const eliminarDetalle = async (id) => {
    let data = await eliminar(id)
    console.log(data)
    traerTodosApi()
    
  }
  

  const editarUsuario = (usuario) => {
    navigate('/usuario/' + usuario._id)
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <div className="row">

          <div className="col-md-6">

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Perfil de Usuario</h5>

                {

                  <div>
                    <p className="card-text"><b>Nombre:</b> {usuarioSeleccionado.nombre}</p>
                    <p className="card-text"><b>Edad:</b> {usuarioSeleccionado.edad}</p>
                    <p className="card-text"><b>Correo:</b> {usuarioSeleccionado.email}</p>
                    <p className="card-text"><b>Peso registrado:</b>  {usuarioSeleccionado.pesoInicial}</p>
                    <button className="btn btn-success" onClick={() => editarUsuario(usuarioSeleccionado)}>Editar</button>
                  </div>
                }
                <h5 className="card-title">Detalle de Usuario</h5>
                <p className="card-text"><b>Calorias consumidas hoy:</b>  1.200</p>
                <p className="card-text"><b>Calorias quemadas hoy:</b>  456</p>
                <p className="card-text"><b>Peso registrado:</b>  25</p>
                 
                 <div className="card-body" >
                 </div>

              </div>
            </div>
          </div>

          <div className="col-md-6">

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gráfico</h5>
              <p className="card-text">Información del gráfico</p>
              <div>
              <p className="textp">Peso actual por usuario</p>
                <SimpleBarCharts/>
                </div>
            </div>
          </div>
          </div>  

           <div className="col-md-6">

          <div className="card">
            <div className="card-body">
            <h5 className="card-title">Detalle de calorias consumidas</h5>
            <table className="table">
          <thead>
            <tr>
              <th>DESCRIPCION</th>
              <th>CALORIAS</th>
              <th>Fecha</th>              
              <th colSpan={2}>ACCION</th>
            </tr>
            {
              listaCaloriaSeleccionado.length > 0 ?
              <>
                {
                  listaCaloriaSeleccionado.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.idReceta.descripcion}</td>
                        <td>{item.idReceta.caloria}</td>
                        <td>{item.fecha}</td>
                        {/* <td><button className="btn btn-success" onClick={() => editarUsuario(item.receta)}>Editar</button></td> */}
                        <td><button className="btn btn-danger" onClick={() => eliminarDetalle(item._id)}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
                      </tr>
                    )
                  })

                }
              </>
              :
              <></>
            }
          </thead>
       
        </table>
            </div>
          </div>
          </div>  

        </div>        
         
      </div>


    </>
  )
}
