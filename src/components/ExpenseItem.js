import React, { useContext, useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props) => {
    const { dispatch, Location } = useContext(AppContext);
    const [currencyLocation, setCurrencyLocation] = useState(Location);

    useEffect(() => {
        // Update currency location when Location changes in the context
        setCurrencyLocation(Location);
    }, [Location]);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: {
                id: props.id,
                name: props.name // Pass the name of the expense to the reducer
            },
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });

    }

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'DECREASE_EXPENSE',
            payload: expense
        });

    }

    return (
        <tr>
            <td>{props.name}</td>
            <td>{currencyLocation}{props.cost}</td>
            <td><button onClick={event=> increaseAllocation(props.name)}>+</button></td>
            <td><button onClick={event=> decreaseAllocation(props.name)}>-</button></td>
            <td><TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};

export default ExpenseItem;

