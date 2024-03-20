import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../Location.css';

const Location = () => {
    const { dispatch } = useContext(AppContext);

    const changeLocation = (val) => {
        dispatch({
            type: 'CHG_LOCATION',
            payload: val,
        })
    }

    return (
        <div className='alert alert-secondary'>
            Currency 
            <select 
                name="Location" 
                id="Location" 
                onChange={event => changeLocation(event.target.value)}
                className="location-selector"
            >
                <option value="£">Pound(£)</option>
                <option value="₹">Ruppee(₹)</option>
                <option value="€">Euro(€)</option>
                <option value="$">Dollar($)</option>
            </select>
        </div>
    );
};

export default Location;
