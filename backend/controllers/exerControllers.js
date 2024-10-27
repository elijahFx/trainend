const createDbConnection = require("../db");

async function editExerc(req, res) {
  const db = await createDbConnection(); // Get the database connection
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
  const db = await createDbConnection(); // Get the database connection
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
  } = req.body;

  // Validate input
  if (name === undefined || reps === undefined || sets === undefined) {
    return res
      .status(400)
      .send(
        "Необходимо указать имя упражнения, количество повторений и количество подходов."
      );
  }

  // Define the SQL query with correct columns
  const query =
    "INSERT INTO exercise (name, reps, sets, dateOfChange, progress, type, user_id, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  try {
    await db.execute(query, [
      name,
      reps,
      sets,
      dateOfChange || null, // Use null if dateOfChange is not provided
      progress || null, // Use null if progress is not provided
      type || null, // Use null if type is not provided
      user_id || null, // Use null if user_id is not provided
      time || null,
      weight || null, // Use null if time is not provided
    ]);
    res.status(201).json({ msg: "Упражнение добавлено успешно" });
  } catch (err) {
    console.error("Ошибка при добавлении упражнения:", err);
    res.status(500).json({ err: "Ошибка при добавлении упражнения" });
  } finally {
    await db.end(); // Close the connection after use
  }
}

async function getAllExerc(req, res) {
  const db = await createDbConnection(); // Get the database connection
  const query = "SELECT * FROM exercise";
  try {
    const [rows] = await db.execute(query);
    res.json(rows);
  } catch (err) {
    console.error("Ошибка при получении всех упражнений:", err);
    res.status(500).json({ err: "Ошибка при получении данных" });
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
    res.send("Упражнение удалено");
  } catch (err) {
    console.error("Ошибка при удалении упражнения:", err);
    res.status(500).send("Ошибка при удалении");
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
