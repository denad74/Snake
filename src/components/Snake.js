import React from 'react';

const Snake = (props) => {
    

    return (
        <div>
            {props.snakePosition.map((box, i) => {
                const style = {
                    left: `${box[0]}%`,
                    top: `${box[1]}%`
                    
                }
                return (
                    <div className='snake-box' key={i} style={style}></div>
                )
            })}
            
            
        </div>
    );
};

export default Snake;