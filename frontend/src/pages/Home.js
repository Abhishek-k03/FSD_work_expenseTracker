import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIUrl, handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "../Home.css";
import ExpenseTable from "./ExpenseTable";
import ExpenseDetails from "./ExpenseDetails";
import ExpenseForm from "./ExpenseForm";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true",
  );

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  useEffect(() => {
    const amounts = expenses.map((item) => item.amount);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0);
    const exp =
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;
    setIncomeAmt(income);
    setExpenseAmt(exp);
  }, [expenses]);

  const deleteExpens = async (id) => {
    try {
      const url = `${APIUrl}/expenses/${id}`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "DELETE",
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const addTransaction = async (data) => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className={darkMode ? "dark-mode app-wrapper" : "app-wrapper"}>
      <div className="page-container">
        <div className="user-section">
          <h1>Welcome {loggedInUser}</h1>
          <div className="user-controls">
            <button
              className="dark-mode-toggle"
              onClick={toggleDarkMode}
              title="Toggle Dark Mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="left-column">
          <ExpenseForm addTransaction={addTransaction} />
          <ExpenseTable expenses={expenses} deleteExpens={deleteExpens} />
        </div>

        <aside className="right-column">
          <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
        </aside>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
