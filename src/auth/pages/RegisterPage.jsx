import './LoginPage.css';
import { useAuthStore, useForm } from "../../hooks";
import { useEffect } from 'react';
import swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'

const loginFormFields = {
    nombre: '',
    edad: 0,
    fechaNacimiento: new Date(),
    email: '',
    password: '',
    pesoInicial: 0,
}


export const RegisterPage = () => {

    const navigate = useNavigate()
    const { startLogin, startRegister, errorMsg } = useAuthStore();

    useEffect(() => {
        if (errorMsg !== undefined) {
            swal.fire(
                'Error en la autentificación',
                errorMsg,
                'error'
            )
        }

    }, [errorMsg])


    const { nombre, edad,fechaNacimiento, email, password, pesoInicial, onInputChange } = useForm(loginFormFields);

    const registerSubmit = (e) => {
        e.preventDefault();
        startRegister({ nombre, edad,fechaNacimiento, email, password, pesoInicial })
        navigate('/auth/login')
    }

    return (
        <div className="contenedor">
            <div className="demo-content container login-container">
                <div className="row mgAuto">
                    <div className="login-form-1" style={{ magin: '0 auto' }}>
                        <h3>Ingreso</h3>
                        <form onSubmit={registerSubmit}>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name='nombre'
                                    value={nombre}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Edad"
                                    name='edad'
                                    // value={edad}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="form-group mb-2">
                            <label for="birthdate">Fecha de nacimiento:</label>
                            <div class="input-group">
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Fecha de nacimiento"
                                    name='fechaNacimiento'
                                    // value={edad}
                                    onChange={onInputChange}
                                />
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Correo"
                                    name='email'
                                    value={email}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name='password'
                                    value={password}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="Number"
                                    className="form-control"
                                    placeholder="Peso"
                                    name='pesoInicial'
                                    // value={pesoInicial}
                                    onChange={onInputChange}
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
    )
}