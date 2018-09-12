uniform sampler2D texture;
uniform float opacity;
varying vec2 coord;
void main(){
    gl_FragColor = texture2D(texture, coord)*opacity;
}