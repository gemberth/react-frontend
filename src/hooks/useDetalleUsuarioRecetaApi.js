import { useDispatch, useSelector } from "react-redux"
import { nutricionApi } from "../api";


export const useDetalleUsuarioRecetaApi= () => {

    const guardar = async(newData) => {
        try {
            const {data} = await nutricionApi.post('/detalleUsuarioReceta/crear', newData)
            console.log(data)
            return data
        } catch (error) {
            let data = {}
            data.errorMsg = "Error al guardar los registros"
        }
    }

    const traerPorIdUsuario = async(id) => {
        try {
            const {data} = await nutricionApi.get(`/detalleUsuarioReceta/${id}`)
            return data
        } catch (error) {
            let data = {}
            data.errorMsg = "Error al traer el registro"
        }
    }
    const eliminar = async (id) => {
        try {
          const { data } = await nutricionApi.delete(`/detalleUsuarioReceta/${id}`);
          return data;
        } catch (error) {
          let data = {};
          data.errorMsg = "Error al traer el registro";
        }
      };

    return {
        guardar,
        traerPorIdUsuario,
        eliminar
    }
}