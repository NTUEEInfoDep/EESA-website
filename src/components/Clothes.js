import React from "react";
import Slider from "@farbenmeer/react-spring-slider";
import PropTypes from 'prop-types'

export default function Clothes({ data }) {
    const setSlideCustom = () => 1;
    const BulletComponent = ({ onClick, isActive }) => (
        <li
            style={{
                width: "25px",
                height: "25px",
                backgroundColor: "red",
                margin: "0 2px",
                opacity: isActive && "0.5",
            }}
            onClick={onClick}
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
            >
                {direction}
            </div>
        );
    };

    ArrowComponent.propTypes = {
        onClick: PropTypes.func.isRequired,
        direction: PropTypes.string.isRequired,
    };

    const ClothesComponent = (clothesData) => {
        return (
            <div>
                <img href={'http:' + clothesData.node.clothesPicture.file.url} />
                <h2>{clothesData.node.name}</h2>
                <h3>價格：{clothesData.node.price}</h3>
                <h3>還剩{clothesData.node.left}件</h3>
            </div>
        )
    }

    return (
        <Slider
            auto
            hasBullets
            BulletComponent={BulletComponent}
            ArrowComponent={ArrowComponent}
            setSlideCustom={setSlideCustom}
        >
            {data.map((clothesData) => {
                console.log(clothesData);
                return <div>{ClothesComponent(clothesData)}</div>
            })}
        </Slider>
    );
}