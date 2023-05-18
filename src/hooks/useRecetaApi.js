import { useDispatch, useSelector } from "react-redux";
import { nutricionApi } from "../api";

export const useRecetaApi = () => {
  const { status, user, errorMsg } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const traerTodos = async () => {
    try {
      const { data } = await nutricionApi.get("/receta");
      return data;
    } catch (error) {
      let data = {};
      data.errorMsg = "Error al traer todos los registros";
      return data;
    }
  };

  const guardar = async (newData) => {
    console.log(newData);
    newData.idUsuarioCreado=user.id
    try {
      const { data } = await nutricionApi.post("/receta/crear", newData);
      return data;
    } catch (error) {
      let data = {};
      data.errorMsg = "Error al traer todos los registros";
    }
  };

  const traerPorId = async (id) => {
    try {
      const { data } = await nutricionApi.get(`/receta/${id}`);
      return data;
    } catch (error) {
      let data = {};
      data.errorMsg = "Error al traer el registro";
    }
  };

  // metodo de editar
  const actualizar = async (id, newData) => {
    try {
      const { data } = await nutricionApi.put(`/receta/${id}`, { ...newData });
      return data;
    } catch (error) {
      let data = {};
      data.errorMsg = "Error al traer el registro";
    }
  };

  const eliminar = async (id) => {
    try {
      const { data } = await nutricionApi.delete(`/receta/${id}`);
      return data;
    } catch (error) {
      let data = {};
      data.errorMsg = "Error al traer el registro";
    }
  };
  const eliminarTodos = async () => {
    try {
      const { data } = await nutricionApi.delete(`/receta/`);
      return data;
    } catch (error) {
      let data = {};
      data.errorMsg = "Error al traer el registro";
    }
  };

  return {
    guardar,
    traerTodos,
    traerPorId,
    actualizar,
    eliminar,
    eliminarTodos,
  };
};
