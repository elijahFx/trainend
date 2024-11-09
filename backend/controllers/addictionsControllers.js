const createDbConnection = require("../db");

async function getAddictions(req, res) {
  const db = await createDbConnection(); // Get the database connection
  const userId = req.user?._id || req.params.user_id;
  console.log(userId);
  

  if (!userId) {
    return res.status(400).json({ err: "User ID is required" });
  }

  const query = "SELECT * FROM addiction WHERE user_id = ?";
  console.log(query);
  
  try {
    const [rows] = await db.execute(query, [userId]);
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error("Error retrieving addictions:", err);
    res.status(500).json({ err: "Error retrieving data" });
  } finally {
    await db.end();
  }
}

async function addAddiction(req, res) {
  const db = await createDbConnection();

  const { name, type, date, id, user_id } = req.body;

  if (
    (name === undefined || date === undefined,
    id === undefined || type === undefined)
  ) {
    return res.status(400).send("Необходимо указать имя зависимости и иное");
  }

  const query =
    "INSERT INTO addiction (name, type, date, user_id, id) VALUES (?, ?, ?, ?, ?)";
  try {
    await db.execute(query, [name, type, date, user_id, id]);
    res.status(201).json({ msg: "Зависимость добавлена успешно" });
  } catch (err) {
    console.error("Ошибка при добавлении зависимости:", err);
    res.status(500).json({ err: `Ошибка при добавлении зависимости: ${err}` });
  } finally {
    await db.end();
  }
}

async function editAddiction(req, res) {
    let db;
    try {
        db = await createDbConnection();
    } catch (connectionError) {
        console.error("Ошибка при подключении к базе данных:", connectionError);
        return res.status(500).json({
            err: `Ошибка при подключении к базе данных: ${connectionError}`,
        });
    }

    const { id } = req.params;
    const { name, date } = req.body;

    // Input validation
    if (!name && !date) {
        return res.status(400).json({ msg: "Некорректные данные. Укажите хотя бы одно поле для редактирования." });
    }

    // Start building the query
    let query = `UPDATE addiction SET `;
    const params = [];

    if (name) {
        if (typeof name !== 'string') {
            return res.status(400).json({ msg: "Некорректное имя" });
        }
        query += `name = ?, `;
        params.push(name);
    }

    if (date) {
        query += `date = ?, `;
        params.push(date);
    }

    // Remove the last comma and space from the query
    query = query.slice(0, -2); 
    query += ` WHERE id = ?`;
    params.push(id);

    try {
        const [result] = await db.execute(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Зависимость не найдена" });
        }

        res.status(200).json({ msg: `Зависимость ${id} обновлена` });
    } catch (err) {
        console.error("Ошибка при редактировании зависимости:", err);
        res.status(500).json({ err: "Ошибка при редактировании" });
    } finally {
        if (db) {
            await db.end();
        }
    }
}

async function deleteAddiction(req, res) {
  const db = await createDbConnection(); // Get the database connection
  const { id } = req.params;
  const query = "DELETE FROM addiction WHERE id = ?";

  try {
    const [result] = await db.execute(query, [id]);
    res.status(200).json({ msg: `Зависимость удалена: ${result}` });
  } catch (err) {
    console.error("Ошибка при удалении зависимости:", err);
    res.status(500).json({ err: `Ошибка: ${err}` });
  } finally {
    await db.end();
  }
}

async function deleteAllAddictions(req, res) {
    const db = await createDbConnection(); // Get the database connection
    const query = "DELETE FROM addiction";
  
    try {
      const [result] = await db.execute(query);
      res.json({ msg: "Все зависимости удалены" });
    } catch (err) {
      console.error("Ошибка при удалении всех зависимостей:", err);
      res.status(500).json({ err: "Ошибка при удалении" });
    } finally {
      await db.end();
    }
}

module.exports = {
  getAddictions,
  deleteAddiction,
  deleteAllAddictions,
  editAddiction,
  addAddiction,
};
