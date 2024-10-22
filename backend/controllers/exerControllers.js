

async function editExerc(req, res) {
   console.log("редактируем");
    
}

async function addExerc(req, res) {
    console.log("добавляем");
}

async function getAllExerc(req, res) {
    console.log("получаем все");
}

async function deleteExerc(req, res) {
    console.log("удаляем одно упр.");
}

async function deleteAllExerc(req, res) {
    console.log("удаляем все упр.");
}

module.exports = {
    editExerc,
    addExerc,
    getAllExerc,
    deleteAllExerc,
    deleteExerc
}