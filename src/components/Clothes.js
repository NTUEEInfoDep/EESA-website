import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import Img from 'gatsby-image'

import 'swiper/swiper.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/scrollbar/scrollbar.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import 'swiper/modules/effect-cube/effect-cube.min.css'
import styles from './Clothes.module.css'

function ClothesComponent({ clothesData }) {
    return (
        <div className={styles.clothesComponent}>
            <Img
                alt={clothesData.node.name}
                fluid={clothesData.node.clothesPicture.fluid}
                style={{
                    width: '100%',
                    height: '100%',
                    float: 'center',
                }}
                className={styles.clothesImage}
            />
            <div className={styles.clothesDetail}>
                <h2 className={styles.clothesName}>{clothesData.node.name}</h2>
                <h3 className={styles.clothesPrice}>價格：{clothesData.node.price}</h3>
                <h3 className={styles.clothesLeft}>還剩{clothesData.node.left}件</h3>
                <p className={styles.clothesDescription}></p>
            </div>
        </div>
    )
}


export default function Clothes({ data }) {
    return (
        <Swiper
            cssMode={true}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            className={styles.swiper}
        >
            {data.map((clothesData) => {
                return (<SwiperSlide className={styles.swiperSlide}>
                    <ClothesComponent clothesData={clothesData} />
                </SwiperSlide>)
            })}
        </Swiper>
    );
}