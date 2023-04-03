attribute vec3 aPosition;
uniform float uTime;
void main() {
  // position = 视图矩阵 * 模型矩阵 * position
  vec4 currentPosition = modelMatrix * vec4(position, 1.0);
  // 当前点到随机出来的点距离
  vec3 direction = aPosition - currentPosition.xyz;
  vec3 targetPosition = currentPosition.xyz + direction * uTime;
  vec4 viewPosition = viewMatrix * vec4(targetPosition, 1.0);
  // 设置position = 项目矩阵 * 视图位置
  gl_Position = projectionMatrix * viewPosition;
  // 远离摄象机细，靠近粗
  gl_PointSize = -100.0 / viewPosition.z;
}