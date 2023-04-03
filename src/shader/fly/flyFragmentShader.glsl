uniform sampler2D uTexture;
uniform vec3 uColor;
void main() {
    vec4 uTextrueColor = texture2D(uTexture, gl_PointCoord);
    gl_FragColor = vec4(uColor, uTextrueColor.x);
}