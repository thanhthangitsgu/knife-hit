import { Color } from "cc"
import { WOOD_SPRITE, WOOD_TYPE } from "./Enum"

export const GAME_DATA = [
    {
        id: 1,
        knife: 5,
        type: WOOD_TYPE.ONE,
        speed: [200, 200],
    },
    {
        id: 2,
        knife: 5,
        type: WOOD_TYPE.TWO,
        speed: [-180, 180]
    },
    {
        id: 3,
        knife: 5,
        type: WOOD_TYPE.TWO,
        speed: [0, 180]
    },
    {
        id: 4,
        knife: 6,
        type: WOOD_TYPE.ONE,
        speed: [200, 200]
    },
    {
        id: 5,
        knife: 6,
        type: WOOD_TYPE.TWO,
        speed: [-360, 180],
        sprite: WOOD_SPRITE.ST5
    },
    {
        id: 6,
        knife: 7,
        type: WOOD_TYPE.TWO,
        speed: [-270, 90],

    },
    {
        id: 7,
        knife: 7,
        type: WOOD_TYPE.TWO,
        speed: [-180, 270]
    },
    {
        id: 8,
        knife: 8,
        type: WOOD_TYPE.TWO,
        speed: [0, 180]
    },
    {
        id: 9,
        knife: 10,
        type: WOOD_TYPE.TWO,
        speed: [-90, 360]
    },
    {
        id: 10,
        knife: 9,
        type: WOOD_TYPE.TWO,
        speed: [-180, 0],
        sprite: WOOD_SPRITE.ST10
    }
    ,
    {
        id: 11,
        knife: 11,
        type: WOOD_TYPE.TWO,
        speed: [0, 180]
    },
    {
        id: 12,
        knife: 11,
        type: WOOD_TYPE.TWO,
        speed: [0, 180]
    },
    {
        id: 13,
        knife: 11,
        type: WOOD_TYPE.TWO,
        speed: [0, 180]
    },
    {
        id: 14,
        knife: 11,
        type: WOOD_TYPE.TWO,
        speed: [0, 180]
    },
    {
        id: 15,
        knife: 11,
        type: WOOD_TYPE.TWO,
        speed: [0, 180],
        sprite: WOOD_SPRITE.ST15
    },
    {
        id: 16,
        knife: 11,
        type: WOOD_TYPE.TWO,
        speed: [-270, 180]
    },
    {
        id: 17,
        knife: 11,
        type: WOOD_TYPE.TWO,
        speed: [-90, 180]
    },
    {
        id: 18,
        knife: 11,
        type: WOOD_TYPE.TWO,
        speed: [-180, 180]
    },
    {
        id: 19,
        knife: 11,
        type: WOOD_TYPE.TWO,
        speed: [-360, 180]
    },
    {
        id: 20,
        knife: 11,
        type: WOOD_TYPE.TWO,
        speed: [-360, 180],
        sprite: WOOD_SPRITE.ST20
    },

]

export const GAME_COLOR = {
    color_pass: new Color(31, 0, 0, 255),
    color_active_stage: new Color(255, 173, 0, 255),
    color_default: new Color(255, 255, 255, 255)
}

export const KNIFE_APPLE = [100, 130, 150, 170, 200, 230, 250, 270, 280, 290, 300, 320, 330, 340, 350];