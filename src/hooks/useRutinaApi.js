import { useDispatch, useSelector } from "react-redux"
import { nutricionApi } from "../api";

export const useRutinaApi= () => {
    const { status,user,errorMsg, } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    
    const traerTodos = async() => {
        try {
            const {data} = await nutricionApi.get('/rutina')
            return data
        } catch (error) {
            let data = {}
            data.errorMsg = "Error al traer todos los registros"
            return data
        }
    }
    const eliminar = async (id) => {
        try {
          const { data } = await nutricionApi.delete(`/rutina/${id}`);
          return data;
        } catch (error) {
          let data = {};
          data.errorMsg = "Error al traer el registro";
        }
      };

      const guardar = async (newData) => {
        console.log(newData);
        try {
          const { data } = await nutricionApi.post("/rutina/crear", newData);
          return data;
        } catch (error) {
          let data = {};
          data.errorMsg = "Error al traer todos los registros";
        }
      };

      const actualizar = async (id, newData) => {
        try {
          const { data } = await nutricionApi.put(`/rutina/${id}`, { ...newData });
          return data;
        } catch (error) {
          let data = {};
          data.errorMsg = "Error al traer el registro";
        }
      };


    //
    return {
        traerTodos, 
        eliminar,
        guardar,
        actualizar,
    }

}
