import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUsuarioApi } from "../../hooks";
import Swal from "sweetalert2";


export const EditarUsuarioPage = () => {

    const {guardar, traerPorId} = useUsuarioApi()
    const params = useParams();

    useEffect(() => {
        traerPorIdApi()
    }, [])

    const traerPorIdApi = async() => {
        let data = await traerPorId(params.id)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }
    

  return (
    <>
        <div>EditarUsuarioPage</div>
        <h1>Usuario a editar con id {params.id}</h1>
    </>
  )
}
