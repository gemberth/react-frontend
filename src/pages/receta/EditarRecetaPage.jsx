import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecetaApi, useForm } from "../../hooks";
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

// const recetaFormFields = {
//     descripcion: '',
//     caloria: '',
//     categoria: '',
//     preparacion: '',
//     lfoto: '',
//     // descripcion: '',
   
// }

export const EditarRecetaPage = () => {
    const navigate = useNavigate()

    const {guardar, traerPorId, actualizar} = useRecetaApi()
    const [recetaSeleccionado, setrecetaSeleccionado] = useState({
        descripcion: '',
        caloria: '',
        categoria: '',
        preparacion: '',
        lfoto: '',
    })
    const params = useParams();
    const onInputChanged = ({ target }) => {
        setrecetaSeleccionado({
            ...recetaSeleccionado,
            [target.name]: target.value
        })
    }
    useEffect(() => {
 
        traerPorIdApi()
    }, [])
    // const { descripcion, caloria,categoria, preparacion, lfoto,  onInputChange } = useForm(recetaFormFields);
    const registerSubmit = (e) => {
        e.preventDefault();
        actualizar(params.id,recetaSeleccionado)
        navigate('/receta/new')
    }
    const traerPorIdApi = async() => {
        console.log(params.id)
        let data = await traerPorId(params.id)

        console.log(data)
        setrecetaSeleccionado(data.receta)
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Something went wrong!',
        //     footer: '<a href="">Why do I have this issue?</a>'
        //   })
    }
    

  return (
    <>
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
