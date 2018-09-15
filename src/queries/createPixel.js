import {
    firestore
} from '../database'

import uuidv1 from 'uuid/v1'

function createPixel(x, y, color) {
    firestore.collection("pixels").add({
        ID: uuidv1(),
        x,
        y,
        color
    })
}

export default createPixel