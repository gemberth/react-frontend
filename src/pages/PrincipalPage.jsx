import { NavBar } from "../components";
import { SimpleLineChart } from "../chart";
import imagenBajatalla from "../assets/bajatalla1.jpg";
import imagecambios from "../assets/cambios.jpg";
import './styleHome.css'

export const PrincipalPage = () => {
  return (
    <>
      <NavBar></NavBar>

      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Sistema de Nutrición - Baja Talla</h1>
        <p className="text-lg text-center mb-16">
          Bienvenido a nuestro sitio web dedicado a la nutrición y la salud. Aquí encontrarás información valiosa sobre cómo llevar una dieta equilibrada y mejorar tu calidad de vida a través de hábitos saludables, además de rutinas que beneficiara el bienestar de tu cuerpo.
        </p>
        <div>
          <img src={imagenBajatalla} class="img-talla" />
        </div>
        <br></br>
        <div className="flex justify-center items-center">
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 shadow-lg rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-4"> Nuestros Servicios  </h2>
            <ul className="list-disc list-inside">
              <li className="mb-2">Nutrición personalizada en base a recetas</li>
              <li className="mb-2">Rutinas que te ayudaran a mantenerte en forma</li>
              <li className="mb-2">Seguimiento y monitoreo de la salud</li>
            </ul>
          </div>
        </div>
      </div>
      <br></br>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
        <h1 className="text-4xl font-bold text-center mb-8">Lineamientos para tener una vida saludable</h1><br />
        <ul className="list-disc list-inside" style={{ listStyleType: 'circle', color: 'black', textAlign: 'justify', width: '80%', margin: '0 auto', fontWeight: 'bold', fontSize: '16px' }}>
          <li className="mb-2">La alimentación debe ser suficiente en cantidad de alimentos para cubrir las necesidades energéticas y <br />nutricionales del organismo y cubrir todos sus requerimientos según edad, sexo, talla, peso, actividad física.</li>
          <li className="mb-2">Debe ser completa; es decir, debe contener todos los nutrientes para ofrecer al ser humano todas las<br /> sustancias que integran sus tejidos: proteínas, carbohidratos, grasas, vitaminas, minerales y agua.</li>
          <li className="mb-2">Los alimentos deben guardar una proporción apropiada entre sí; es decir, que deben aportar las cantidades <br />de nutrientes necesarios para el adecuado funcionamiento del organismo.</li>
          <li className="mb-2">Los alimentos deben ser adecuados a las condiciones fisiológicas de cada individuo, según su edad y <br />la actividad física que realiza.</li>
        </ul>
      </div><br></br>
      <div style={{ marginRight: '40px' }}>

        <img src={imagecambios} style={{ float: 'left', width: '500px', height: '300px', border: '3px solid black', marginLeft: '20px' }} />
      </div>
      <div style={{ float: 'right', marginRight: '20px' }}>
        <h1 className="chart">Gráfico de peso por persona</h1>
        <SimpleLineChart />
      </div>


    </>
  )
}

