const createDbConnection = require("../db");

async function editExerc(req, res) {
  try {
    const db = await createDbConnection();
    // your code here...
  } catch (connectionError) {
    console.error("Ошибка при подключении к базе данных:", connectionError);
    return res.status(500).json({
      err: `Ошибка при подключении к базе данных: ${connectionError}`,
    });
  }

  const { id } = req.params;
  const { name, reps, sets, dateOfChange, progress, type, user_id, time } =
    req.body;

  const query = `
      UPDATE exercise 
      SET name = ?, reps = ?, sets = ?, dateOfChange = ?, progress_reps = ?, progress_sets = ?, progress_dateOfChange = ?, type = ?, user_id = ?, time = ?
      WHERE id = ?
    `;

  try {
    const [result] = await db.execute(query, [
      name,
      reps,
      sets,
      dateOfChange,
      progress.reps,
      progress.sets,
      progress.dateOfChange,
      type,
      user_id,
      time,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Упражнение не найдено" });
    }

    res.status(200).json({ msg: `Упражнение ${id} обновлено` });
  } catch (err) {
    console.error("Ошибка при редактировании упражнения:", err);
    res.status(500).json({ err: "Ошибка при редактировании" });
  } finally {
    await db.end();
  }
}

async function addExerc(req, res) {
  const db = await createDbConnection();

  const {
    name,
    reps,
    sets,
    dateOfChange,
    progress,
    type,
    user_id,
    time,
    weight,
    id,
  } = req.body;

  // Validate input
  if ((name === undefined || sets === undefined, id === undefined)) {
    return res
      .status(400)
      .send(
        "Необходимо указать имя упражнения, количество повторений и количество подходов."
      );
  }

  // Define the SQL query with correct columns
  const query =
    "INSERT INTO exercise (name, reps, sets, dateOfChange, progress, type, user_id, time, weight, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  try {
    await db.execute(query, [
      name,
      reps !== undefined ? reps : null,
      sets,
      dateOfChange || null, // Use null if dateOfChange is not provided
      progress || null, // Use null if progress is not provided
      type || null, // Use null if type is not provided
      user_id || null, // Use null if user_id is not provided
      time || null,
      weight || null, // Use null if time is not provided
      id,
    ]);
    res.status(201).json({ msg: "Упражнение добавлено успешно" });
  } catch (err) {
    console.error("Ошибка при добавлении упражнения:", err);
    res.status(500).json({ err: `Ошибка при добавлении упражнения: ${err}` });
  } finally {
    await db.end(); // Close the connection after use
  }
}

async function getAllExerc(req, res) {
  const db = await createDbConnection(); // Get the database connection
  const userId = req.user?._id || req.params.user_id;
  
  if (!userId) {
    return res.status(400).json({ err: "User ID is required" });
  }

  const query = "SELECT * FROM exercise WHERE user_id = ?";
  
  try {
    const [rows] = await db.execute(query, [userId]);
    console.log(rows);
    
    res.json(rows);
  } catch (err) {
    console.error("Error retrieving exercises:", err);
    res.status(500).json({ err: "Error retrieving data" });
  } finally {
    await db.end();
  }
}

async function deleteExerc(req, res) {
  const db = await createDbConnection(); // Get the database connection
  const { id } = req.params;
  const query = "DELETE FROM exercise WHERE id = ?";

  try {
    const [result] = await db.execute(query, [id]);
    res.status(200).json({msg: `Упражнение удалено: ${result}`});
  } catch (err) {
    console.error("Ошибка при удалении упражнения:", err);
    res.status(500).json({err: `Ошибка: ${err}`});
  } finally {
    await db.end();
  }
}

async function deleteAllExerc(req, res) {
  const db = await createDbConnection(); // Get the database connection
  const query = "DELETE FROM exercise";

  try {
    const [result] = await db.execute(query);
    res.json({ msg: "Все упражнения удалены" });
  } catch (err) {
    console.error("Ошибка при удалении всех упражнений:", err);
    res.status(500).json({ err: "Ошибка при удалении" });
  } finally {
    await db.end();
  }
}

module.exports = {
  editExerc,
  addExerc,
  getAllExerc,
  deleteAllExerc,
  deleteExerc,
};
