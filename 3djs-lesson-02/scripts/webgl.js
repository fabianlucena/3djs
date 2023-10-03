export class WebGL {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext('webgl2', '{antialias: true}');
    }

    cleanup() {
        this.gl.useProgram(null);

        if (this.program) {
            this.gl.deleteProgram(this.program);
            this.program = null;
        }
    }

    linkProgram(shader) {
        if (!shader.vertextShaderSrc) {
            throw new Error('No vertex shader source.');
        }

        if (!shader.fragmentShaderSrc) {
            throw new Error('No fragment shader source.');
        }

        this.cleanup();

        const gl = this.gl;
        this.program = gl.createProgram();
        const program = this.program;

        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(vertexShader, shader.vertextShaderSrc);
        gl.shaderSource(fragmentShader, shader.fragmentShaderSrc);

        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);

        gl.detachShader(program, vertexShader);
        gl.detachShader(program, fragmentShader);

        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const linkErrLog = gl.getProgramInfoLog(program);
            this.cleanup();
            throw new Error(linkErrLog);
        }
        
        gl.useProgram(program);
    }
      
    initializeAttributes() {
        gl.enableVertexAttribArray(0);
        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);
    }
}