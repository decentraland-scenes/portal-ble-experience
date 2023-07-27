import { engine, GltfContainer, InputAction, inputSystem, Material, MeshCollider, MeshRenderer, pointerEventsSystem, Transform } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { colorSystem, gunSystem } from './systems'
import { spawnGun } from './gun'
import * as utils from '@dcl-sdk/utils'

export function main() {

	const gun = engine.addEntity()
	Transform.create(gun)
	GltfContainer.create(gun, { src: "assets/models/portalGun.glb" })

	spawnGun(gun)

	engine.addSystem(gunSystem)
	engine.addSystem(colorSystem)


	const testwall = engine.addEntity()
	Transform.create(testwall, { position: Vector3.create(7, 1, 6) })
	MeshRenderer.setPlane(testwall)
	MeshCollider.setPlane(testwall)


	const testwall2 = engine.addEntity()
	Transform.create(testwall2, { position: Vector3.create(14, 1, 6) })
	MeshRenderer.setPlane(testwall2)
	MeshCollider.setPlane(testwall2)

}
