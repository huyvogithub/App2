// 
import React, { useEffect, useState } from 'react';
import Gauge from 'react-gauge-component';
import './MultipleGauges.css'; // Import file CSS
import DraggableSquare from './DraggableSquare';
import axios from 'axios';
//




const MultipleGauges = () => {
    const [gaugesData, setGaugesData] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-byptt/endpoint/GETGAUSE');
            const data = response.data;
            //const data = await response.json();
            const taytrai = data[0]?.public?.output?.jsonData?.taytrai_p;
            const cangtaytrai = data[0]?.public?.output?.jsonData?.cangtaytrai_p;
            const tayphai = data[0]?.public?.output?.jsonData?.tayphai_p;
            const cangtayphai = data[0]?.public?.output?.jsonData?.cangtayphai_p;
            const nhiptim = data[0]?.public?.output?.jsonData?.nhiptim;
            const spo2 = data[0]?.public?.output?.jsonData?.spo2;
            const lucnamcv = data[0]?.public?.output?.jsonData?.lucnamcv;
            setGaugesData({ taytrai, cangtaytrai, tayphai, cangtayphai, nhiptim, spo2, lucnamcv });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="outer-container">
            <div className="enlarged-form">
                <DraggableSquare />
            </div>
            <div className="gauge-grid">
                <GaugeWithData name="TAY TRÁI" value={gaugesData.taytrai} unit="RAD" />
                <GaugeWithData name="TAY PHẢI" value={gaugesData.tayphai} unit="RAD" />
                <GaugeWithData name="CẲNG TAY TRÁI" value={gaugesData.cangtaytrai} unit="RAD" />
                <GaugeWithData name="CẲNG TAY PHẢI" value={gaugesData.cangtayphai} unit="RAD" />
                <GaugeWithData name="NHỊP TIM" value={gaugesData.nhiptim} unit="HPM" />
                <GaugeWithData name="SPO2" value={gaugesData.spo2} unit="%" />
                <GaugeWithData name="LỰC NẮM TAY" value={gaugesData.lucnamcv} unit="Hgram" />
            </div>
        </div>
    );
};

const GaugeWithData = ({ name, value, unit }) => {
    return (
        <div className="gauge">
            <h3 className="gauge-name">{name}</h3>
            <Gauge value={value} />
            <p>{`${value} ${unit}`}</p>
        </div>
    );
};

export default MultipleGauges;
