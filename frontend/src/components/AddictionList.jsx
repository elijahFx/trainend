import React, { useState } from "react";
import { nanoid } from "nanoid";
import getFormattedDateTime from "../utils/dates";
import Addiction from "./Addiction";
import {
  useAddAddictionMutation,
  useGetAddictionsQuery,
} from "../apis/addictionApi";
import DeleteAll from "./DeleteAll";
import { useSelector } from "react-redux";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function AddAddiction() {
  // Form state
  const [addictionName, setAddictionName] = useState("");
  const [addictionType, setAddictionType] = useState("");
  const [startDate, setStartDate] = useState(getTodayDate()); // Default to today

  const { data, isLoading, error } = useGetAddictionsQuery();
  const [AddAddiction] = useAddAddictionMutation();

  const user_id = useSelector((state) => state?.auth?.user?.id);
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await AddAddiction({
        name: addictionName,
        type: addictionType,
        date: getFormattedDateTime(),
        id: nanoid(),
        user_id: user_id,
      }).unwrap();

      setAddictionName("");
      setAddictionType("");
      setStartDate(getFormattedDateTime());

      console.log("Addiction added successfully");
    } catch (error) {
      console.error("Error adding addiction:", error);
    }
  };

  return (
    <div className="exercises_list">
      <div className="form-container">
        <form className="addiction-form" onSubmit={handleFormSubmit}>
          <h2>Добавить зависимость</h2>
          <div className="form-group">
            <label htmlFor="addictionName">Название зависимости</label>
            <input
              type="text"
              id="addictionName"
              value={addictionName}
              onChange={(e) => setAddictionName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="addictionType">Тип зависимости</label>
            <select
              id="addictionType"
              value={addictionType}
              onChange={(e) => setAddictionType(e.target.value)}
              required
            >
              <option value="">Выберите тип</option>
              <option value="Негативная">Негативная</option>
              <option value="Позитивная">Позитивная</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Дата начала борьбы</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Добавить зависимость
          </button>
          <DeleteAll type="addictions" />
        </form>
      </div>

      <div className="addiction_list">
        {data?.map((el, indx) => {
          return (
            <Addiction
              name={el.name}
              type={el.type}
              id={el.id}
              user_id={el.user_id}
              date={el.date}
              key={indx}
            />
          );
        })}
      </div>
    </div>
  );
}
