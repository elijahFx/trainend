const createDbConnection = require("../db");

async function getEvents(req, res) {
  const db = await createDbConnection(); // Get the database connection
  const userId = req.user?._id || req.params.user_id;
  console.log(userId);

  if (!userId) {
    return res.status(400).json({ err: "User ID is required" });
  }

  const query = "SELECT * FROM event WHERE user_id = ?";
  console.log(query);

  try {
    const [rows] = await db.execute(query, [userId]);
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error("Error retrieving events:", err);
    res.status(500).json({ err: "Error retrieving data" });
  } finally {
    await db.end();
  }
}

async function addEvent(req, res) {
  const db = await createDbConnection();

  const { description, time, date, id, user_id, importance } = req.body;

  if (
    (description === undefined || date === undefined,
    id === undefined || importance === undefined)
  ) {
    return res
      .status(400)
      .send("Необходимо указать описание, важность, id и иное");
  }

  const query =
    "INSERT INTO event (description, time, date, id, user_id, importance) VALUES (?, ?, ?, ?, ?, ?)";
  try {
    await db.execute(query, [description, time, date, id, user_id, importance]);
    res.status(201).json({ msg: "Событие добавлено успешно" });
  } catch (err) {
    console.error("Ошибка при добавлении события:", err);
    res.status(500).json({ err: `Ошибка при добавлении события: ${err}` });
  } finally {
    await db.end();
  }
}

async function editEvent(req, res) {
  const db = await createDbConnection(); // Get the database connection
  const { id } = req.params; // Get the event ID from the request parameters
  const data = req.body; // Get the isDone value from the request body

  // Check if both id and isDone are provided
  if (data.id === undefined || data.isDone === undefined) {
    return res.status(400).json({
      err: "Event ID and isDone status are required",
    });
  }

  const query = "UPDATE event SET isDone = ? WHERE id = ?";

  try {
    const [result] = await db.execute(query, [isDone, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(200).json({ msg: "Event updated successfully", result });
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ err: "Error updating event" });
  } finally {
    await db.end();
  }
}

async function deleteEvent(req, res) {
  const db = await createDbConnection(); // Get the database connection
  const { id } = req.params;
  const query = "DELETE FROM event WHERE id = ?";

  try {
    const [result] = await db.execute(query, [id]);
    res.status(200).json({ msg: `Событие удалено: ${result}` });
  } catch (err) {
    console.error("Ошибка при удалении события:", err);
    res.status(500).json({ err: `Ошибка: ${err}` });
  } finally {
    await db.end();
  }
}

module.exports = {
  getEvents,
  editEvent,
  addEvent,
  deleteEvent,
};
