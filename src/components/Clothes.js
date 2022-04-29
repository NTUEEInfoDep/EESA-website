import React from "react";
import Slider from "@farbenmeer/react-spring-slider";
import PropTypes from 'prop-types'

const ClothesComponent = (clothesData) => {
    console.log(clothesData)
    return (
        <div overflow="visible">
            <h2>{clothesData.node.name}</h2>
            <h3>價格：{clothesData.node.price}</h3>
            <h3>還剩{clothesData.node.left}件</h3>
        </div>
    )
}


export default function Clothes({ data }) {
    const setSlideCustom = () => 1;
    const onSlideChange = (index) => console.log(`changed to slide ${index}`);
    const BulletComponent = ({ onClick, isActive }) => (
        <li
            style={{
                width: "25px",
                height: "25px",
                backgroundColor: "white",
                margin: "0 2px",
                opacity: isActive && "0.5",
            }}
            onClick={onClick}
            class="Slider-Bullet"
        />
    );

    BulletComponent.propTypes = {
        onClick: PropTypes.func.isRequired,
        isActive: PropTypes.bool.isRequired,
    };

    const ArrowComponent = ({ onClick, direction }) => {
        return (
            <div
                style={{
                    border: "1px solid black",
                    padding: "1em",
                    backgroundColor: "white",
                }}
                onClick={onClick}
                class="Slider-Arrow"
            >
                {direction}
            </div>
        );
    };

    ArrowComponent.propTypes = {
        onClick: PropTypes.func.isRequired,
        direction: PropTypes.string.isRequired,
    };

    return (
        <Slider
            auto
            hasBullets
            BulletComponent={BulletComponent}
            ArrowComponent={ArrowComponent}
            onSlideChange={onSlideChange}
            setSlideCustom={setSlideCustom}
            overflow-x="visible"
            overflow-y="visible"
        >
            {data.map((clothesData) => {
                return ClothesComponent(clothesData)
            })}
        </Slider>
    );
}