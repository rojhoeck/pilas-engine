const DEPURAR_MENSAJES = false;

class Mensajes {
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
    this.agregar_manejador_de_eventos();
  }

  private agregar_manejador_de_eventos() {
    window.addEventListener("message", this.atender_mensaje.bind(this), false);
  }

  atender_mensaje(e) {
    let metodo = "atender_mensaje_" + e.data.tipo;
    let datos = e.data;

    if (DEPURAR_MENSAJES) {
      console.log("[IN] llega el mensaje " + metodo);
    }

    if (this[metodo]) {
      this[metodo](datos);
    } else {
      console.error(`Imposible llamar al evento ${metodo}`, datos);
    }
  }

  atender_mensaje_iniciar_pilas(datos) {
    this.pilas.iniciar_phaser(datos.ancho, datos.alto);
  }

  atender_mensaje_definir_estados_de_depuracion(datos) {
    this.pilas.depurador.definir_estados_de_depuracion(datos);
  }

  emitir_mensaje_al_editor(nombre, datos = null) {
    datos = datos || {};
    datos.tipo = nombre;

    if (DEPURAR_MENSAJES) {
      console.log("[OUT] Emitiendo el mensaje " + nombre);
    }

    window.parent.postMessage(datos, HOST);
  }

  atender_mensaje_define_escena(datos) {
    this.pilas.definir_modo("ModoEditor", { pilas: this.pilas, escena: datos.escena });
  }

  atender_mensaje_ejecutar_proyecto(datos) {
    let parametros = {
      pilas: this.pilas,
      nombre_de_la_escena_inicial: datos.nombre_de_la_escena_inicial,
      permitir_modo_pausa: datos.permitir_modo_pausa,
      codigo: datos.codigo,
      proyecto: datos.proyecto
    };

    this.pilas.definir_modo("ModoEjecucion", parametros);
  }

  atender_mensaje_actualizar_escena_desde_el_editor(datos) {
    console.log(datos);
  }

  atender_mensaje_selecciona_actor_desde_el_editor(datos) {
    console.log(datos);
  }
}
