import {WebGL} from './webgl.js'
import {Shader} from './shader.js'

const canvas = document.getElementById('3dcanvas');
const wgl = new WebGL(canvas);
const gl = wgl.gl;

gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.25, 0.25, 0.25, 1.0); // Establecer el color base en negro, totalmente opaco
gl.enable(gl.DEPTH_TEST); // Habilitar prueba de profundidad
gl.depthFunc(gl.LEQUAL); // Objetos cercanos opacan objetos lejanos
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Limpiar el buffer de color asi como el de profundidad

let shader = new Shader({
    vertextShaderSrc: await (fetch('./scripts/shader/1d_point_64_vertex.wgsl').then(res => res.text())),
    fragmentShaderSrc: await (fetch('./scripts/shader/green_fragment.wgsl').then(res => res.text())),
});

let buffer;

window.addEventListener(
    'beforeunload',
    () => {
        if (buffer) {
            gl.deleteBuffer(buffer);
            buffer = null;
        }
        wgl.cleanup();
    },
    true
);
wgl.linkProgram(shader);

gl.enableVertexAttribArray(0);
buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);

let x = -1;
setInterval(
    () => {
        if (!buffer) {
            return;
        }

        x += .1;
        if (x > 1) {
            x = -1;
        }

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([x]),
            gl.STATIC_DRAW,
        );
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Limpiar el buffer de color asi como el de profundidad

        gl.drawArrays(gl.POINTS, 0, 1);
    },
    100
);