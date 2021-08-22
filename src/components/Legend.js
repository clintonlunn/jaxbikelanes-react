import React from 'react';
import './Legend.css';

const Legend = () => {
    return (
        <div className="legend">
            <div style={{ "--color": '#a50f15' }}>dedicated cycleway</div>
            <div style={{ "--color": '#de2d26' }}>cycle lane</div>
            <div style={{ "--color": '#fb6a4a' }}>shared lane</div>
            <div style={{ "--color": '#fc9272' }}>236 - 427</div>
            <div style={{ "--color": '#fcbba1'}}>23 - 235</div>
            <div style={{ "--color": '#fee5d9' }}>6 - 22</div>
        </div>
    );
}
export default Legend;