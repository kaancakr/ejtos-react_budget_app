import React, { createContext, useReducer } from 'react';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    let new_expenses = [];
    switch (action.type) {
        case 'ADD_EXPENSE':
            let total_budget = 0;
            total_budget = state.expenses.reduce(
                (previousExp, currentExp) => {
                    return previousExp + currentExp.cost
                }, 0
            );
            total_budget = total_budget + action.payload.cost;
            action.type = "DONE";
            if (total_budget <= state.budget) {
                total_budget = 0;
                state.expenses.map((currentExp) => {
                    if (currentExp.name === action.payload.name) {
                        currentExp.cost = action.payload.cost + currentExp.cost;
                    }
                    return currentExp
                });
                return {
                    ...state,
                };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return {
                    ...state
                }
            }
        case 'DECREASE_EXPENSE':
            let expenseFound = false;
            state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    expenseFound = true;
                    expense.cost = expense.cost - action.payload.cost;
                    if (expense.cost < 0) {
                        expense.cost = 0;
                    }
                }
                new_expenses.push(expense);
                return true;
            });

            if (!expenseFound) {
                alert("Expense not found!");
            }

            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state,
            };
        case 'ADD_QUANTITY':
            let updatedqty = false;
            state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    expense.quantity = expense.quantity + action.payload.quantity;
                    updatedqty = true;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state,
            };
        case 'DECREASE_EXPENSE':
            const updatedExpenses = state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    const newCost = expense.cost - action.payload.cost;
                    return { ...expense, cost: newCost < 0 ? 0 : newCost };
                }
                return expense;
            });

            return {
                ...state,
                expenses: updatedExpenses,
                action: "DONE" // I noticed that you were setting action.type to "DONE" in other cases, so I included it here as well.
            };

        case 'RED_QUANTITY':
            state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    expense.quantity = expense.quantity - action.payload.quantity;
                }
                expense.quantity = expense.quantity < 0 ? 0 : expense.quantity;
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state,
            };
        case 'DELETE_EXPENSE':
            state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    expense.quantity = 0;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state,
            };
        case 'CHG_LOCATION':
            action.type = "DONE";
            state.Location = action.payload;
            return {
                ...state
            }

        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    Location: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);
    let remaining = 0;

    if (state.expenses) {
        const totalExpenses = state.expenses.reduce((total, item) => {
            return (total = total + item.cost);
        }, 0);
        remaining = state.budget - totalExpenses;
    }

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                action: state.action, // Update to action
                budget: state.budget,
                remaining: remaining,
                dispatch,
                Location: state.Location
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
