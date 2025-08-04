
import express from 'express';
import db from './database.js';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());



app.get('/cubicles', (req, res) => {
  let sql = `
    SELECT 
      c.id, 
      c.cubicle_type, 
      c.cubicle_no, 
      al.time_in, 
      al.time_out
    FROM cubicles c
    LEFT JOIN activity_log al ON c.id = al.cubicle_id
    WHERE 1=1
  `;
  const params = [];

  if (req.query.type) {
    sql += ' AND c.cubicle_type = ?';
    params.push(req.query.type);
  }

  if (req.query.startDate && req.query.endDate) {
    sql += ' AND al.time_in BETWEEN ? AND ?';
    params.push(req.query.startDate + ' 00:00:00');
    params.push(req.query.endDate + ' 23:59:59');
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error fetching cubicles:', err);
      res.status(500).send(err);
    } else {
      console.log('Cubicles data fetched:', results);
      res.json(results);
    }
  });
});

app.get('/instruments', (req, res) => {
  let sql = `
    SELECT 
      i.id, 
      i.instrument_type, 
      i.instrument_no, 
      al.time_in, 
      al.time_out
    FROM instruments i
    LEFT JOIN activity_log al ON i.id = al.instrument_id
    WHERE 1=1
  `;
  const params = [];

  if (req.query.type) {
    sql += ' AND i.instrument_type = ?';
    params.push(req.query.type);
  }

  if (req.query.startDate && req.query.endDate) {
    sql += ' AND al.time_in BETWEEN ? AND ?';
    params.push(req.query.startDate + ' 00:00:00');
    params.push(req.query.endDate + ' 23:59:59');
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error fetching instruments:', err);
      res.status(500).send(err);
    } else {
      console.log('Instruments data fetched:', results);
      res.json(results);
    }
  });
});



app.get('/activity-log', (req, res) => {
  const { table, type, startDate, endDate } = req.query;

  let query;
  const params = [];

  if (table === 'cubicles') {
    query = `
      SELECT 
        CONCAT(s.first_name, ' ', s.last_name) AS name,
        CONCAT(s.year, '-', s.sec) AS yr_sec,
        ci.cubicle_type AS item_type,
        ci.cubicle_no AS item_number,
        CONCAT(cu.usage_date, ' ', cu.start_time) AS time_in,
        CONCAT(cu.usage_date, ' ', cu.end_time) AS time_out,
        TIMESTAMPDIFF(HOUR, cu.start_time, cu.end_time) AS total_hours,
        TIMESTAMPDIFF(MINUTE, cu.start_time, cu.end_time) AS consumed_minutes
      FROM cubicle_usage cu
      JOIN student s ON cu.student_id = s.student_id
      JOIN cubicle_info ci ON cu.cubicle_id = ci.cubicle_id
      WHERE cu.usage_date BETWEEN ? AND ?
    `;
    params.push(startDate);
    params.push(endDate);

    if (type && type !== 'All') {
      query += ' AND ci.cubicle_type = ?';
      params.push(type);
    }
    query += ' ORDER BY cu.usage_date DESC, cu.start_time DESC';

  } else if (table === 'instruments') {
    query = `
      SELECT 
        i.name, 
        i.yr_sec, 
        i.instrument_type AS item_type, 
        i.instrument_no AS item_number, 
        i.time_in, 
        i.time_out,
        i.hours_consumed AS total_hours
      FROM instruments i
      WHERE i.time_in BETWEEN ? AND ?
      AND i.time_in >= ? AND i.time_out <= ?
    `;
    params.push(startDate + ' 00:00:00');
    params.push(endDate + ' 23:59:59');
    params.push(req.query.startTime);
    params.push(req.query.endTime);
    query += ' ORDER BY i.time_in DESC';
  } else {
    return res.status(400).send('Invalid table type');
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching activity log:', err);
      res.status(500).send(err);
    } else {
      console.log('Activity log data fetched:', results);
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
