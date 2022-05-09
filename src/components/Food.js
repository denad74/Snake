import React from 'react';

export const Food = (props) => {
   // console.log(props);
    const style = {
        left: `${props.foodPosition[0]}%`,
        top: `${props.foodPosition[1]}%`
        
    }
    return (
        <div
            className='snake-food'
            style={style}
        >
        </div>
    );
};

export default Food;
