import { Component, OnInit } from '@angular/core';
import { Lugar } from '../../interfaces/interfaces';
import * as mapboxgl from 'mapbox-gl';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  btnBorrar: any;
  mapa: mapboxgl.Map | any;
  lugares: Lugar[] = [{
    id: '1',
    nombre: 'Fernando',
    lng: -74.577254,
    lat: -8.355857,
    color: '#dd8fee'
  },
  {
    id: '2',
    nombre: 'Amy',
    lng: -74.577265, 
    lat: -8.355868,
    color: '#790af0'
  },
  {
    id: '3',
    nombre: 'Orlando',
    lng: -74.577276, 
    lat: -8.355879,
    color: '#19884b'
  }];
  constructor() { }

  ngOnInit(): void {
    this.crearMapa();
  }

  crearMapa() {
    this.mapa = new mapboxgl.Map({
      accessToken:'pk.eyJ1IjoidGlnZXIxMjE0IiwiYSI6ImNrcDd0cDl2NTAzM2syeG1zdzV4NWEwaGIifQ.xYnNZjDu30SiuGKjzgh_jg',
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        -74.577255,
        -8.355859
      ],
      zoom: 15.8
    });
  }

  agregarMarcador(marcador: Lugar){

    /* const html = `<h2>${marcador.nombre}</h2>
                  <br>
                  <button class="btn btn-success">Crear</button>
                  <button class="btn btn-danger">Borrar</button>`; */

    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre;
    this.btnBorrar = document.createElement('button');
    this.btnBorrar.innerText = 'Borrar';
    const btnCrear = document.createElement('button');
    btnCrear.innerText ='Crear';
    const div = document.createElement('div');
    div.append(h2, this.btnBorrar, btnCrear);

    const customPopup = new mapboxgl.Popup({
      offset:25,
      closeOnClick:false
    }).setDOMContent(div);

    const marker = new mapboxgl.Marker({
      draggable:true,
      color: marcador.color
    })
    .setLngLat([marcador.lng, marcador.lat])
    .setPopup(customPopup)
    .addTo(this.mapa);

    marker.on('drag', ()=>{
      const lngLat = marker.getLngLat();
      console.log(lngLat);

      //Crear evento para emitir las corrdernadas de este marcador
      
      
    });
    this.btnBorrar.addEventListener('click', ()=>{
      marker.remove();
      //TODO: Eliminar el marcador por sockets
      
    });
    btnCrear.addEventListener('click',()=>{
      const modals = document.querySelector(".hidden");
      const container = modals?.querySelector(".container");
      modals?.classList.remove("hidden")
    })
  }
  crearMarcador(){
    const custommarker :Lugar= {
      id:new Date().toISOString(),
      lng: -74.577255,
      lat:-8.355859,
      nombre:'Sin nombre',
      color: '#19884b'
    }
    this.agregarMarcador(custommarker);
  }
  async modal(){
    const { value: formValues } = await Swal.fire({
      title: 'Multiple inputs',
      html:
      '<form>'+
      '<div class="form-group">'+
        '<label for="exampleInputEmail1">Email address</label>'+
        '<input id="swal-input1" class="swal2-input">' +
        '<label for="exampleInputEmail1">Email address</label>'+
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.querySelector('#swal-input1')?.nodeValue,
          document.querySelector('#swal-input2')?.nodeValue
        ]
      }
    })
    
    if (formValues) {
      Swal.fire(JSON.stringify(formValues))
    }
  }
  cerrar(){
    const modals = document.querySelector(".modal");
      const container = modals?.querySelector(".container");
      modals?.classList.add("hidden")
  }
}
