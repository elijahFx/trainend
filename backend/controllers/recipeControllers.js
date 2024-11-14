const createDbConnection = require("../db");

const main_string = `recipe`

async function getAllRecipies(req, res) {
  const db = await createDbConnection(); // Get the database connection
  const userId = req.user?._id || req.params.user_id;
  console.log(userId);

  if (!userId) {
    return res.status(400).json({ err: "User ID is required" });
  }

  const query = `SELECT * FROM ${main_string} WHERE user_id = ?`;
  console.log(query);

  try {
    const [rows] = await db.execute(query, [userId]);
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error("Error retrieving рецепты:", err);
    res.status(500).json({ err: "Error retrieving рецепты" });
  } finally {
    await db.end();
  }
}

async function addRecipe(req, res) {
  const db = await createDbConnection();

  const { id, user_id, ingridients, name, steps, time, img } = req.body;

  if (name === undefined || ingridients === undefined) {
    return res
      .status(400)
      .send("Необходимо указать игредиенты, название и другое");
  }

  const query =
    `INSERT INTO ${main_string} (id, user_id, name, ingridients, name, steps, time, img) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  try {
    await db.execute(query, [id, user_id, ingridients, name, steps, time, img]);
    res.status(201).json({ msg: "Рецепт добавлен успешно" });
  } catch (err) {
    console.error("Ошибка при добавлении рецепта:", err);
    res.status(500).json({ err: `Ошибка при добавлении рецепта: ${err}` });
  } finally {
    await db.end();
  }
}

// ПОМЕНЯТЬ ЭТУ ЧАСТЬ, Т.К. ОНА НЕ ПОДХОДИТ ПО РЕЦЕПТЫ

async function editRecipe(req, res) {
  const db = await createDbConnection(); // Get the database connection
  const { id } = req.params; // Get the event ID from the request parameters
  const data = req.body; // Get the isDone value from the request body

  // Check if both id and isDone are provided
  if (data.id === undefined || data.isDone === undefined) {
    return res.status(400).json({
      err: "Event ID and isDone status are required",
    });
  }

  const query = `UPDATE ${main_string} SET isDone = ? WHERE id = ?"`;

  try {
    const [result] = await db.execute(query, [isDone, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Рецепт не найден" });
    }
    res.status(200).json({ msg: "Рецепт обновлен:", result });
  } catch (err) {
    console.error("Ошибка при обновлении рецепта:", err);
    res.status(500).json({ err: "Ошибка при обновлении рецепта" });
  } finally {
    await db.end();
  }
}

async function deleteRecipe(req, res) {
  const db = await createDbConnection(); // Get the database connection
  const { id } = req.params;
  const query = `DELETE FROM ${main_string} WHERE id = ?`;

  try {
    const [result] = await db.execute(query, [id]);
    res.status(200).json({ msg: `Рецепт удален: ${result}` });
  } catch (err) {
    console.error("Ошибка при удалении рецепта:", err);
    res.status(500).json({ err: `Ошибка: ${err}` });
  } finally {
    await db.end();
  }
}

module.exports = {
  getAllRecipies,
  editRecipe,
  deleteRecipe,
  addRecipe,
};
