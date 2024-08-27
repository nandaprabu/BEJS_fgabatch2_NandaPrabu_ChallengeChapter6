const {createMhs, 
    getAllMhs,
    getMhs,
    updateMhs,
    deleteMhs
} = require('../models/model.mhs')


const create = async (req, res) => {
    try {
        const result = await createMhs(req)
        res.status(201).json({
            status: "Success",
            message: "Create Mahasiswa Succes! Data Added Successfully",
            result
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: "An error occurred while adding mahasiswa data",
            details: error.message
        });
    }
}


const getAll = async (req, res) => {
    try {
        const result = await getAllMhs()
        res.status(201).json({
            status: "Success",
            message: "All Mahasiswa found! Data displayed successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: "An error occured while displayed mahasiswa data", 
            error: error.message 
        })
    }
}


const getDetails = async (req, res) => {
    try {
        const result = await getMhs(req)

        if(result){
            res.status(201).json({
                status: "success",
                message: `Detail Mahasiswa Found! Data ${result.id} displayed successfully`,
                result
            })
        } else {
            res.status(404).json({
                status: "Fail",
                message: "Data Mahasiswa not found",
                detail: error.message
            })
        }

    } catch (error) {
        res.status(501).json({
            status: "fail",
            error: "An error occurred while searching for Mahasiswa data",
            detail: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const result = await updateMhs(req)
        res.status(201).json({
            status: "success",
            message: `Update Mahasiswa Succes! Data ${result.id} Updated Successfully`,
            result
        })

    } catch (error) {
        res.status(501).json({
            status: "fail",
            error: "An error occurred while updating for Mahasiswa data",
            detail: error.message
        })
        
    }
}

const deleting = async (req, res) => {
    try {
        const result = await deleteMhs(req)

        if(result){
           res.status(201).json({
                status: "success",
                message: `Deleting Mahasiswa Success! Data ${result.id} Deleted Successfully`,
           }) 
        } else {
            res.status(404).json({
                message: "Data Not Found"
            })
        }

    } catch (error) {
        res.status(501).json({
            status: "fail",
            message: "An error occurred while deleting for Mahasiswa data",
            detail: error.message
        })
    }
}

module.exports = {
    create,
    getAll,
    getDetails,
    update,
    deleting
}