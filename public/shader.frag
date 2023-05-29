#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define LINE_WIDTH 0.004

float plot_horiz(vec2 st, float pct) {
  return  smoothstep(pct-LINE_WIDTH, pct, st.y) -
          smoothstep(pct, pct+LINE_WIDTH, st.y);
}

float plot_vert(vec2 st, float pct) {
  return  smoothstep(pct-LINE_WIDTH, pct, st.x) -
          smoothstep(pct, pct+LINE_WIDTH, st.x);
}

// creates a rectangle with a size between 0-1 centered at the center of the screen
float make_rectangle(vec2 st, float size) {
  // map from [0-1] to [0.5-1]
  float actual_size = 0.5 + (0.5 * size);
  vec2 bottom_left = step(vec2(1. - actual_size), st);
  vec2 top_right = step(vec2(1. - actual_size), 1.0 - st);
  return bottom_left.x * bottom_left.y * top_right.x * top_right.y;
}

// creates a rectangle outline with a size between 0-1 centered at the center of the screen
float box_outline(vec2 st, float size) {
  // map from [0.5-1] to [0-1]
  size = 0.5 - (0.5 * size);
  float rectangle = plot_horiz(st, 1. - size);
  rectangle += plot_horiz(st, size);
  rectangle += plot_vert(st, size);
  rectangle += plot_vert(st, 1. - size);
  vec2 outer_bl = step(vec2(size - 0.001), st);
  vec2 outer_tr = step(vec2(size - 0.001), 1.0 - st);
  rectangle *= outer_bl.x * outer_bl.y * outer_tr.x * outer_tr.y;
  return rectangle;
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  float rectangle = box_outline(st, sin(u_time) * 0.5 + 1.);
  rectangle += make_rectangle(st, sin(u_time) * 0.5 + 0.5);
  vec3 color = vec3(rectangle * -1. + 1.);
  gl_FragColor = vec4(color, 1.0);
}