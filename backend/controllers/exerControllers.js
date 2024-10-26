async function editExerc(req, res) {
  const { id } = req.params;
    const { name, reps, sets, dateOfChange, progress, type, user_id, time } = req.body;

    const query = `
      UPDATE exercise 
      SET name = ?, reps = ?, sets = ?, dateOfChange = ?, progress_reps = ?, progress_sets = ?, progress_dateOfChange = ?, type = ?, user_id = ?, time = ?
      WHERE id = ?
    `;

    try {
      const [result] = await db.execute(query, [
        name, reps, sets, dateOfChange, progress.reps, progress.sets, progress.dateOfChange, type, user_id, time, id
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).send('Упражнение не найдено');
      }

      res.send(`Упражнение ${id} обновлено`);
    } catch (err) {
      console.error('Ошибка при редактировании упражнения:', err);
      res.status(500).send('Ошибка при редактировании');
    }
}

async function addExerc(req, res) {
  const { name, reps, sets, dateOfChange, progress, type, user_id, time } = req.body;

  const query = 
    `INSERT INTO exercise (name, reps, sets, dateOfChange, progress_reps, progress_sets, progress_dateOfChange, type, user_id, time) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ;
  try {
    const [result] = await db.execute(query, [
      name, reps, sets, dateOfChange, progress.reps, progress.sets, progress.dateOfChange, type, user_id, time
    ]);
    res.status(201).json(result);
  } catch (err) {
    console.error('Ошибка при добавлении упражнения:', err);
    res.status(500).send('Ошибка при добавлении');
  }
}

async function getAllExerc(req, res) {
  const query = 'SELECT * FROM exercise';
  try {
    const [rows] = await db.execute(query);
    res.json(rows);
  } catch (err) {
    console.error('Ошибка при получении всех упражнений:', err);
    res.status(500).send('Ошибка при получении данных');
  }
}

async function deleteExerc(req, res) {
  const { id } = req.params;
  const query = 'DELETE FROM exercise WHERE id = ?';

  try {
    const [result] = await db.execute(query, [id]);
    res.send('Упражнение удалено');
  } catch (err) {
    console.error('Ошибка при удалении упражнения:', err);
    res.status(500).send('Ошибка при удалении');
  }
}

async function deleteAllExerc(req, res) {
  const query = 'DELETE FROM exercise';

  try {
    const [result] = await db.execute(query);
    res.send('Все упражнения удалены');
  } catch (err) {
    console.error('Ошибка при удалении всех упражнений:', err);
    res.status(500).send('Ошибка при удалении');
  }
}

module.exports = {
editExerc,
addExerc,
getAllExerc,
deleteAllExerc,
deleteExerc,
};