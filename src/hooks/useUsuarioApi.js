import { useDispatch, useSelector } from "react-redux"
import { nutricionApi } from "../api";


export const useUsuarioApi= () => {

    const { status,user,errorMsg, } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const traerTodos = async() => {
        try {
            const {data} = await nutricionApi.get('/usuario')
            return data
        } catch (error) {
            let data = {}
            data.errorMsg = "Error al traer todos los registros"
            return data
        }
    }

    const guardar = async(newData) => {
        console.log(newData)
        try {
            const {data} = await nutricionApi.post('/usuario/crear')
            return data
        } catch (error) {
            let data = {}
            data.errorMsg = "Error al traer todos los registros"
        }
    }

    const traerPorId = async(id) => {
        try {
            const {data} = await nutricionApi.get(`/usuario/${id}`)
            return data
        } catch (error) {
            let data = {}
            data.errorMsg = "Error al traer el registro"
        }
    }

       // metodo de editar
       const actualizar = async(id,newData) => {
        try {
            const {data} = await nutricionApi.put(`/usuario/${id}`,{...newData})
            return data
        } catch (error) {
            let data = {}
            data.errorMsg = "Error al traer el registro"
        }
    }

    return {
        guardar,
        traerTodos,
        traerPorId,
        actualizar
    }
}