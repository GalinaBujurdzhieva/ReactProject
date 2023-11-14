import MichaelSmithImage from '../assets/images/team_1.jpg'
import SimoneParkerImage from '../assets/images/team_2.jpg'
import WilliamJamesImage from '../assets/images/team_3.jpg'

const images = {
    'Michael Smith': MichaelSmithImage,
    'Simone Parker': SimoneParkerImage,
    'William James': WilliamJamesImage
}

export const getImage = (trainerName) => {
    return images[trainerName]
}