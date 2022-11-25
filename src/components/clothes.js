import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { GatsbyImage } from 'gatsby-plugin-image'

import 'swiper/swiper.min.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cube'

import * as styles from './clothes.module.css'

function ClothesComponent({ clothesData }) {
    return (
        <div className={styles.clothesComponent}>
            <GatsbyImage
                alt={clothesData.node.name}
                image={clothesData.node.clothesPicture.gatsbyImageData}
                className={styles.clothesImage}
            />
            <div className={styles.clothesDetail}>
                <h2 className={styles.clothesName}>{clothesData.node.name}</h2>
                <h3 className={styles.clothesPrice}>價格：{clothesData.node.price}</h3>
                <h3 className={styles.clothesLeft}>尚餘：{clothesData.node.left}件</h3>
                <p className={styles.clothesDescription}></p>
            </div>
        </div>
    )
}


export default function Clothes({ data }) {
    return (
        <div className={styles.root}>
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
        </div>
    );
}