//Se utiliza el sistema de modulos ECMAScript para importar la dependencia axios
import axios from 'axios';

//Se almacena en la variable el usuario a consultar extrayendolo del archivo .env
const nombreUsuarioGithub = process.env.USER_REPO 

//Se implementa la funcion tipo flecha para consumir la api
const funcionApi = async (userParametro) => {
   try {
    
    //Se realiza la peticion con la dependencia axios utilizando asyn await para manejar el asincronismo 
     const respuesta = await axios.get(`https://api.github.com/users/${userParametro}/repos?per_page=100`);

     //sel almacena en la variable repositorios la respuesta accediendo a la propiedad data que 
     //contiene la lista de los objetos de repositorios devuletos.
     const repositorios = respuesta.data;

     //se utiliza el metodo sort y la funcion de comparacion para ordenar los repositorios en orden descendente teniendo en cuenta
     //el numero de estrellas, accediendo a la propiedad stargazers_count del data
     repositorios.sort((a, b) => b.stargazers_count - a.stargazers_count);
     
     //Se utiliza el metodo slice para extraer los primeros 10 elementos del array y los almacena en la variable top10
     const top10 = repositorios.slice(0, 10);
     
     //Recorre los 10 elementos de la variable top10 y extrae solo el nombre y el numero de estrellas para imprimirlos en pantalla
     top10.forEach(i => {
        console.log(`Repositorio: ${i.name}, N° Estrellas: ${i.stargazers_count}`);
     });

   } catch (error) {
      
     console.log(`Error al intentar consultar los repositorios del usuario ${usuario} de github`)

   }
}
//llama la funcion utilizando como parametro la variable que contiene el usuario a consultar.
funcionApi(nombreUsuarioGithub);

