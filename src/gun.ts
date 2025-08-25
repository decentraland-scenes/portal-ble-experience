import {
	AudioSource,
	AvatarAnchorPointType,
	AvatarAttach,
	Entity,
	GltfContainer,
	Transform,
	engine
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { colorSystem, gunSystem } from './systems'
import { GlowColor, PortalColor } from './components'

export function spawnGun(gun: Entity) {

	const blueGlow = engine.addEntity()
	const orangeGlow = engine.addEntity()

	GlowColor.create(blueGlow, { color: PortalColor.Blue })
	GltfContainer.create(blueGlow, { src: 'assets/models/portalGunBlueGlow.glb' })
	Transform.create(blueGlow, {
		parent: gun,
		scale: Vector3.One()
	})

	GlowColor.create(orangeGlow, { color: PortalColor.Orange })
	GltfContainer.create(orangeGlow, { src: 'assets/models/portalGunOrangeGlow.glb' })
	Transform.create(orangeGlow, {
		parent: gun,
		scale: Vector3.Zero()
	})


	AudioSource.createOrReplace(gun, { audioClipUrl: 'assets/scene/sounds/gunPickup.mp3', playing: true, loop: false })

	const gunParent = engine.addEntity()
	AvatarAttach.create(gunParent, { anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG })
	const gunTranform = Transform.getMutable(gun)
	gunTranform.parent = gunParent
	gunTranform.position = Vector3.create(0.45, -0.625, 0.9)
	gunTranform.rotation = Quaternion.fromEulerDegrees(0, 0, 0)

}
