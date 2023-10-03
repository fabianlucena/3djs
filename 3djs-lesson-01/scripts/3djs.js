const canvas = document.getElementById('3dcanvas');
const gl = canvas.getContext('webgl2', '{antialias: true}');

gl.viewport(0, 0, canvas.replaceWith, canvas.height);
gl.clearColor(0.25, 0.25, 0.25, 1.0); // Establecemos en color de fondo en un gris oscuro totalmente opaco.
gl.enable(gl.DEPTH_TEST); // Hablitamos la prueba de profundidad
gl.depthFunc(gl.LEQUAL); // Objetos cercanos opacan a los lejanos
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Limpiar el buffer con el color seleccionado