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
            const {data} = await nutricionApi.post('/usuario/guardar')
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

    return {
        guardar,
        traerTodos,
        traerPorId
    }
}