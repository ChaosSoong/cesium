/*global define*/
define([
        '../Core/defaultValue',
        '../Core/PrimitiveType',
        '../Scene/Pass'
    ], function(
        defaultValue,
        PrimitiveType,
        Pass) {
    "use strict";

    /**
     * Represents a command to the renderer for GPU Compute (using old-school GPGPU).
     *
     * @private
     */
    var ComputeCommand = function(options) {
        options = defaultValue(options, defaultValue.EMPTY_OBJECT);

        /**
         * The vertex array. If none is provided, a viewport quad will be used.
         *
         * @type {VertexArray}
         * @default undefined
         */
        this.vertexArray = options.vertexArray;

        /**
         * The fragment shader source. The default vertex shader is ViewportQuadVS.
         *
         * @type {ShaderSource}
         * @default undefined
         */
        this.fragmentShaderSource = options.fragmentShaderSource;

        /**
         * The shader program to apply.
         *
         * @type {ShaderProgram}
         * @default undefined
         */
        this.shaderProgram = options.shaderProgram;

        /**
         * An object with functions whose names match the uniforms in the shader program
         * and return values to set those uniforms.
         *
         * @type {Object}
         * @default undefined
         */
        this.uniformMap = options.uniformMap;

        /**
         * Texture to use for offscreen rendering.
         *
         * @type {Texture}
         * @default undefined
         */
        this.outputTexture = options.outputTexture;

        /**
         * Whether this command will persist beyond this call.
         * If not, resources will be destroyed after completion.
         *
         * @type {Boolean}
         * @default false
         */
        this.persists = defaultValue(options.persists, false);

        /**
         * The pass when to render. Always compute pass.
         *
         * @type {Pass}
         * @default Pass.COMPUTE;
         */
        this.pass = Pass.COMPUTE;

        /**
         * The object who created this command.  This is useful for debugging command
         * execution; it allows us to see who created a command when we only have a
         * reference to the command, and can be used to selectively execute commands
         * with {@link Scene#debugCommandFilter}.
         *
         * @type {Object}
         * @default undefined
         *
         * @see Scene#debugCommandFilter
         */
        this.owner = options.owner;
    };

    /**
     * Executes the compute command.
     *
     * @param {Context} context The context that processes the compute command.
     */
    ComputeCommand.prototype.execute = function(context) {
        context.computeEngine.execute(this);
    };

    return ComputeCommand;
});
