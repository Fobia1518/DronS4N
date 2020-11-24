# DronS4N

Este es un aplicativo el cual se creo para manejar hacer que un dron se mueve de acuerdo a una ruta dada en un archivo.

## Instalación

Para la instalación es necesario ejecutar en consola

```javascript
npm install
```

## Usage

Se puede utilizar el endpoint para verificar funcionamiento de la API

    Method: GET 
    Endpoint: localhost:8080/health

Para utilizar el api de DRON es necesario el archivo en la carpeta (delivery_files) y cada una debe tener la siguiente forma (Ejm: in20.txt donde el numero representa el dron que hará esa ruta).

    Method : POST 
    Endpoint: localhost:8080/delivery 
    Body: {"dron": < Number DRONE>} 	Ejm: { "dron": 2 }
    Type: JSON

[Powered By Fabian Ortiz](https://github.com/Fobia1518)
