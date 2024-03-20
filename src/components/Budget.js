import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, remaining } = useContext(AppContext);
    const { Location } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        const inputValue = event.target.value;
        
        // Validate if input is a number and within the upper limit
        if (!isNaN(inputValue) && parseInt(inputValue) <= 20000) {
            const newBudgetValue = parseInt(inputValue);
            
            // Check if new budget value does not exceed remaining budget
            if (newBudgetValue <= remaining) {
                setNewBudget(newBudgetValue);
            } else {
                alert("The new budget exceeds the remaining budget!");
            }
        } else {
            alert("Please enter a valid number up to 20,000 for the budget.");
        }
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {Location}{budget}</span>
            <input 
                type="number" 
                step="10" 
                value={newBudget} 
                onChange={handleBudgetChange}
            />
        </div>
    );
};

export default Budget;

