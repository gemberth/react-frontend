import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecetaApi, useForm } from "../../hooks";
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const CrearRecetaPage = () => {
    const navigate = useNavigate()

    const {guardar, traerPorId, actualizar} = useRecetaApi()
    const [recetaSeleccionado, setrecetaSeleccionado] = useState({
        descripcion: '',
        caloria: '',
        categoria: '',
        preparacion: '',
        lfoto: '',
        idUsuarioCreado: "",
        fecha: new Date(),

    })

    const limpiar = () => {
        setrecetaSeleccionado({
            descripcion: '',
            caloria: '',
            categoria: '',
            preparacion: '',
            lfoto: '',
            idUsuarioCreado: "",
            fecha: new Date(),
        })
    }

    const params = useParams();
    const onInputChanged = ({ target }) => {
        setrecetaSeleccionado({
            ...recetaSeleccionado,
            [target.name]: target.value
        })
    }
    useEffect(() => {
 
        // traerPorIdApi()
    }, [])
    // const { descripcion, caloria,categoria, preparacion, lfoto,  onInputChange } = useForm(recetaFormFields);
    const registerSubmit = (e) => {
        e.preventDefault();
        
       const d= guardar(recetaSeleccionado)
       console.log(d)
        navigate('/receta/new')
    } 

  return (
    <>
     <NavBar></NavBar>
    <div className="contenedor mb-3">
            <div className="demo-content container login-container">
                <div className="row mgAuto">
                    <div className="login-form-1" style={{ magin: '0 auto' }}>
                        <h3>Ingreso</h3>
                        <form onSubmit={registerSubmit}>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Descripcion"
                                    name='descripcion'
                                    value={recetaSeleccionado.descripcion}
                                    onChange={onInputChanged}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Calorias"
                                    name='caloria'
                                    value={recetaSeleccionado.caloria}
                                    onChange={onInputChanged}
                                />
                            </div>
                            <div className="form-group mb-2">
                            
                            <div class="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Categoria"
                                    name='categoria'
                                    value={recetaSeleccionado.categoria}
                                    onChange={onInputChanged}
                                />
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Preparacion"
                                    name='preparacion'
                                    value={recetaSeleccionado.preparacion}
                                    onChange={onInputChanged}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Foto"
                                    name='lfoto'
                                    value={recetaSeleccionado.lfoto}
                                    onChange={onInputChanged}
                                />
                            </div>                            
                            <div className="d-grid gap-2">
                                <input
                                    type="submit"
                                    className="btnSubmit"
                                    value="Registrarse"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        
    </>
  )
}
