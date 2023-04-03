import  * as THREE from 'three'
export default class CreateMeshLine {
  constructor (geometry) {
    const edges = new THREE.EdgesGeometry(geometry)
    this.marterial = new THREE.LineBasicMaterial({ color: 0xffffff })
    const line = new THREE.LineSegments(
      edges,
      this.marterial
    )
    this.geometry = edges
    this.mesh = line
  }
}
