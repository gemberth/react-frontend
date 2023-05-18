import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../auth/pages"
import { } from "../auth/pages";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { EditarUsuarioPage, PrincipalPage, UsuarioPage,RecetaPage,CRUDReceta, UserPage, CRUDRutina,EditarRecetaPage, CrearRecetaPage} from "../pages";


export const AppRouter = () => {

  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken()
  }, [])


  //MOSTRAR UN SPINNER

  if (status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
      {
        (status === 'no-logeado' || status === 'no-logeado')
          ? (
            <>
              <Route path="/auth/login" element={<LoginPage></LoginPage>}></Route>
              <Route path="/auth/registro" element={<RegisterPage></RegisterPage>}></Route>
              <Route path="/*" element={<Navigate to="/auth/login"></Navigate>} ></Route>
            </>
          )
          : (
            <>
              //RUTAS AQUI
              <Route path="/" element={<PrincipalPage></PrincipalPage>}></Route>
              <Route path="/usuario" element={<UsuarioPage></UsuarioPage>}></Route>
              <Route path="/user" element={<UserPage></UserPage>}></Route>
              {/* <Route path="/user" element={<UserPage></UserPage>}></Route> */}
              <Route path="/receta" element={<RecetaPage></RecetaPage>}></Route>
              <Route path="/usuario/:id" element={<EditarUsuarioPage></EditarUsuarioPage>}></Route>
              <Route path="/receta/:id" element={<EditarRecetaPage></EditarRecetaPage>}></Route>
              <Route path="/receta/new" element={<CRUDReceta></CRUDReceta>}></Route>
              <Route path="/receta/create" element={<CrearRecetaPage></CrearRecetaPage>}></Route>
              <Route path="/rutina" element={<CRUDRutina></CRUDRutina>}></Route>

              <Route path="/*" element={<Navigate to="/"></Navigate>} ></Route>
            </>
          )

      }

    </Routes>
  )
}
