import { ColliderLayer, engine, GltfContainer, InputAction, inputSystem, Material, MeshCollider, MeshRenderer, pointerEventsSystem, Transform, VideoPlayer } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
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


	//const testwall = engine.addEntity()
	//Transform.create(testwall, { position: Vector3.create(7, 1, 6) })
	//MeshRenderer.setPlane(testwall)
	//MeshCollider.setPlane(testwall)


	//const testwall2 = engine.addEntity()
	//Transform.create(testwall2, { position: Vector3.create(14, 1, 6) })
	//MeshRenderer.setPlane(testwall2)
	//MeshCollider.setPlane(testwall2)
	//createScreen()
}



export function createScreen() {
	// Screen
	const screenDisplay = engine.addEntity()
	Transform.create(screenDisplay, {
		parent: engine.PlayerEntity,
		position: { x: 0, y: 3, z: 5 },
		scale: { x: 0.625, y: 0.625, z: 0.625 }
	})

	const screen = engine.addEntity()
	MeshRenderer.setPlane(screen)
	MeshCollider.setPlane(screen, ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS)
	Transform.create(screen, {
		parent: screenDisplay,
		scale: { x: 19.2, y: 10.8, z: 1 },
		rotation: Quaternion.fromEulerDegrees(0, 0, 0)
	})

	const screen2 = engine.addEntity()
	MeshRenderer.setPlane(screen2)
	MeshCollider.setPlane(screen2, ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS)
	Transform.create(screen2, {
		parent: screenDisplay,
		scale: { x: 3.84, y: 2.16, z: 1 },
		rotation: Quaternion.fromEulerDegrees(0, 0, 0),
		position: { x: 8.0, y: -5.0, z: -0.1 }
	})
	VideoPlayer.create(screen, {
		src: 'https://player.vimeo.com/external/552481870.m3u8?s=c312c8533f97e808fccc92b0510b085c8122a875',
		playing: true,
		volume: 1.0
	})

	const videoTexture = Material.Texture.Video({ videoPlayerEntity: screen })

	Material.setPbrMaterial(screen, {
		texture: videoTexture,
		emissiveTexture: videoTexture,
		emissiveIntensity: 0.6,
		roughness: 1.0
	})

	Material.setPbrMaterial(screen2, {
		texture: videoTexture,
		emissiveTexture: videoTexture,
		emissiveIntensity: 0.6,
		roughness: 1.0
	})

	pointerEventsSystem.onPointerDown(
		{
			entity: screen,
			opts: {
				button: InputAction.IA_POINTER,
				hoverText: 'Play/pause'
			}
		},
		() => {
			const videoPlayer = VideoPlayer.getMutable(screen)
			videoPlayer.playing = !videoPlayer.playing
		}
	)

}