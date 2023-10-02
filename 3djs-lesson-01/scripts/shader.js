export class Shader {
	constructor(options) {
		for (const k in options) {
			this[k] = options[k];
		}
	}
}
