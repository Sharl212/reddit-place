import {
    firestore
} from '../database'

const ListenToConnection = async () => {
    return (
        await new Promise((resolve, reject) => {
            firestore.collection('pixels').onSnapshot(change => {
                resolve(change.docs)
            })
        })
    )
}

const getPixels = async () => {
    return (
        await new Promise((resolve, reject) => {
            firestore.collection('pixels').get().then(pixels => {
                resolve(pixels.docs)
            })
        })
    )
}
export {
    ListenToConnection,
    getPixels
}