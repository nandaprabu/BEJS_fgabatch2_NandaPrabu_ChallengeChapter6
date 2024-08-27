const prisma = require('../config/db/prisma')
const imageKit = require('../config/storage/imagekit')


const createMhs = async (req) => {
    const reqBody = req.body
    const image = req.file

    // console.log(reqBody)

    if(!image){
        return{
            status: 501,
            message: "Image not found!"
        }
    }

    const uploadImage = await imageKit.upload({
        file: image.buffer.toString('base64'),
        fileName: image.originalname,
        folder: 'Chptr6-Be'
    })


    const Mhs = await prisma.mahasiswa.create({
        data:{
            nim: reqBody.nim,
            nama: reqBody.nama,
            asal_sekolah: reqBody.asal_sekolah || undefined,
            email: reqBody.email,
            photo: uploadImage.url|| undefined
        }
    })

    // console.log(Mhs)
    return Mhs
}

const getAllMhs = async () => {
    const Mhs = await prisma.mahasiswa.findMany()

    return Mhs
}

const getMhs = async (req) => {
    const { mhsId } = req.params
    const Mhs = await prisma.mahasiswa.findUnique({
        where: {
            id: mhsId
        }
    })

    // console.log(mhsId)
    return Mhs
}

const updateMhs = async (req) => {
    const { mhsId } = req.params
    const data = req.body
    const image = req.file

    let imageURL = " "


    if(image){
        const uploadImage = await imageKit.upload({
            file: image.buffer.toString('base64'),
            fileName: image.originalname,
            folder: 'Chptr6-Be'
        });

        imageURL = uploadImage.url
    }
    
    const dataMhs = await prisma.mahasiswa.findUnique({
        where : {
            id: mhsId
        }
    })

    // console.log("Data mahasiswa yang ditemukan adalah", dataMhs)
    // console.log(`isi variabel mhsId yaitu ${mhsId}`)
    // console.log(`isi variabel data yaitu ${data}`)

    if(!dataMhs){
        return {
            status: 404,
            message: "Data Mahasiswa Not Found!"
        }
    }

    if(data.nim === dataMhs.nim || data.email === dataMhs.email){
        return {
            status: 501,
            message: "Data Already exist"
        }

    }

    const Mhs = await prisma.mahasiswa.update({
        where : {
            id: mhsId
        },
        data: {
            nim: data.nim || dataMhs.nim,
            nama: data.nama || dataMhs.nama,
            asal_sekolah: data.asal_sekolah || dataMhs.asal_sekolah,
            email: data.email || dataMhs.email,
            photo: imageURL || dataMhs.photo
        }
    })

    // console.log("Data yang final setelah dirubah yaitu", Mhs)
    return Mhs
}


const deleteMhs = async (req) => {
    const { mhsId } = req.params
    const deleteData = await prisma.mahasiswa.delete({
        where: {
            id: mhsId
        }
    })

    return deleteData
}



module.exports = {
    createMhs,
    getAllMhs,
    getMhs,
    updateMhs,
    deleteMhs
}
